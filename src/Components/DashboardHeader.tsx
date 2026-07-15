"use client";
 
import Link from "next/link";
import { FaSearch, FaUser } from "react-icons/fa";
const DashboardHeader = ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
    const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shrink-0"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #0096c7)" }}
        >
          {initials}
        </div>
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-widest mb-0.5"
            style={{ color: "#38bdf8" }}
          >
            Patient Portal
          </p>
          <h1 className="text-white font-extrabold text-xl leading-tight">
            My Health Dashboard
          </h1>
          <p className="text-gray-400 text-xs mt-0.5">
            {name} · {email}
          </p>
        </div>
      </div>
 
      
      <div className="flex items-center gap-3">
        <Link href="/doctors">
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white font-semibold text-sm transition-opacity hover:opacity-90 cursor-pointer"
            style={{
              background: "linear-gradient(90deg, #00b4d8, #0096c7)",
              boxShadow: "0 2px 14px rgba(0,180,216,0.35)",
            }}
          >
            <FaSearch className="text-xs" />
            Find a Doctor
          </button>
        </Link>
        
      </div>
    </div>
    );
};

export default DashboardHeader;