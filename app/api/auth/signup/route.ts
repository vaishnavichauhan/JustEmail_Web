import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserModel } from "@/lib/models/userModel";

export async function POST(req: Request) {
  try {
    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 1. Check if email already exists in MySQL
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create User row in MySQL via UserModel
    const userId = await UserModel.create({
      fullName: fullName,
      email: email,
      passwordHash: hashedPassword,
      role: "user",
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully in MySQL database!",
      userId: userId,
    });
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create account in MySQL." }, { status: 500 });
  }
}
