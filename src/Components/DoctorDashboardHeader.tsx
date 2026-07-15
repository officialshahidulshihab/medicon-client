import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const DoctorDashboardHeader = async () => {
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const doctor = session?.user;

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Doctor Dashboard</h1>
        <p className="text-cyan-400 text-sm mt-1">{doctor?.name}</p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/doctor/add-listing"
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          + Add Listing
        </Link>
        <Link
          href="/dashboard/doctor/manage"
          className="flex items-center gap-2 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-xl hover:bg-white/10 transition-colors"
        >
          📋 Manage
        </Link>
      </div>
    </div>
  );
};

export default DoctorDashboardHeader;