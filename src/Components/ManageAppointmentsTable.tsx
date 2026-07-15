"use client";

import { useState } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";
import type { Appointment } from "@/app/dashboard/doctor/manage/page";


type FilterTab = "All" | "confirmed" | "pending" | "cancelled" | "completed";


const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-");
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
};

const shortId = (index: number) => `#APT${String(index + 1).padStart(3, "0")}`;

const StatusBadge = ({ status }: { status: Appointment["status"] }) => {
  const map: Record<Appointment["status"], { label: string; cls: string }> = {
    confirmed:  { label: "Confirmed",  cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    pending:    { label: "Pending",    cls: "bg-yellow-500/15  text-yellow-400  border-yellow-500/30"  },
    cancelled:  { label: "Cancelled",  cls: "bg-red-500/15     text-red-400     border-red-500/30"     },
    completed:  { label: "Completed",  cls: "bg-cyan-500/15    text-cyan-400    border-cyan-500/30"    },
  };
  const { label, cls } = map[status] ?? map.pending;
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${cls}`}>
      {label}
    </span>
  );
};


const CancelModal = ({
  patientName,
  onConfirm,
  onClose,
  isLoading,
}: {
  patientName: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-[#0d1526] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
      <h3 className="text-white font-bold text-lg text-center mb-2">
        Cancel Appointment?
      </h3>
      <p className="text-white/50 text-sm text-center mb-6 leading-relaxed">
        This will cancel the appointment for{" "}
        <span className="text-white font-medium">{patientName}</span>. The
        patient will need to rebook.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/60 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-40"
        >
          Keep it
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Cancelling…" : "Yes, Cancel"}
        </button>
      </div>
    </div>
  </div>
);


type Props = {
  initialAppointments: Appointment[];
  doctorId: string;
};

const TABS: FilterTab[] = ["All", "confirmed", "pending", "cancelled", "completed"];

const ManageAppointmentsTable = ({ initialAppointments, doctorId }: Props) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  
  const count = (status: Appointment["status"]) =>
    appointments.filter((a) => a.status === status).length;

  const filtered =
    activeTab === "All"
      ? appointments
      : appointments.filter((a) => a.status === activeTab);


  const handleCancel = async () => {
    if (!cancelTarget) return;
    setLoadingId(cancelTarget._id);
    setActionError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${cancelTarget._id}/cancel`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("Failed to cancel");
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === cancelTarget._id ? { ...a, status: "cancelled" } : a
        )
      );
    } catch {
      setActionError("Could not cancel appointment. Try again.");
    } finally {
      setLoadingId(null);
      setCancelTarget(null);
    }
  };

 
  const handleConfirm = async (appt: Appointment) => {
    setLoadingId(appt._id);
    setActionError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${appt._id}/confirm`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("Failed to confirm");
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === appt._id ? { ...a, status: "confirmed" } : a
        )
      );
    } catch {
      setActionError("Could not confirm appointment. Try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      {cancelTarget && (
        <CancelModal
          patientName={cancelTarget.patientName}
          onConfirm={handleCancel}
          onClose={() => setCancelTarget(null)}
          isLoading={loadingId === cancelTarget._id}
        />
      )}

      <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-6">

       
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-white font-bold text-base">
            All Appointments{" "}
            <span className="text-white/40 font-normal">
              ({appointments.length})
            </span>
          </h2>

        
          <div className="flex items-center gap-2 flex-wrap">
            {count("confirmed") > 0 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {count("confirmed")} confirmed
              </span>
            )}
            {count("pending") > 0 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                {count("pending")} pending
              </span>
            )}
            {count("cancelled") > 0 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                {count("cancelled")} cancelled
              </span>
            )}
            {count("completed") > 0 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {count("completed")} completed
              </span>
            )}
          </div>
        </div>

        
        <div className="flex gap-2 mb-5 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer border ${
                activeTab === tab
                  ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/40"
                  : "text-gray-400 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {tab === "All" ? `All (${appointments.length})` : `${tab} (${count(tab as Appointment["status"])})`}
            </button>
          ))}
        </div>

       
        {actionError && (
          <div className="mb-4 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
            {actionError}
          </div>
        )}

      
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {["Appt. ID", "Patient Name", "Date", "Time", "Status", "Actions"].map((col) => (
                  <th
                    key={col}
                    className="text-left pb-3 px-4 text-cyan-400 text-xs font-semibold uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 text-sm">
                    No appointments in this category.
                  </td>
                </tr>
              ) : (
                filtered.map((appt, index) => {
                  const isLoading = loadingId === appt._id;
                  return (
                    <tr
                      key={appt._id}
                      className={`border-t border-white/5 hover:bg-white/[0.02] transition-colors ${
                        isLoading ? "opacity-50" : ""
                      }`}
                    >
                      
                      <td className="py-4 px-4">
                        <span className="text-cyan-400 text-sm font-medium">
                          {shortId(index)}
                        </span>
                      </td>

                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {appt.patientPhoto ? (
                            <img
                              src={appt.patientPhoto}
                              alt={appt.patientName}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-white/10"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
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
                            <p className="text-white text-sm font-semibold leading-tight">
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

                  
                      <td className="py-4 px-4 text-gray-300 text-sm whitespace-nowrap">
                        {formatDate(appt.date)}
                      </td>

                      
                      <td className="py-4 px-4 text-gray-300 text-sm whitespace-nowrap">
                        {appt.timeSlot}
                      </td>

                     
                      <td className="py-4 px-4">
                        <StatusBadge status={appt.status} />
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                       
                          {appt.status === "pending" && (
                            <button
                              onClick={() => handleConfirm(appt)}
                              disabled={isLoading}
                              title="Confirm appointment"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 hover:bg-emerald-400/20 transition-colors disabled:opacity-40 cursor-pointer"
                            >
                              <FaCheck className="text-[10px]" />
                              Confirm
                            </button>
                          )}

                          
                          {(appt.status === "pending" || appt.status === "confirmed") && (
                            <button
                              onClick={() => setCancelTarget(appt)}
                              disabled={isLoading}
                              title="Cancel appointment"
                              className="w-8 h-8 rounded-lg bg-red-400/10 border border-red-400/20 flex items-center justify-center text-red-400 hover:bg-red-400/20 transition-colors disabled:opacity-40 cursor-pointer"
                              aria-label="Cancel appointment"
                            >
                              <FaTrash className="text-[10px]" />
                            </button>
                          )}

                         
                          {(appt.status === "completed" || appt.status === "cancelled") && (
                            <span className="text-white/20 text-xs">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageAppointmentsTable;