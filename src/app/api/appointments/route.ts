import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Create supabase client directly here to avoid import path issues
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ── POST — Save new appointment ── */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, date, time, message } = body;

    console.log("📋 Received appointment:", body);

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Count how many times this phone number has booked before
    const { count, error: countError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('phone', phone);

    if (countError) {
      console.error("❌ Count error:", countError);
      return NextResponse.json({ success: false, error: countError.message }, { status: 500 });
    }

    const bookingCount = (count || 0) + 1;

    const { data, error } = await supabase
      .from("appointments")
      .insert([{
        name:    body.name    || null,
        phone:   body.phone   || null,
        email:   body.email   || null,
        service: body.service || null,
        date:    body.date    || null,
        time:    body.time    || null,
        message: body.message || null,
        status:  'new',
        booking_count: bookingCount
      }])
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