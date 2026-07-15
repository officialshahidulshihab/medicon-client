"use client";
 
import Link from "next/link";
import { FaTh, FaBook, FaHeadset } from "react-icons/fa";
 
const ACTIONS = [
  {
    icon: <FaTh />,
    label: "Browse All Specialties",
    href: "/doctors",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.08)",
    hoverBg: "rgba(56,189,248,0.15)",
    border: "rgba(56,189,248,0.15)",
  },
  
  {
    icon: <FaHeadset />,
    label: "Contact Support",
    href: "/about",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    hoverBg: "rgba(52,211,153,0.15)",
    border: "rgba(52,211,153,0.15)",
  },
];
 
const QuickActions = () => {
    return (
         <div
      className="rounded-2xl p-5"
      style={{ background: "#131b2e", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <h3 className="text-white font-bold text-sm mb-4">Quick Actions</h3>
      <div className="flex flex-col gap-2">
        {ACTIONS.map((action) => (
          <Link key={action.label} href={action.href}>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all"
              style={{ background: action.bg, border: `1px solid ${action.border}` }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = action.hoverBg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = action.bg)
              }
            >
              <span style={{ color: action.color }} className="text-sm">
                {action.icon}
              </span>
              <span className="text-gray-300 text-sm font-medium">
                {action.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    );
};

export default QuickActions;