"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { LuUsers } from "react-icons/lu";
import { PiStethoscope } from "react-icons/pi";
import { TbMapPin } from "react-icons/tb";
import { MdOutlineStar } from "react-icons/md";
import StatCard, { type Stat } from "./StatCard"; 


const stats: Stat[] = [
  {
    id: 1,
    icon: LuUsers,
    iconColor: "#22d3ee",
    iconBg: "#0f2340",
    value: 50000,
    suffix: "+",
    label: "Patients Served",
    decimals: 0,
  },
  {
    id: 2,
    icon: PiStethoscope,
    iconColor: "#34d399",
    iconBg: "#0d2035",
    value: 500,
    suffix: "+",
    label: "Specialist Doctors",
    decimals: 0,
  },
  {
    id: 3,
    icon: TbMapPin,
    iconColor: "#f59e0b",
    iconBg: "#121e30",
    value: 8,
    suffix: "",
    label: "Divisions Covered",
    decimals: 0,
  },
  {
    id: 4,
    icon: MdOutlineStar,
    iconColor: "#a78bfa",
    iconBg: "#141830",
    value: 4.8,
    suffix: "",
    label: "Average Rating",
    decimals: 1,
  },
];

const StatSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="w-full py-14 px-6 md:px-12"
      style={{
        background:
          "linear-gradient(180deg, #050d1a 0%, #071325 60%, #060f20 100%)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
        {stats.map((stat, index) => (
          <div key={stat.id} className="relative">
            
            {index > 0 && (
              <div
                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-14"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(78,158,255,0.15), transparent)",
                }}
                aria-hidden="true"
              />
            )}
            
            <StatCard stat={stat} active={isInView} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatSection;