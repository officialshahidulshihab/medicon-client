"use client";

import { useState, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

type ChartPoint = { month: string; value: number };

type Props = { doctorId: string };

const SKELETON_HEIGHTS = ["45%", "70%", "55%", "80%", "60%", "40%", "65%"];

const ChartSkeleton = () => (
  <div className="h-[280px] flex items-end gap-2 px-2 animate-pulse">
    {SKELETON_HEIGHTS.map((height, i) => (
      <div
        key={i}
        className="flex-1 rounded-t-lg bg-white/5"
        style={{ height }}
      />
    ))}
  </div>
);

const MonthlyPerformanceChart = ({ doctorId }: Props) => {
  const [activeTab, setActiveTab] = useState<"appointments" | "revenue">(
    "appointments"
  );
  const [appointmentsData, setAppointmentsData] = useState<ChartPoint[]>([]);
  const [revenueData, setRevenueData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChart = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/doctor-chart/${doctorId}`
        );

        if (!res.ok) throw new Error("Failed to load chart data");

        const data = await res.json();
        setAppointmentsData(data.appointments ?? []);
        setRevenueData(data.revenue ?? []);
      } catch (err) {
        setError("Could not load chart data.");
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) fetchChart();
  }, [doctorId]);

  const data = activeTab === "appointments" ? appointmentsData : revenueData;

  return (
    <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-6 h-full">

      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-bold text-lg">Monthly Performance</h2>
          {error && (
            <p className="text-red-400 text-xs mt-1">{error}</p>
          )}
        </div>

        <div className="flex items-center bg-white/5 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === "appointments"
                ? "bg-white/15 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab("revenue")}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === "revenue"
                ? "bg-white/15 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Revenue (৳K)
          </button>
        </div>
      </div>

      
      {loading ? (
        <ChartSkeleton />
      ) : data.length === 0 ? (
        <div className="h-[280px] flex flex-col items-center justify-center gap-2">
          <p className="text-gray-500 text-sm">No data yet</p>
          <p className="text-gray-600 text-xs">
            Data will appear once appointments are confirmed.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const value = payload[0]?.value;
                const display =
                  activeTab === "revenue" ? `৳${value}K` : String(value);
                return (
                  <div
                    style={{
                      backgroundColor: "#0d1526",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "13px",
                      padding: "10px 14px",
                    }}
                  >
                    <p style={{ color: "#6b7280", marginBottom: 4 }}>{label}</p>
                    <p style={{ color: "#06b6d4", fontWeight: 600 }}>
                      {display}{" "}
                      <span style={{ color: "#6b7280", fontWeight: 400 }}>
                        {activeTab === "revenue" ? "revenue" : "appointments"}
                      </span>
                    </p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MonthlyPerformanceChart;