"use client";
import AppointmentsTable, {
  type Appointment,
} from "@/Components/AppointmentsTable";
import DashboardHeader from "@/Components/DashboardHeader";
import NextAppointment from "@/Components/NextAppointment";
import QuickActions from "@/Components/QuickActions";
import RecentlyViewedDoctors, {
  RecentDoctor,
} from "@/Components/RecentlyViewedDoctors";
import StatsCards from "@/Components/StatsCards";
import { authClient } from "@/lib/auth-client";
import { getUserData } from "@/lib/data";
import { useEffect, useState } from "react";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const init = async () => {
      const { data: session } = await authClient.getSession();
      if (!session?.user) {
        setLoading(false);
        return;
      }

      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      });

      
     const data=await getUserData()
      setAppointments(data);

      setLoading(false);
    };
    init();
  }, []);

 
  const handleCancel = async (id: string) => {
  const confirmed = window.confirm("Are you sure you want to cancel?");
  if (!confirmed) return;

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}/cancel`, {
    method: "PATCH",
  });

 
  setAppointments((prev) =>
    prev.map((a) => (a._id === id ? { ...a, status: "cancelled" } : a))
  );
};

  
  const stats = {
    total: appointments.length,
    upcoming: appointments.filter(
      (a) => a.status === "confirmed" || a.status === "pending",
    ).length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };

  
  const nextAppointment =
    appointments.find(
      (a) => a.status === "confirmed" || a.status === "pending",
    ) ?? null;

 
  const recentDoctors: RecentDoctor[] = Array.from(
    new Map(
      appointments.map((a) => [
        a.doctorId,
        {
          _id: a.doctorId,
          name: a.doctorName,
          specialty: a.doctorSpecialty,
          hospital:a.doctorHospital, 
          photo: a.doctorPhoto,
          rating: a.doctorRating 
        },
      ]),
    ).values(),
  ).slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading dashboard...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0a0f1e] font-sans px-6 py-8 md:px-12 lg:px-20">
      {user && <DashboardHeader name={user.name} email={user.email} />}

      <StatsCards {...stats} />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <AppointmentsTable
            appointments={appointments}
            onCancel={handleCancel}
          />
          <RecentlyViewedDoctors doctors={recentDoctors} />
        </div>

       
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          <NextAppointment
            appointment={nextAppointment}
            onCancel={handleCancel}
          />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
