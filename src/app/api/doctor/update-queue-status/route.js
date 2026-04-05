import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const ALLOWED_QUEUE_STATUS = [
  'scheduled',
  'arrived',
  'in_chair',
  'completed',
  'no_show',
];

export async function POST(request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { success: false, error: 'Supabase environment variables are not configured.' },
        { status: 500 }
      );
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body.' },
        { status: 400 }
      );
    }

    const { id, queue_status } = body || {};

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid appointment id is required.' },
        { status: 400 }
      );
    }

    if (!queue_status || !ALLOWED_QUEUE_STATUS.includes(queue_status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid queue_status. Allowed values: ${ALLOWED_QUEUE_STATUS.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('appointments')
      .update({ queue_status })
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message || 'Failed to update queue status.' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Queue status updated successfully.',
        appointment: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error.',
      },
      { status: 500 }
    );
  }
}