"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface Stat {
  id: number;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const useCounter = (
  target: number,
  decimals: number,
  active: boolean,
): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (current >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [active, target, decimals]);

  return count;
};


interface StatCardProps {
  stat: Stat;
  active: boolean;
}

const StatCard = ({ stat, active }: StatCardProps) => {
  const count = useCounter(stat.value, stat.decimals ?? 0, active);
  const Icon = stat.icon;

  const displayValue =
    stat.decimals && stat.decimals > 0
      ? count.toFixed(stat.decimals)
      : count >= 1000
        ? count.toLocaleString("en-US")
        : count.toString();

  return (
    <motion.div
      className="flex flex-col items-center text-center px-6 py-2"
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: stat.id * 0.1,
      }}
    >
      
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{
          backgroundColor: stat.iconBg,
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: `0 0 20px ${stat.iconColor}22`,
        }}
      >
        <Icon size={22} style={{ color: stat.iconColor }} aria-hidden="true" />
      </div>

      
      <p
        className="text-4xl md:text-5xl font-extrabold leading-none mb-2 tracking-tight"
        style={{ color: "#ffffff" }}
      >
        {displayValue}
        <span style={{ color: "#ffffff" }}>{stat.suffix}</span>
      </p>

      
      <p
        className="text-sm font-medium tracking-wide"
        style={{ color: "#4e9eff" }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
};

export default StatCard;
