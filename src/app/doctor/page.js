'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

const STATUS_OPTIONS = ['scheduled', 'arrived', 'in_chair', 'completed', 'no_show'];

const STATUS_STYLES = {
  scheduled: 'bg-blue-100 text-blue-700 ring-blue-200',
  arrived: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
  in_chair: 'bg-green-100 text-green-700 ring-green-200',
  completed: 'bg-green-100 text-green-700 ring-green-200',
  no_show: 'bg-red-100 text-red-700 ring-red-200',
};

const ACTIONS = [
  { label: 'Mark Arrived', value: 'arrived' },
  { label: 'Start Visit', value: 'in_chair' },
  { label: 'Complete', value: 'completed' },
  { label: 'No-show', value: 'no_show' },
];

function formatTime(time) {
  if (!time) return '--';
  const parts = time.split(':');
  const hours = Number(parts[0]);
  const minutes = parts[1] || '00';

  if (Number.isNaN(hours)) return time;

  const suffix = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = hours % 12 || 12;
  return `${formattedHour}:${minutes} ${suffix}`;
}

function getBookingType(bookingCount) {
  return Number(bookingCount) > 1 ? 'Returning' : 'New Patient';
}

function getStatusLabel(status) {
  if (status === 'in_chair') return 'In Chair';
  if (status === 'no_show') return 'No Show';
  return (status || 'scheduled')
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function isDelayedAppointment(appointment) {
  if (!appointment?.time || appointment?.queue_status !== 'scheduled') return false;

  const now = new Date();
  const [hours, minutes] = String(appointment.time).split(':').map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) return false;

  const appointmentDateTime = new Date();
  appointmentDateTime.setHours(hours, minutes, 0, 0);

  return now > appointmentDateTime;
}

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.scheduled;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${style}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}

function StatCard({ title, value, color }) {
  const colorClasses = {
    blue: 'from-blue-50 to-white border-blue-100 text-blue-700',
    yellow: 'from-yellow-50 to-white border-yellow-100 text-yellow-700',
    green: 'from-green-50 to-white border-green-100 text-green-700',
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-5 shadow-sm ${colorClasses[color]}`}>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const [updatingId, setUpdatingId] = useState('');

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setPageError('');

      const response = await fetch('/api/doctor/get-today-appointments', {
        method: 'GET',
        cache: 'no-store',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to fetch appointments.');
      }

      setAppointments(Array.isArray(result?.appointments) ? result.appointments : []);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Something went wrong.');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const stats = useMemo(() => {
    return {
      total: appointments.length,
      arrived: appointments.filter((item) => item.queue_status === 'arrived').length,
      inChair: appointments.filter((item) => item.queue_status === 'in_chair').length,
      completed: appointments.filter((item) => item.queue_status === 'completed').length,
    };
  }, [appointments]);

  async function handleUpdateQueueStatus(id, queueStatus) {
    if (!id || !STATUS_OPTIONS.includes(queueStatus)) return;

    const previousAppointments = appointments;

    setUpdatingId(id);
    setPageError('');

    setAppointments((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              queue_status: queueStatus,
            }
          : item
      )
    );

    try {
      const response = await fetch('/api/doctor/update-queue-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          queue_status: queueStatus,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to update queue status.');
      }

      if (result?.appointment) {
        setAppointments((current) =>
          current.map((item) => (item.id === id ? result.appointment : item))
        );
      }
    } catch (error) {
      setAppointments(previousAppointments);
      setPageError(error instanceof Error ? error.message : 'Failed to update queue status.');
    } finally {
      setUpdatingId('');
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Doctor Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">Manage today&apos;s appointments and queue flow.</p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Patients Today" value={stats.total} color="blue" />
          <StatCard title="Arrived" value={stats.arrived} color="yellow" />
          <StatCard title="In Chair" value={stats.inChair} color="green" />
          <StatCard title="Completed" value={stats.completed} color="green" />
        </div>

        {pageError ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {pageError}
          </div>
        ) : null}

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-4 sm:px-6">
            <h2 className="text-lg font-semibold text-slate-900">Today&apos;s Appointments</h2>
          </div>

          {loading ? (
            <div className="space-y-4 p-4 sm:p-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 p-4"
                >
                  <div className="mb-3 h-4 w-32 rounded bg-slate-200" />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="h-4 rounded bg-slate-200" />
                    <div className="h-4 rounded bg-slate-200" />
                    <div className="h-4 rounded bg-slate-200" />
                    <div className="h-4 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : appointments.length === 0 ? (
            <div className="px-4 py-16 text-center sm:px-6">
              <p className="text-base font-medium text-slate-900">No appointments scheduled for today</p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Booking Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Queue Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {appointments.map((appointment) => {
                      const delayed = isDelayedAppointment(appointment);
                      const isUpdating = updatingId === appointment.id;

                      return (
                        <tr key={appointment.id} className="align-top">
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                            <div className="flex flex-col gap-2">
                              <span>{formatTime(appointment.time)}</span>
                              {delayed ? (
                                <span className="inline-flex w-fit items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-200">
                                  Delayed
                                </span>
                              ) : null}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900">{appointment.name || '--'}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{appointment.phone || '--'}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{appointment.service || '--'}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {getBookingType(appointment.booking_count)}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <StatusBadge status={appointment.queue_status} />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              {ACTIONS.map((action) => {
                                const disabled =
                                  isUpdating || appointment.queue_status === action.value;

                                return (
                                  <button
                                    key={action.value}
                                    type="button"
                                    onClick={() =>
                                      handleUpdateQueueStatus(appointment.id, action.value)
                                    }
                                    disabled={disabled}
                                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    {isUpdating && appointment.queue_status === action.value
                                      ? 'Updating...'
                                      : action.label}
                                  </button>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 p-4 lg:hidden">
                {appointments.map((appointment) => {
                  const delayed = isDelayedAppointment(appointment);
                  const isUpdating = updatingId === appointment.id;

                  return (
                    <div
                      key={appointment.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold text-slate-900">
                            {appointment.name || '--'}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">{formatTime(appointment.time)}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <StatusBadge status={appointment.queue_status} />
                          {delayed ? (
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-200">
                              Delayed
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Phone
                          </p>
                          <p className="mt-1 text-slate-900">{appointment.phone || '--'}</p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Service
                          </p>
                          <p className="mt-1 text-slate-900">{appointment.service || '--'}</p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Booking Type
                          </p>
                          <p className="mt-1 text-slate-900">
                            {getBookingType(appointment.booking_count)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Queue Status
                          </p>
                          <div className="mt-1">
                            <StatusBadge status={appointment.queue_status} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {ACTIONS.map((action) => {
                          const disabled =
                            isUpdating || appointment.queue_status === action.value;

                          return (
                            <button
                              key={action.value}
                              type="button"
                              onClick={() => handleUpdateQueueStatus(appointment.id, action.value)}
                              disabled={disabled}
                              className="rounded-xl border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isUpdating && appointment.queue_status === action.value
                                ? 'Updating...'
                                : action.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}