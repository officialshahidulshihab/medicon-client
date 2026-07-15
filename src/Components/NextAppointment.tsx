"use client";
 
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import type { Appointment } from "./AppointmentsTable";
 

const NextAppointment = ({
  appointment,
  onCancel,
}: {
  appointment: Appointment | null;
  onCancel: (id: string) => void;
}) => {

    if (!appointment) {
    return (
      <div
        className="rounded-2xl p-5"
        style={{ background: "#131b2e", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-white font-bold text-sm">Next Appointment</h3>
        </div>
        <p className="text-gray-500 text-sm text-center py-6">
          No upcoming appointments.
        </p>
      </div>
    );
  }
    return (
        <div
      className="rounded-2xl p-5"
      style={{ background: "#131b2e", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <h3 className="text-white font-bold text-sm">Next Appointment</h3>
      </div>
 
      
      <div className="flex items-center gap-3 mb-5">
        <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0">
          <Image
            src={appointment.doctorPhoto}
            alt={appointment.doctorName}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-white font-bold text-sm">{appointment.doctorName}</p>
          <p className="text-cyan-400 text-xs font-medium">{appointment.doctorSpecialty}</p>
        </div>
      </div>
 
     
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(56,189,248,0.1)" }}>
            <FaCalendarAlt className="text-cyan-400 text-xs" />
          </div>
          <div>
            <p className="text-gray-500 text-[10px] uppercase tracking-wider">Date</p>
            <p className="text-white text-xs font-semibold">
              {new Date(appointment.date).toLocaleDateString("en-GB", {
                day: "2-digit", month: "short", year: "numeric",
              })}
            </p>
          </div>
        </div>
 
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(251,191,36,0.1)" }}>
            <FaClock className="text-yellow-400 text-xs" />
          </div>
          <div>
            <p className="text-gray-500 text-[10px] uppercase tracking-wider">Time</p>
            <p className="text-white text-xs font-semibold">{appointment.timeSlot}</p>
          </div>
        </div>
 
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(52,211,153,0.1)" }}>
            <FaCheckCircle className="text-emerald-400 text-xs" />
          </div>
          <div>
            <p className="text-gray-500 text-[10px] uppercase tracking-wider">Status</p>
            <p className="text-emerald-400 text-xs font-semibold capitalize">
              {appointment.status}
            </p>
          </div>
        </div>
      </div>
 
      
      <button
        onClick={() => onCancel(appointment._id)}
        className="w-full py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer"
        style={{
          background: "rgba(248,113,113,0.08)",
          color: "#f87171",
          border: "1px solid rgba(248,113,113,0.25)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(248,113,113,0.18)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(248,113,113,0.08)")}
      >
        Cancel Appointment
      </button>
    </div>
    );
};

export default NextAppointment;