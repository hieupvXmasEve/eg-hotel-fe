import ApiClient from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

const api = new ApiClient("en", "usd");

export async function POST(request: NextRequest) {
  try {
    await api.fetch("/booking/register", {
      method: "POST",
      data: request.body,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}
