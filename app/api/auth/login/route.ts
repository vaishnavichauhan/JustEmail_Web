import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "@/lib/models/userModel";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Please enter email and password" },
        { status: 400 });
    }

    const emailLower = email.trim().toLowerCase();

    // 1. Check Super Admin Preset Credentials
    if (emailLower === "admin@justemails.in" && password === "Admin@12345") {
      const token = jwt.sign(
        { userId: 1, email: emailLower, role: "admin" },
        process.env.JWT_SECRET || "jwt_secret_key",
        { expiresIn: "7d" }
      );

      const response = NextResponse.json({
        success: true,
        token: token,
        message: "Super Admin Authenticated!",
        user: { fullName: "Super Admin", email: emailLower, role: "admin" },
      });

      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    // 2. Fetch User from MySQL Database using UserModel
    const user = await UserModel.findByEmail(emailLower);

    if (!user) {
      return NextResponse.json({ error: "No account found with this email ID." }, { status: 404 });
    }

    // 3. Verify Password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Incorrect password. Please try again." }, { status: 401 });
    }

    // 4. Generate JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "jwt_secret_key",
      { expiresIn: "7d" }
    );

    // 5. Attach Token Cookie & Return in JSON Payload
    const response = NextResponse.json({
      success: true,
      token: token,
      message: "Signed in successfully!",
      user: { fullName: user.full_name, email: user.email, role: user.role },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Failed to sign in." }, { status: 500 });
  }
}
