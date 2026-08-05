import { NextResponse } from "next/server";
import { ProviderModel } from "@/lib/models/providerModel";

export async function GET() {
  try {
    const providers = await ProviderModel.findAll();
    return NextResponse.json({ success: true, data: providers });
  } catch (error: any) {
    console.error("GET /api/providers Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch providers", details: error?.message || error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      name,
      subtitle,
      badge,
      price,
      period,
      billingNote,
      storage,
      uptime,
      recommendedUsers,
      logoType,
      features,
      enabled,
      showOnHome
    } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Provider name and price are required." },
        { status: 400 }
      );
    }

    const cleanNumericPrice = String(price).replace(/[^\d.]/g, "").trim();
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    const numericPriceVal = parseFloat(cleanNumericPrice);

    if (!cleanNumericPrice || !priceRegex.test(cleanNumericPrice) || isNaN(numericPriceVal)) {
      return NextResponse.json(
        { error: "Price must be a valid numeric value (e.g. 100 or 150.50)." },
        { status: 400 }
      );
    }

    if (numericPriceVal < 1) {
      return NextResponse.json(
        { error: "Price cannot be less than ₹1. Minimum allowed price is ₹1." },
        { status: 400 }
      );
    }

    const group = (logoType || "custom").toLowerCase().trim();
    const subSlug = subtitle ? subtitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") : "plan";

    // Generate unique ID for new plans or keep existing ID when editing
    let providerId = id ? id.trim().toLowerCase() : "";
    if (!providerId) {
      providerId = `${group}-${subSlug}-${Date.now().toString(36)}`;
    }

    const newProvider = {
      id: providerId,
      name: name.trim(),
      subtitle: subtitle?.trim() || "Business Mail Suite",
      badge: badge?.trim() || "Official Provider",
      price: price.trim().startsWith("₹") ? price.trim() : `₹${price.trim()}`,
      period: period?.trim() || "/ user / month",
      billingNote: billingNote?.trim() || "Billed annually",
      storage: storage?.trim() || "10 GB Storage",
      uptime: uptime?.trim() || "99.9% SLA",
      recommendedUsers: recommendedUsers?.trim() || "1 - 100 Users",
      logoType: group,
      features: Array.isArray(features) ? features : typeof features === "string" ? features.split("\n").map(s => s.trim()).filter(Boolean) : [],
      enabled: enabled !== undefined ? Boolean(enabled) : true,
      showOnHome: showOnHome !== undefined ? Boolean(showOnHome) : true,
    };

    await ProviderModel.create(newProvider);

    return NextResponse.json({
      success: true,
      message: "Provider plan created/updated successfully!",
      data: newProvider
    }, { status: 200 });

  } catch (error: any) {
    console.error("POST /api/providers Error:", error);
    return NextResponse.json(
      { error: "Failed to create provider", details: error?.message || error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Provider ID is required" }, { status: 400 });
    }

    await ProviderModel.update(id, updates);

    return NextResponse.json({
      success: true,
      message: "Provider updated successfully!"
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update provider" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Provider ID is required" }, { status: 400 });
    }

    await ProviderModel.delete(id);

    return NextResponse.json({
      success: true,
      message: `Provider plan ${id} deleted successfully!`
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete provider" }, { status: 500 });
  }
}
