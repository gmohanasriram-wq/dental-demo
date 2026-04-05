'use client';

import { useEffect, useMemo, useState } from 'react';

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  service: '',
  date: '',
  time: '',
  message: '',
  doctor: '',
  source: 'walkin',
  chair: '',
  queue_status: 'scheduled',
};

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'today', label: 'Today' },
  { key: 'online', label: 'Online' },
  { key: 'walkin', label: 'Walk-in' },
  { key: 'phone', label: 'Phone' },
];

export default function AdminPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    date: getTodayInputDate(),
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/get-appointments');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch');
      }

      setAppointments(data.appointments || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    setUpdating(id + status);

    try {
      const res = await fetch('/api/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update');
      }

      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch (err) {
      alert('Update failed: ' + err.message);
    } finally {
      setUpdating(null);
    }
  }

  async function handleCreateAppointment(e) {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess('');
    setCreating(true);

    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        service: form.service.trim(),
        date: form.date,
        time: form.time,
        message: form.message.trim(),
        doctor: form.doctor.trim(),
        source: form.source,
        chair: form.chair.trim(),
        queue_status: form.queue_status,
      };

      const res = await fetch('/api/create-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create appointment');
      }

      if (data.appointment) {
        setAppointments((prev) => [data.appointment, ...prev]);
      }

      setCreateSuccess('Appointment created successfully.');
      setForm({
        ...INITIAL_FORM,
        date: getTodayInputDate(),
      });
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreating(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function getStats() {
    const todayStr = getTodayInputDate();

    return {
      recordsToday: appointments.filter((a) => getDateOnly(a.date || a.created_at) === todayStr).length,
      total: appointments.length,
      contacted: appointments.filter((a) => a.status === 'contacted' || a.status === 'booked').length,
      booked: appointments.filter((a) => a.status === 'booked').length,
      pending: appointments.filter((a) => !a.status || a.status === 'new').length,
      returning: appointments.filter((a) => a.booking_count && a.booking_count > 1).length,
      offline: appointments.filter((a) => a.source === 'walkin' || a.source === 'phone').length,
      online: appointments.filter((a) => !a.source || a.source === 'online').length,
    };
  }

  function getVisitLabel(count) {
    if (!count || count === 1) {
      return {
        label: 'First Time',
        cls: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
      };
    }

    if (count === 2) {
      return {
        label: '2nd Visit',
        cls: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
      };
    }

    if (count === 3) {
      return {
        label: '3rd Visit',
        cls: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20',
      };
    }

    return {
      label: `${count}th Visit`,
      cls: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20',
    };
  }

  function getStatusStyle(status) {
    const map = {
      new: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10',
      contacted: 'bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20',
      booked: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
      confirmed: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
      cancelled: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10',
      completed: 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10',
    };

    return map[status] || map.new;
  }

  function getQueueStyle(queueStatus) {
    const map = {
      scheduled: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20',
      arrived: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
      in_chair: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
      completed: 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-500/10',
      no_show: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20',
    };

    return map[queueStatus] || map.scheduled;
  }

  function getSourceStyle(source) {
    const map = {
      online: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10',
      walkin: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-700/10',
      phone: 'bg-cyan-50 text-cyan-700 ring-1 ring-inset ring-cyan-700/10',
    };

    return map[source] || map.online;
  }

  function getSourceLabel(source) {
    if (source === 'walkin') return 'Walk-in';
    if (source === 'phone') return 'Phone';
    return 'Online';
  }

  function formatDate(str) {
    if (!str) return '—';

    const date = new Date(str);
    if (Number.isNaN(date.getTime())) return '—';

    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  function formatTime(value) {
    if (!value) return '—';

    const parts = String(value).split(':');
    if (parts.length < 2) return value;

    const date = new Date();
    date.setHours(Number(parts[0]), Number(parts[1]), 0, 0);

    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  function cleanPhone(phone) {
    return (phone || '').replace(/\s+/g, '').replace(/-/g, '');
  }

  function getAvatarColor(name) {
    const palette = [
      'bg-violet-500',
      'bg-blue-500',
      'bg-teal-500',
      'bg-rose-500',
      'bg-orange-500',
      'bg-indigo-500',
      'bg-pink-500',
      'bg-cyan-500',
    ];

    return palette[(name?.charCodeAt(0) || 0) % palette.length];
  }

  const filteredAppointments = useMemo(() => {
    const today = getTodayInputDate();

    return appointments.filter((appt) => {
      const appointmentDate = getDateOnly(appt.date || appt.created_at);

      if (activeFilter === 'today') return appointmentDate === today;
      if (activeFilter === 'online') return (appt.source || 'online') === 'online';
      if (activeFilter === 'walkin') return appt.source === 'walkin';
      if (activeFilter === 'phone') return appt.source === 'phone';

      return true;
    });
  }, [appointments, activeFilter]);

  const s = getStats();

  const statCards = [
    {
      label: 'Records Today',
      value: s.recordsToday,
      sub: "Today's appointments",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      iconBg: 'bg-blue-50 text-blue-600',
      valueCls: 'text-blue-700',
    },
    {
      label: 'Total Records',
      value: s.total,
      sub: 'Online + offline',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      iconBg: 'bg-slate-50 text-slate-600',
      valueCls: 'text-slate-700',
    },
    {
      label: 'Pending',
      value: s.pending,
      sub: 'Need follow-up',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      iconBg: 'bg-orange-50 text-orange-500',
      valueCls: 'text-orange-600',
    },
    {
      label: 'Contacted',
      value: s.contacted,
      sub: 'Called or messaged',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      iconBg: 'bg-amber-50 text-amber-500',
      valueCls: 'text-amber-600',
    },
    {
      label: 'Booked',
      value: s.booked,
      sub: 'Confirmed appointments',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
      iconBg: 'bg-emerald-50 text-emerald-600',
      valueCls: 'text-emerald-700',
    },
    {
      label: 'Returning',
      value: s.returning,
      sub: 'Repeat patients',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      ),
      iconBg: 'bg-violet-50 text-violet-600',
      valueCls: 'text-violet-700',
    },
    {
      label: 'Offline',
      value: s.offline,
      sub: 'Walk-in + phone',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      iconBg: 'bg-fuchsia-50 text-fuchsia-600',
      valueCls: 'text-fuchsia-700',
    },
    {
      label: 'Online',
      value: s.online,
      sub: 'Website bookings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      iconBg: 'bg-cyan-50 text-cyan-600',
      valueCls: 'text-cyan-700',
    },
  ];

  const TABLE_HEADERS = [
    'Patient',
    'Contact',
    'Service',
    'Doctor',
    'Chair',
    'Source',
    'Appointment',
    'Message',
    'Submitted',
    'Visit',
    'Status',
    'Queue',
    'Reach Out',
    'Actions',
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-none text-gray-900">Admin Dashboard</h1>
              <p className="mt-0.5 text-xs leading-none text-gray-400">Manage online and offline appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-400 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live
            </span>
            <button
              onClick={fetchAppointments}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-gray-700 disabled:opacity-50"
            >
              <svg
                className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              {loading ? 'Loading…' : 'Refresh'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-screen-2xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
            <h2 className="text-sm font-semibold text-gray-900">Quick Add Appointment</h2>
            <p className="mt-0.5 text-xs text-gray-400">Create walk-in or phone bookings without leaving the dashboard.</p>
          </div>

          <div className="px-5 py-5 sm:px-6">
            {createError && (
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <svg className="h-4 w-4 shrink-0 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm text-red-700">{createError}</p>
              </div>
            )}

            {createSuccess && (
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <svg className="h-4 w-4 shrink-0 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-sm text-emerald-700">{createSuccess}</p>
              </div>
            )}

            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Field label="Patient Name *">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                    className={inputCls}
                    required
                  />
                </Field>

                <Field label="Phone *">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className={inputCls}
                    required
                  />
                </Field>

                <Field label="Email">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Optional email"
                    className={inputCls}
                  />
                </Field>

                <Field label="Service *">
                  <input
                    type="text"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    placeholder="Cleaning / RCT / Implant"
                    className={inputCls}
                    required
                  />
                </Field>

                <Field label="Appointment Date *">
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className={inputCls}
                    required
                  />
                </Field>

                <Field label="Appointment Time *">
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className={inputCls}
                    required
                  />
                </Field>

                <Field label="Doctor">
                  <input
                    type="text"
                    name="doctor"
                    value={form.doctor}
                    onChange={handleChange}
                    placeholder="Dr. Kumar"
                    className={inputCls}
                  />
                </Field>

                <Field label="Chair">
                  <input
                    type="text"
                    name="chair"
                    value={form.chair}
                    onChange={handleChange}
                    placeholder="Chair 1"
                    className={inputCls}
                  />
                </Field>

                <Field label="Source">
                  <select name="source" value={form.source} onChange={handleChange} className={inputCls}>
                    <option value="walkin">Walk-in</option>
                    <option value="phone">Phone</option>
                    <option value="online">Online</option>
                  </select>
                </Field>

                <Field label="Queue Status">
                  <select name="queue_status" value={form.queue_status} onChange={handleChange} className={inputCls}>
                    <option value="scheduled">Scheduled</option>
                    <option value="arrived">Arrived</option>
                    <option value="in_chair">In Chair</option>
                    <option value="completed">Completed</option>
                    <option value="no_show">No Show</option>
                  </select>
                </Field>

                <div className="md:col-span-2 xl:col-span-2">
                  <Field label="Notes">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Optional notes, complaint, or booking context"
                      className={`${inputCls} min-h-[108px] resize-none`}
                    />
                  </Field>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-400">
                  Required fields: patient name, phone, service, date, and time.
                </p>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...INITIAL_FORM,
                        date: getTodayInputDate(),
                      })
                    }
                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    disabled={creating}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg
                      className={`h-4 w-4 ${creating ? 'animate-spin' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    {creating ? 'Creating…' : 'Create Appointment'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        {!loading && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 sm:gap-4">
            {statCards.map((c) => (
              <div
                key={c.label}
                className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{c.label}</span>
                  <span className={`rounded-lg p-1.5 ${c.iconBg}`}>{c.icon}</span>
                </div>
                <p className={`text-3xl font-bold leading-none tabular-nums ${c.valueCls}`}>{c.value}</p>
                <p className="text-xs leading-none text-gray-400">{c.sub}</p>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 sm:gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-28 rounded-2xl border border-gray-200 bg-white animate-pulse" />
              ))}
            </div>
            <div className="h-64 rounded-2xl border border-gray-200 bg-white animate-pulse" />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <svg className="h-4 w-4 shrink-0 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && filteredAppointments.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                <svg className="h-7 w-7 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="12" y2="16" />
                </svg>
              </div>
              <h3 className="mb-1 text-base font-semibold text-gray-800">No appointments in this view</h3>
              <p className="max-w-sm text-sm leading-relaxed text-gray-400">
                Try another filter or create a new appointment using the quick add form above.
              </p>
              <button
                onClick={fetchAppointments}
                className="mt-6 rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
              >
                Refresh
              </button>
            </div>
          </div>
        )}

        {!loading && !error && filteredAppointments.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Appointments</h2>
                <p className="mt-0.5 text-xs text-gray-400">
                  {filteredAppointments.length} showing · {appointments.length} total records
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {FILTERS.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setActiveFilter(filter.key)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeFilter === filter.key
                        ? 'bg-gray-900 text-white'
                        : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {TABLE_HEADERS.map((h) => (
                      <th
                        key={h}
                        className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {filteredAppointments.map((appt) => {
                    const isNew = !appt.status || appt.status === 'new';
                    const visit = getVisitLabel(appt.booking_count);
                    const phone = cleanPhone(appt.phone);

                    return (
                      <tr
                        key={appt.id}
                        className={`group transition-colors ${
                          isNew
                            ? 'border-l-[3px] border-l-blue-400 bg-blue-50/30 hover:bg-blue-50/60'
                            : 'hover:bg-gray-50/80'
                        }`}
                      >
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${getAvatarColor(
                                appt.name
                              )}`}
                            >
                              {appt.name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div>
                              <p className="whitespace-nowrap font-semibold leading-tight text-gray-900">
                                {appt.name || '—'}
                              </p>
                              {isNew && (
                                <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-medium text-blue-600">
                                  <span className="h-1 w-1 rounded-full bg-blue-500"></span>
                                  New
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <p className="whitespace-nowrap text-xs font-medium text-gray-700">{appt.phone || '—'}</p>
                          <p className="mt-0.5 text-xs text-gray-400">{appt.email || '—'}</p>
                        </td>

                        <td className="px-4 py-3.5">
                          {appt.service ? (
                            <span className="inline-flex items-center whitespace-nowrap rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium capitalize text-violet-700 ring-1 ring-inset ring-violet-700/10">
                              {appt.service}
                            </span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>

                        <td className="px-4 py-3.5 text-xs font-medium text-gray-700">
                          {appt.doctor || <span className="text-gray-300">—</span>}
                        </td>

                        <td className="px-4 py-3.5 text-xs font-medium text-gray-700">
                          {appt.chair || <span className="text-gray-300">—</span>}
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${getSourceStyle(
                              appt.source || 'online'
                            )}`}
                          >
                            {getSourceLabel(appt.source || 'online')}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <p className="whitespace-nowrap text-xs font-medium text-gray-700">{formatDate(appt.date)}</p>
                          <p className="mt-0.5 text-xs text-gray-400">{formatTime(appt.time)}</p>
                        </td>

                        <td className="max-w-[260px] px-4 py-3.5 align-top">
                          <div className="space-y-1">
                            <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
                              {appt.message || 'No message'}
                            </p>
                            {appt.message && (
                              <button
                                type="button"
                                onClick={() => setSelectedMessage(appt)}
                                className="text-xs font-medium text-blue-600 hover:text-blue-700"
                              >
                                View full message
                              </button>
                            )}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-3.5 text-xs text-gray-400">
                          {formatDate(appt.created_at)}
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${visit.cls}`}
                          >
                            {visit.label}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                              appt.status
                            )}`}
                          >
                            {appt.status || 'new'}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getQueueStyle(
                              appt.queue_status || 'scheduled'
                            )}`}
                          >
                            {(appt.queue_status || 'scheduled').replace('_', ' ')}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${phone}`}
                              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-emerald-600"
                            >
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.47 11.47 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.47 11.47 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2z" />
                              </svg>
                              Call
                            </a>
                            <a
                              href={`https://wa.me/91${phone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-gray-700"
                            >
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                              </svg>
                              WhatsApp
                            </a>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateStatus(appt.id, 'contacted')}
                              disabled={!!updating || appt.status === 'contacted' || appt.status === 'booked'}
                              className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                                appt.status === 'contacted' || appt.status === 'booked'
                                  ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                                  : 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 hover:bg-amber-100'
                              }`}
                            >
                              {updating === appt.id + 'contacted' ? '…' : 'Contacted'}
                            </button>

                            <button
                              onClick={() => updateStatus(appt.id, 'booked')}
                              disabled={!!updating || appt.status === 'booked'}
                              className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                                appt.status === 'booked'
                                  ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                                  : 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 hover:bg-emerald-100'
                              }`}
                            >
                              {updating === appt.id + 'booked' ? '…' : 'Booked'}
                            </button>

                            {appt.status !== 'new' && (
                              <button
                                onClick={() => updateStatus(appt.id, 'new')}
                                disabled={!!updating}
                                title="Reset to New"
                                className="whitespace-nowrap rounded-lg bg-gray-100 px-2 py-1.5 text-xs font-medium text-gray-500 transition-all hover:bg-gray-200"
                              >
                                {updating === appt.id + 'new' ? '…' : '↩'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-gray-100 xl:hidden">
              {filteredAppointments.map((appt) => {
                const isNew = !appt.status || appt.status === 'new';
                const visit = getVisitLabel(appt.booking_count);
                const phone = cleanPhone(appt.phone);

                return (
                  <div
                    key={appt.id}
                    className={`space-y-3 p-4 ${isNew ? 'border-l-[3px] border-l-blue-400 bg-blue-50/30' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${getAvatarColor(
                            appt.name
                          )}`}
                        >
                          {appt.name?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold leading-tight text-gray-900">{appt.name || '—'}</p>
                          <p className="mt-0.5 text-xs text-gray-400">{appt.phone || '—'}</p>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${getStatusStyle(
                            appt.status
                          )}`}
                        >
                          {appt.status || 'new'}
                        </span>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${visit.cls}`}>
                          {visit.label}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 rounded-xl bg-gray-50 p-3 text-xs">
                      <div>
                        <span className="text-gray-400">Email </span>
                        <span className="text-gray-700">{appt.email || '—'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Service </span>
                        <span className="capitalize text-gray-700">{appt.service || '—'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Doctor </span>
                        <span className="text-gray-700">{appt.doctor || '—'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Chair </span>
                        <span className="text-gray-700">{appt.chair || '—'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Date </span>
                        <span className="text-gray-700">{formatDate(appt.date)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Time </span>
                        <span className="text-gray-700">{formatTime(appt.time)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Source </span>
                        <span className="text-gray-700">{getSourceLabel(appt.source || 'online')}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Queue </span>
                        <span className="capitalize text-gray-700">
                          {(appt.queue_status || 'scheduled').replace('_', ' ')}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Submitted </span>
                        <span className="text-gray-700">{formatDate(appt.created_at)}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-400">Message </span>
                        <p className="mt-1 line-clamp-2 text-gray-600">
                          {appt.message || 'No message'}
                        </p>
                        {appt.message && (
                          <button
                            type="button"
                            onClick={() => setSelectedMessage(appt)}
                            className="mt-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                          >
                            View full message
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getSourceStyle(
                          appt.source || 'online'
                        )}`}
                      >
                        {getSourceLabel(appt.source || 'online')}
                      </span>

                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getQueueStyle(
                          appt.queue_status || 'scheduled'
                        )}`}
                      >
                        {(appt.queue_status || 'scheduled').replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={`tel:${phone}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-emerald-600"
                      >
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.47 11.47 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.47 11.47 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2z" />
                        </svg>
                        Call
                      </a>

                      <a
                        href={`https://wa.me/91${phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-gray-800 px-3 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-gray-700"
                      >
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => updateStatus(appt.id, 'contacted')}
                        disabled={!!updating || appt.status === 'contacted' || appt.status === 'booked'}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          appt.status === 'contacted' || appt.status === 'booked'
                            ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                            : 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 hover:bg-amber-100'
                        }`}
                      >
                        {updating === appt.id + 'contacted' ? '…' : '📞 Contacted'}
                      </button>

                      <button
                        onClick={() => updateStatus(appt.id, 'booked')}
                        disabled={!!updating || appt.status === 'booked'}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          appt.status === 'booked'
                            ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                            : 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 hover:bg-emerald-100'
                        }`}
                      >
                        {updating === appt.id + 'booked' ? '…' : '✅ Booked'}
                      </button>

                      {appt.status !== 'new' && (
                        <button
                          onClick={() => updateStatus(appt.id, 'new')}
                          disabled={!!updating}
                          className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500 transition-all hover:bg-gray-200"
                        >
                          {updating === appt.id + 'new' ? '…' : '↩ Undo'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-3 sm:px-6">
              <p className="text-xs text-gray-400">{filteredAppointments.length} records in current view</p>
              <p className="text-xs text-gray-400">Use filters to switch between online and offline bookings</p>
            </div>
          </div>
        )}
      </main>

      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Patient Message</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Full note for {selectedMessage.name || 'patient'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 px-5 py-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Patient</p>
                  <p className="mt-1 text-sm text-gray-800">{selectedMessage.name || '—'}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Phone</p>
                  <p className="mt-1 text-sm text-gray-800">{selectedMessage.phone || '—'}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Service</p>
                  <p className="mt-1 text-sm text-gray-800">{selectedMessage.service || '—'}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Appointment</p>
                  <p className="mt-1 text-sm text-gray-800">
                    {formatDate(selectedMessage.date)} · {formatTime(selectedMessage.time)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Full Message</p>
                <div className="mt-2 max-h-[320px] overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                    {selectedMessage.message || 'No message'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      {children}
    </label>
  );
}

function getTodayInputDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().split('T')[0];
}

function getDateOnly(value) {
  if (!value) return '';

  const str = String(value);
  if (str.includes('T')) return str.split('T')[0];

  return str;
}

const inputCls =
  'w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5';