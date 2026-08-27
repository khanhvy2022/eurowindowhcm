import { NextRequest, NextResponse } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/db";

const GOOGLE_FORM_ACTION =
  process.env.GOOGLE_FORM_ACTION_URL ||
  "https://docs.google.com/forms/d/e/1FAIpQLSfJzTrwcf-czQ4dWJZhtEuQr0C5HCMllPEWAQY6sGNHXpIynw/formResponse";

const FORM_ENTRIES = {
  fullName: process.env.GOOGLE_FORM_ENTRY_NAME || "entry.1724230238",
  phone: process.env.GOOGLE_FORM_ENTRY_PHONE || "entry.1702212279",
  email: process.env.GOOGLE_FORM_ENTRY_EMAIL || "entry.968834959",
  address: process.env.GOOGLE_FORM_ENTRY_ADDRESS || "entry.1079986480",
  message: process.env.GOOGLE_FORM_ENTRY_MESSAGE || "entry.1883693442",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phone, email, address, product, message } = body;

    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập họ và tên." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập số điện thoại liên hệ." },
        { status: 400 }
      );
    }

    const cleanFullName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = (email || "").toString().trim();
    const cleanAddress = (address || "").toString().trim();
    const cleanProduct = (product || "").toString().trim();
    const cleanMessage = (message || "").toString().trim();

    const formattedNote = cleanProduct
      ? `[${cleanProduct}] ${cleanMessage}`.trim()
      : cleanMessage;

    // 1. Submit to Google Form
    let googleFormSuccess = false;
    try {
      const params = new URLSearchParams();
      params.append(FORM_ENTRIES.fullName, cleanFullName);
      params.append(FORM_ENTRIES.phone, cleanPhone);
      params.append(FORM_ENTRIES.email, cleanEmail);
      params.append(FORM_ENTRIES.address, cleanAddress);
      params.append(FORM_ENTRIES.message, formattedNote);

      const res = await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (res.ok || res.status === 302) {
        googleFormSuccess = true;
      } else {
        console.warn("[contact] Google Form returned non-200 status:", res.status);
      }
    } catch (gErr) {
      console.warn("[contact] Failed to post to Google Form:", gErr);
    }

    // 2. Save lead to MongoDB
    try {
      const db = await getDb();
      if (db) {
        await db.collection(COLLECTIONS.contacts).insertOne({
          fullName: cleanFullName,
          phone: cleanPhone,
          email: cleanEmail,
          address: cleanAddress,
          product: cleanProduct,
          message: cleanMessage,
          formattedNote,
          googleFormSynced: googleFormSuccess,
          createdAt: new Date(),
          status: "new",
        });
      }
    } catch (dbErr) {
      console.warn("[contact] Failed to save contact lead to MongoDB:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Gửi thông tin liên hệ thành công. Eurowindow sẽ liên hệ Quý khách sớm nhất!",
    });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Có lỗi xảy ra khi gửi liên hệ. Vui lòng thử lại hoặc gọi hotline 0966 994 338." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDb();
    if (!db) {
      return NextResponse.json({ success: true, contacts: [] });
    }
    const contacts = await db
      .collection(COLLECTIONS.contacts)
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    console.error("[contact GET] Error fetching contacts:", error);
    return NextResponse.json(
      { success: false, error: "Không thể lấy danh sách liên hệ" },
      { status: 500 }
    );
  }
}
