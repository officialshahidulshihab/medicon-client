"use client";

import { useEffect, useState, useCallback } from "react";
import StatCardDoctor from "./StatCardDoctor";

type Props = {
  id: string;
};

type DoctorStats = {
  total: number;
  pending: number;
  cancelled: number;
  completed: number;
  totalPatients: number;
  revenue: number;
  rating: number;
  consultationFee: number;
};

const DEFAULT_STATS: DoctorStats = {
  total: 0,
  pending: 0,
  cancelled: 0,
  completed: 0,
  totalPatients: 0,
  revenue: 0,
  rating: 0,
  consultationFee: 0,
};

const StatsGrid = ({ id }: Props) => {
  const [stats, setStats] = useState<DoctorStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctor-stats/${id}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("StatsGrid fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchStats();

  
    const interval = setInterval(fetchStats, 30_000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCardDoctor
        icon="📅"
        iconBg="bg-cyan-500/20"
        value={loading ? "—" : String(stats.total)}
        label="Total Appointments"
        badge={`${stats.pending} pending`}
      />
      <StatCardDoctor
        icon="👥"
        iconBg="bg-cyan-500/20"
        value={loading ? "—" : String(stats.totalPatients)}
        label="Total Patients"
        badge={`${stats.completed} completed`}
      />
      <StatCardDoctor
        icon="⭐"
        iconBg="bg-yellow-500/20"
        value={loading ? "—" : stats.rating > 0 ? `${stats.rating}★` : "0★"}
        label="Average Rating"
        badge="reviews"
      />
      <StatCardDoctor
        icon="📈"
        iconBg="bg-purple-500/20"
        value={loading ? "—" : stats.revenue > 0 ? `৳${stats.revenue}K` : "—"}
        label="Revenue"
        badge={`${stats.cancelled} cancelled`}
      />
    </div>
  );
};

export default StatsGrid;