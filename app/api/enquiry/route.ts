import { NextResponse } from "next/server";
import { EnquiryModel } from "@/lib/models/enquiryModel";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      organizationName,
      domain,
      city,
      state,
      zip,
      address,
      firstName,
      lastName,
      email,
      alternativeEmail,
      phoneNumber,
      notes,
      provider,
      plan,
      providerId,
      userCount,
    } = body;

    // 1. Mandatory Fields Check
    if (
      !organizationName?.trim() ||
      !domain?.trim() ||
      !city?.trim() ||
      !state?.trim() ||
      !zip?.trim() ||
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !alternativeEmail?.trim() ||
      !phoneNumber?.trim()
    ) {
      return NextResponse.json(
        { error: "Please provide all required fields." },
        { status: 400 }
      );
    }

    // 2. Validate 10-Digit Numeric Phone Number
    const cleanPhone = String(phoneNumber).replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { error: "Phone number must be exactly 10 numeric digits." },
        { status: 400 }
      );
    }

    // 3. Validate Primary & Alternative Email Are Not Identical
    const emailLower = email.trim().toLowerCase();
    const altEmailLower = alternativeEmail.trim().toLowerCase();

    if (emailLower === altEmailLower) {
      return NextResponse.json(
        { error: "Primary Email and Alternative Email cannot be the same." },
        { status: 400 }
      );
    }

    // 4. Validate Notes Word Count (Max 200 Words)
    const wordCount = notes
      ? notes.trim().split(/\s+/).filter(Boolean).length
      : 0;

    if (wordCount > 200) {
      return NextResponse.json(
        { error: "Notes must not exceed 200 words limit." },
        { status: 400 }
      );
    }

    // 5. Generate Unique Enquiry Reference ID
    const enquiryId = `ENQ-${Date.now()}`;
    const formattedPhone = `+91 ${cleanPhone}`;

    // 6. Save Record into MySQL Database (`justemails_db.enquiries` table)
    let insertedId = null;
    try {
      insertedId = await EnquiryModel.create({
        enquiryId,
        organizationName: organizationName.trim(),
        domain: domain.trim(),
        city: city.trim(),
        state: state.trim(),
        zip: zip.trim(),
        address: address?.trim() || "",
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: emailLower,
        alternativeEmail: altEmailLower,
        phoneNumber: formattedPhone,
        notes: notes?.trim() || "",
        provider: provider || null,
        plan: plan || null,
        providerId: providerId || null,
        userCount: Number(userCount) || 1,
      });
      console.log(`Successfully saved enquiry to MySQL database! Row ID: ${insertedId}`);
    } catch (dbError) {
      console.error("MySQL Database Insert Error:", dbError);
    }

    // 7. Return 200 OK Response
    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully!",
        enquiryId,
        dbRowId: insertedId,
        data: {
          enquiryId,
          organizationName: organizationName.trim(),
          domain: domain.trim(),
          city: city.trim(),
          state: state.trim(),
          zip: zip.trim(),
          address: address?.trim() || "",
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: emailLower,
          alternativeEmail: altEmailLower,
          phoneNumber: formattedPhone,
          notes: notes?.trim() || "",
          provider: provider || null,
          plan: plan || null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred while submitting enquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const records = await EnquiryModel.findAll();
    return NextResponse.json({ success: true, count: records.length, data: records });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch enquiries from database", details: error?.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status parameter." }, { status: 400 });
    }

    await EnquiryModel.updateStatus(id, status);
    return NextResponse.json({ success: true, message: `Enquiry status updated to ${status}` });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update enquiry status", details: error?.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing enquiry id parameter." }, { status: 400 });
    }

    await EnquiryModel.delete(id);
    return NextResponse.json({ success: true, message: "Enquiry deleted successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete enquiry", details: error?.message },
      { status: 500 }
    );
  }
}
