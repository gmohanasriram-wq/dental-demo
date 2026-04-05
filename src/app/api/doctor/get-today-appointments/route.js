import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase environment variables are not configured.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('date', today)
      .order('time', { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Failed to fetch today appointments.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        date: today,
        appointments: data || [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Internal server error.',
      },
      { status: 500 }
    );
  }
}