import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.WHMCS_API_URL;
    const identifier = process.env.WHMCS_API_IDENTIFIER;
    const secret = process.env.WHMCS_API_SECRET;

    if (!apiUrl || !identifier || !secret) {
      return NextResponse.json(
        { error: "WHMCS API credentials are not configured in server environment." },
        { status: 500 }
      );
    }

    const params = new URLSearchParams();
    params.append("action", "GetProducts");
    params.append("identifier", identifier);
    params.append("secret", secret);
    params.append("responsetype", "json");

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `WHMCS API HTTP request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.result === "error") {
      return NextResponse.json(
        { error: data.message || "Failed to retrieve products from WHMCS API." },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "An internal server error occurred while connecting to WHMCS API." },
      { status: 500 }
    );
  }
}
