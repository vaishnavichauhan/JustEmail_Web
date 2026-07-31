import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully!",
  });

  // Clear JWT Token Cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // Expire cookie immediately
    path: "/",
  });

  return response;
}
