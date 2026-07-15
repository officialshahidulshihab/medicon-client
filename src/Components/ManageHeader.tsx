import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const ManageHeader = () => {
  return (
    <div className="bg-[#0a0f1e] border-b border-white/10 px-6 py-6">
      <div className="max-w-5xl mx-auto flex items-start justify-between">
        
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/doctor"
            className="text-white/50 hover:text-white transition-colors mt-0.5"
          >
            <FaChevronLeft className="text-sm" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Manage Listings</h1>
            <p className="text-white/40 text-sm mt-0.5">
              View and manage your appointments and active listings.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/doctor"
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
        >
          <MdDashboard className="text-base" />
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ManageHeader;
