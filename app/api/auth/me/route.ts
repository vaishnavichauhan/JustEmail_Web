import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserModel } from "@/lib/models/userModel";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    // Check Authorization header if token not in cookie
    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return NextResponse.json({ authenticated: false, error: "No token provided" }, { status: 401 });
    }

    // Verify JWT Token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "jwt_secret_key");

    if (decoded.role === "admin") {
      return NextResponse.json({
        authenticated: true,
        user: { fullName: "Super Admin", email: decoded.email, role: "admin" },
      });
    }

    // Fetch user details from MySQL
    const user = await UserModel.findByEmail(decoded.email);

    if (!user) {
      return NextResponse.json({ authenticated: false, error: "User no longer exists" }, { status: 404 });
    }

    return NextResponse.json({
      authenticated: true,
      user: { fullName: user.full_name, email: user.email, role: user.role },
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: "Invalid or expired token" }, { status: 401 });
  }
}
