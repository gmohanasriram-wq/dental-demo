import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create supabase client directly here to avoid import path issues
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ── POST — Save new appointment ── */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📋 Received appointment:", body);

    // Basic validation
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          name:    body.name    || null,
          phone:   body.phone   || null,
          email:   body.email   || null,
          service: body.service || null,
          date:    body.date    || null,
          time:    body.time    || null,
          message: body.message || null,
        },
      ])
      .select();

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.log("✅ Appointment saved:", data);
    return NextResponse.json({ success: true, data });

  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ── GET — Fetch all appointments (for admin) ── */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });

  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}