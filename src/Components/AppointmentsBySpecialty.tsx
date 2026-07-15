"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";


const data = [
  { name: "Cardiology",   value: 28, color: "#f87171" },
  { name: "Neurology",    value: 18, color: "#a78bfa" },
  { name: "Orthopedics",  value: 22, color: "#fbbf24" },
  { name: "Pediatrics",   value: 15, color: "#f472b6" },
  { name: "Others",       value: 17, color: "#22d3ee" },
];
const AppointmentsBySpecialty = () => {
    return (
         <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-6 h-full">

      <h2 className="text-white font-bold text-lg mb-6">
        Appointments by Specialty
      </h2>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#0d1526",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "13px",
            }}
            formatter={(value) => [`${value}%`, ""]}
          />
        </PieChart>
      </ResponsiveContainer>

      
      <div className="flex flex-col gap-2.5 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-400 text-sm">{item.name}</span>
            </div>
            <span className="text-white text-sm font-medium">{item.value}%</span>
          </div>
        ))}
      </div>

    </div>
    );
};

export default AppointmentsBySpecialty;