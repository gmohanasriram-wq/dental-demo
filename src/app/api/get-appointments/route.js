import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '');
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function normalizeName(name) {
  return String(name || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function getPatientKey(appt) {
  const phone = normalizePhone(appt.phone);
  const email = normalizeEmail(appt.email);
  const name = normalizeName(appt.name);

  if (phone) return `phone:${phone}`;
  if (email) return `email:${email}`;
  if (name) return `name:${name}`;

  return `id:${appt.id}`;
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const visitMap = new Map();

    const appointmentsWithCount = (data || []).map((appt) => {
      const key = getPatientKey(appt);
      const currentCount = (visitMap.get(key) || 0) + 1;

      visitMap.set(key, currentCount);

      return {
        ...appt,
        booking_count: currentCount,
      };
    });

    appointmentsWithCount.sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      return bTime - aTime;
    });

    return NextResponse.json(
      { appointments: appointmentsWithCount },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}