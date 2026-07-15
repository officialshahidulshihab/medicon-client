"use client";
 
import { FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
 
interface Stat {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
}
const StatsCards = ({
  total = 0,
  upcoming = 0,
  completed = 0,
  cancelled = 0,
}: {
  total?: number;
  upcoming?: number;
  completed?: number;
  cancelled?: number;
}) => {
    const stats: Stat[] = [
    {
      label: "Total Appointments",
      value: total,
      icon: <FaCalendarAlt />,
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.08)",
      border: "rgba(56,189,248,0.2)",
    },
    {
      label: "Upcoming",
      value: upcoming,
      icon: <FaClock />,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.08)",
      border: "rgba(251,191,36,0.2)",
    },
    {
      label: "Completed",
      value: completed,
      icon: <FaCheckCircle />,
      color: "#34d399",
      bg: "rgba(52,211,153,0.08)",
      border: "rgba(52,211,153,0.2)",
    },
    {
      label: "Cancelled",
      value: cancelled,
      icon: <FaTimesCircle />,
      color: "#f87171",
      bg: "rgba(248,113,113,0.08)",
      border: "rgba(248,113,113,0.2)",
    },
  ];
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl p-5 flex flex-col gap-3"
          style={{
            background: "#131b2e",
            border: `1px solid ${stat.border}`,
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-base"
            style={{ background: stat.bg, color: stat.color }}
          >
            {stat.icon}
          </div>
          <div>
            <p
              className="text-3xl font-extrabold leading-none mb-1"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="text-gray-400 text-xs">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
    );
};

export default StatsCards;