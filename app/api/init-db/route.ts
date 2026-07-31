import { NextResponse } from "next/server";
import { initializeTables } from "@/lib/initDb";

export async function GET() {
  try {
    const result = await initializeTables();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to initialize tables", details: error?.message || error },
      { status: 500 }
    );
  }
}
