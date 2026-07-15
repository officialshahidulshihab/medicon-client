"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";


interface DayData {
  day: string;
  appointments: number;
}

interface WeeklyAppointmentChartProps {
  doctorId: string;
}


const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1526] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-cyan-400 font-semibold text-sm">
        {payload[0].value}{" "}
        <span className="text-gray-400 font-normal">
          appointment{payload[0].value !== 1 ? "s" : ""}
        </span>
      </p>
    </div>
  );
};


const ChartSkeleton = () => (
  <div className="flex items-end justify-between gap-2 h-[220px] px-2 pt-4">
    {["60%", "85%", "45%", "100%", "70%", "55%", "35%"].map((h, i) => (
      <div key={i} className="flex-1 flex flex-col items-center gap-2">
        <div
          className="w-full rounded-t-md bg-white/5 animate-pulse"
          style={{ height: h }}
        />
        <div className="h-3 w-6 rounded bg-white/5 animate-pulse" />
      </div>
    ))}
  </div>
);


const WeeklyAppointmentChart = ({ doctorId }: WeeklyAppointmentChartProps) => {
  const [data, setData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!doctorId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/doctor-weekly-chart/${doctorId}`
        );

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const json: DayData[] = await res.json();
        setData(json);
      } catch (err) {
        console.error("WeeklyAppointmentChart fetch error:", err);
        setError("Couldn't load chart data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId]);


  const maxVal = Math.max(...data.map((d) => d.appointments), 0);
  const totalWeek = data.reduce((sum, d) => sum + d.appointments, 0);
  const busiestDay = data.find((d) => d.appointments === maxVal)?.day ?? null;

  return (
    <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-6">

     
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-white font-bold text-lg leading-tight">
            Weekly Appointments
          </h2>
          {!loading && !error && busiestDay && (
            <p className="text-gray-400 text-xs mt-1">
              Busiest day:{" "}
              <span className="text-cyan-400 font-medium">{busiestDay}</span>
              {" · "}
              <span className="text-gray-300">{totalWeek} total this week</span>
            </p>
          )}
        </div>

        {!loading && !error && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="text-gray-500 text-xs">Live</span>
          </div>
        )}
      </div>

      {loading && <ChartSkeleton />}

      {error && (
        <div className="flex flex-col items-center justify-center h-[220px] gap-3">
          <p className="text-gray-400 text-sm">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              
              setData([]);
              setTimeout(() => {
                fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/doctor-weekly-chart/${doctorId}`
                )
                  .then((r) => r.json())
                  .then(setData)
                  .catch(() => setError("Couldn't load chart data. Please try again."))
                  .finally(() => setLoading(false));
              }, 0);
            }}
            className="text-xs text-cyan-400 border border-cyan-400/30 rounded-lg px-3 py-1.5 hover:bg-cyan-400/10 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && totalWeek === 0 && (
        <div className="flex flex-col items-center justify-center h-[220px] gap-2">
          <p className="text-gray-400 text-sm">No appointments this week</p>
          <p className="text-gray-600 text-xs">
            Data will appear once bookings are made
          </p>
        </div>
      )}

      {!loading && !error && totalWeek > 0 && (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ffffff10"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="appointments" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={
                    entry.day === busiestDay
                      ? "#22d3ee"           
                      : entry.appointments > 0
                      ? "#164e63"           
                      : "#1e293b"           
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

    
      {!loading && !error && totalWeek > 0 && (
        <div className="grid grid-cols-7 gap-1 mt-4">
          {data.map((d) => (
            <div
              key={d.day}
              className={`flex flex-col items-center gap-0.5 rounded-lg py-1.5 transition-colors ${
                d.day === busiestDay
                  ? "bg-cyan-400/10"
                  : "bg-transparent"
              }`}
            >
              <span
                className={`text-[11px] font-semibold ${
                  d.day === busiestDay ? "text-cyan-400" : "text-gray-500"
                }`}
              >
                {d.appointments}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyAppointmentChart;