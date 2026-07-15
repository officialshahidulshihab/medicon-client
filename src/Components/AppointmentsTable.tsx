"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface Appointment {
  _id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  doctorPhoto: string;
  doctorSpecialty: string;
  doctorHospital: string;
  doctorRating: number;
  date: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

const STATUS_FILTERS = ["All", "upcoming", "completed", "cancelled"];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, { color: string; bg: string; label: string }> = {
    confirmed: {
      color: "#34d399",
      bg: "rgba(52,211,153,0.12)",
      label: "Confirmed",
    },
    pending: {
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.12)",
      label: "Pending",
    },
    completed: {
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.12)",
      label: "Completed",
    },
    cancelled: {
      color: "#f87171",
      bg: "rgba(248,113,113,0.12)",
      label: "Cancelled",
    },
  };
  const s = styles[status] ?? styles.pending;
  return (
    <span
      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
      style={{ color: s.color, background: s.bg }}
    >
      {s.label}
    </span>
  );
};

const AppointmentsTable = ({
  appointments,
  onCancel,
}: {
  appointments: Appointment[];
  onCancel: (id: string) => void;
}) => {
  const [filter, setFilter] = useState("All");

  const filtered = appointments.filter((a) => {
    if (filter === "All") return true;
    if (filter === "upcoming")
      return a.status === "confirmed" || a.status === "pending";
    return a.status === filter;
  });
  const upcomingCount = appointments.filter(
    (a) => a.status === "confirmed" || a.status === "pending",
  ).length;
  const completedCount = appointments.filter(
    (a) => a.status === "completed",
  ).length;
  const cancelledCount = appointments.filter(
    (a) => a.status === "cancelled",
  ).length;
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "#131b2e",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="text-white font-bold text-base">My Appointments</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {upcomingCount > 0 && (
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24" }}
            >
              {upcomingCount} upcoming
            </span>
          )}
          {completedCount > 0 && (
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(56,189,248,0.12)", color: "#38bdf8" }}
            >
              {completedCount} completed
            </span>
          )}
          {cancelledCount > 0 && (
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(248,113,113,0.12)", color: "#f87171" }}
            >
              {cancelledCount} cancelled
            </span>
          )}
        </div>
      </div>

     
      <div className="flex gap-2 mb-5 flex-wrap">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="text-xs px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer"
            style={{
              background:
                filter === f ? "rgba(56,189,248,0.15)" : "transparent",
              color: filter === f ? "#38bdf8" : "#6b7280",
              border:
                filter === f
                  ? "1px solid rgba(56,189,248,0.4)"
                  : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-[11px] uppercase tracking-wider">
              <th className="text-left pb-3 pr-4">Appt. ID</th>
              <th className="text-left pb-3 pr-4">Doctor</th>
              <th className="text-left pb-3 pr-4">Specialty</th>
              <th className="text-left pb-3 pr-4">Date</th>
              <th className="text-left pb-3 pr-4">Time</th>
              <th className="text-left pb-3 pr-4">Status</th>
              <th className="text-left pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-500 text-sm"
                >
                  No appointments found.
                </td>
              </tr>
            ) : (
              filtered.map((appt, i) => (
                <tr key={appt._id} className="group">
                  <td className="py-3.5 pr-4">
                    <span className="text-cyan-400 text-xs font-mono">
                      #PAT{String(i + 1).padStart(3, "0")}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0">
                        <Image
                          src={appt.doctorPhoto}
                          alt={appt.doctorName}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-white font-semibold text-xs whitespace-nowrap">
                        {appt.doctorName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-gray-400 text-xs whitespace-nowrap">
                    {appt.doctorSpecialty}
                  </td>
                  <td className="py-3.5 pr-4 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(appt.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3.5 pr-4 text-gray-400 text-xs whitespace-nowrap">
                    {appt.timeSlot}
                  </td>
                  <td className="py-3.5 pr-4">
                    <StatusBadge status={appt.status} />
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <Link href={`/doctors/${appt.doctorId}`}>
                        <button className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 hover:bg-white/10 transition-colors cursor-pointer">
                          View
                        </button>
                      </Link>
                      {(appt.status === "confirmed" ||
                        appt.status === "pending") && (
                        <button
                          onClick={() => onCancel(appt._id)}
                          className="text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                          style={{
                            background: "rgba(248,113,113,0.1)",
                            color: "#f87171",
                            border: "1px solid rgba(248,113,113,0.2)",
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;
