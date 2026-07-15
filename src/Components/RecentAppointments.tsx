"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";


interface Appointment {
  _id: string;
  doctorId: string;
  userId: string;
  date: string;       
  timeSlot: string;   
  status: "pending" | "confirmed" | "cancelled" | "completed";
  patientName: string;
  patientEmail: string;
  patientPhoto: string;
  createdAt: string;
}

interface RecentAppointmentsProps {
  doctorId: string;
}

const StatusBadge = ({ status }: { status: Appointment["status"] }) => {
  const styles: Record<Appointment["status"], string> = {
    confirmed:  "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20",
    pending:    "bg-yellow-400/10  text-yellow-400  border border-yellow-400/20",
    cancelled:  "bg-red-400/10     text-red-400     border border-red-400/20",
    completed:  "bg-cyan-400/10    text-cyan-400    border border-cyan-400/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};


const SkeletonRow = () => (
  <tr className="border-t border-white/5">
    {[1, 2, 3, 4, 5].map((i) => (
      <td key={i} className="py-4 px-4">
        <div className="h-3.5 rounded-md bg-white/5 animate-pulse w-3/4" />
      </td>
    ))}
  </tr>
);


const formatDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
};


const shortId = (id: string) =>
  `APT · ${id.slice(-4).toUpperCase()}`;


const RecentAppointments = ({ doctorId }: RecentAppointmentsProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/doctor/${doctorId}?limit=5`
      );
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json: Appointment[] = await res.json();
      setAppointments(json);
    } catch (err) {
      console.error("RecentAppointments fetch error:", err);
      setError("Couldn't load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) fetchAppointments();
  }, [doctorId]);

  return (
    <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-6">

      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-bold text-lg leading-tight">
            Recent Appointments
          </h2>
          {!loading && !error && (
            <p className="text-gray-500 text-xs mt-0.5">
              Last {appointments.length} bookings
            </p>
          )}
        </div>
        <Link
          href="/dashboard/doctor/manage"
          className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors flex items-center gap-1"
        >
          View All <span aria-hidden>→</span>
        </Link>
      </div>

     
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {["Appt. ID", "Patient", "Date", "Time", "Status"].map((col) => (
                <th
                  key={col}
                  className="text-left py-3 px-4 text-cyan-400 text-xs font-semibold uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            
            {loading &&
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

           
            {!loading && error && (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <p className="text-gray-400 text-sm mb-3">{error}</p>
                  <button
                    onClick={fetchAppointments}
                    className="text-xs text-cyan-400 border border-cyan-400/30 rounded-lg px-3 py-1.5 hover:bg-cyan-400/10 transition-colors"
                  >
                    Retry
                  </button>
                </td>
              </tr>
            )}

            
            {!loading && !error && appointments.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <p className="text-gray-400 text-sm">No appointments yet</p>
                  <p className="text-gray-600 text-xs mt-1">
                    Bookings will appear here once patients schedule with you
                  </p>
                </td>
              </tr>
            )}

            
            {!loading &&
              !error &&
              appointments.map((appt, index) => (
                <tr
                  key={appt._id}
                  className={`border-t border-white/5 hover:bg-white/[0.02] transition-colors ${
                    index === 0 ? "border-t-0" : ""
                  }`}
                >
                 
                  <td className="py-4 px-4">
                    <span className="text-gray-400 text-sm font-mono">
                      {shortId(appt._id)}
                    </span>
                  </td>

                  
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {appt.patientPhoto ? (
                        <Image
                          src={appt.patientPhoto}
                          alt={appt.patientName}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-white/10"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-cyan-400/10 flex items-center justify-center flex-shrink-0 border border-cyan-400/20">
                          <span className="text-cyan-400 text-xs font-semibold">
                            {appt.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-white text-sm font-medium leading-tight">
                          {appt.patientName}
                        </p>
                        {appt.patientEmail && (
                          <p className="text-gray-500 text-xs truncate max-w-[140px]">
                            {appt.patientEmail}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  
                  <td className="py-4 px-4">
                    <span className="text-gray-300 text-sm">
                      {formatDate(appt.date)}
                    </span>
                  </td>

                 
                  <td className="py-4 px-4">
                    <span className="text-gray-300 text-sm">{appt.timeSlot}</span>
                  </td>

                  <td className="py-4 px-4">
                    <StatusBadge status={appt.status} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentAppointments;