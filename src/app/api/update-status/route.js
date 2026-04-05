import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: id and status are required' },
        { status: 400 }
      );
    }

    const allowedStatuses = ['new', 'confirmed', 'cancelled', 'completed', 'contacted', 'booked'];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Status updated successfully', appointment: data?.[0] || null },
      { status: 200 }
    );

  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}