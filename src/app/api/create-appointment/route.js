import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      service,
      date,
      time,
      message,
      doctor,
      source,
      chair,
      queue_status,
    } = body;

    if (!name || !phone || !service || !date || !time) {
      return NextResponse.json(
        {
          error: 'Missing required fields: name, phone, service, date, and time are required',
        },
        { status: 400 }
      );
    }

    const allowedSources = ['online', 'walkin', 'phone'];
    const allowedQueueStatuses = ['scheduled', 'arrived', 'in_chair', 'completed', 'no_show'];

    const normalizedSource = source || 'walkin';
    const normalizedQueueStatus = queue_status || 'scheduled';

    if (!allowedSources.includes(normalizedSource)) {
      return NextResponse.json(
        {
          error: `Invalid source. Allowed values: ${allowedSources.join(', ')}`,
        },
        { status: 400 }
      );
    }

    if (!allowedQueueStatuses.includes(normalizedQueueStatus)) {
      return NextResponse.json(
        {
          error: `Invalid queue_status. Allowed values: ${allowedQueueStatuses.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const payload = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : null,
      service: String(service).trim(),
      date,
      time: String(time).trim(),
      message: message ? String(message).trim() : null,
      doctor: doctor ? String(doctor).trim() : null,
      source: normalizedSource,
      chair: chair ? String(chair).trim() : null,
      queue_status: normalizedQueueStatus,
      status: 'booked',
    };

    const { data, error } = await supabase
      .from('appointments')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Appointment created successfully',
        appointment: data,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}