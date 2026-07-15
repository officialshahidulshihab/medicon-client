import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ChartsRow from "@/Components/ChartsRow";
import DoctorDashboardHeader from "@/Components/DoctorDashboardHeader";
import RecentAppointments from "@/Components/RecentAppointments";
import StatsGrid from "@/Components/StatsGrid";
import WeeklyAppointmentChart from "@/Components/WeeklyAppointmentChart";

const DoctorDashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) redirect("/signin");

  const id = session.user.id;

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white px-6 py-8 space-y-8">
      <DoctorDashboardHeader />
      <StatsGrid id={id} />
      <ChartsRow doctorId={id} />  
      <WeeklyAppointmentChart doctorId={id}  />
      <RecentAppointments doctorId={id}/>
    </div>
  );
};

export default DoctorDashboard;