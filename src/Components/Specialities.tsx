"use client";

import {
  FaHeartbeat,
  FaBrain,
  FaEye,
  FaBaby,
  FaShieldAlt,
  FaBone,
} from "react-icons/fa";
import { GiStethoscope } from "react-icons/gi";
import { MdWaves } from "react-icons/md";

// ─── Specialty Data ───────────────────────────────────────────────────────────

const SPECIALTIES = [
  {
    name: "Cardiology",
    doctors: 48,
    icon: FaHeartbeat,
    // card bg, border color, icon circle bg, icon color
    cardBg: "rgba(80, 10, 10, 0.55)",
    border: "rgba(220, 50, 50, 0.25)",
    hoverBorder: "rgba(220, 50, 50, 0.6)",
    circleBg: "rgba(180, 30, 30, 0.35)",
    iconColor: "#f87171",
  },
  {
    name: "Neurology",
    doctors: 32,
    icon: FaBrain,
    cardBg: "rgba(30, 20, 80, 0.55)",
    border: "rgba(130, 80, 220, 0.25)",
    hoverBorder: "rgba(130, 80, 220, 0.6)",
    circleBg: "rgba(100, 60, 180, 0.35)",
    iconColor: "#a78bfa",
  },
  {
    name: "Ophthalmology",
    doctors: 29,
    icon: FaEye,
    cardBg: "rgba(5, 50, 55, 0.55)",
    border: "rgba(20, 180, 180, 0.25)",
    hoverBorder: "rgba(20, 180, 180, 0.6)",
    circleBg: "rgba(10, 140, 140, 0.35)",
    iconColor: "#2dd4bf",
  },
  {
    name: "Pediatrics",
    doctors: 41,
    icon: FaBaby,
    cardBg: "rgba(60, 10, 60, 0.55)",
    border: "rgba(200, 60, 180, 0.25)",
    hoverBorder: "rgba(200, 60, 180, 0.6)",
    circleBg: "rgba(160, 40, 140, 0.35)",
    iconColor: "#f0abfc",
  },
  {
    name: "General Medicine",
    doctors: 78,
    icon: GiStethoscope,
    cardBg: "rgba(5, 50, 40, 0.55)",
    border: "rgba(20, 180, 120, 0.25)",
    hoverBorder: "rgba(20, 180, 120, 0.6)",
    circleBg: "rgba(10, 140, 90, 0.35)",
    iconColor: "#34d399",
  },
  {
    name: "Dermatology",
    doctors: 37,
    icon: FaShieldAlt,
    cardBg: "rgba(55, 30, 5, 0.55)",
    border: "rgba(200, 120, 20, 0.25)",
    hoverBorder: "rgba(200, 120, 20, 0.6)",
    circleBg: "rgba(160, 90, 10, 0.35)",
    iconColor: "#fb923c",
  },
  {
    name: "Gynecology",
    doctors: 44,
    icon: MdWaves,
    cardBg: "rgba(30, 10, 70, 0.55)",
    border: "rgba(150, 80, 220, 0.25)",
    hoverBorder: "rgba(150, 80, 220, 0.6)",
    circleBg: "rgba(110, 50, 180, 0.35)",
    iconColor: "#c084fc",
  },
  {
    name: "Orthopedics",
    doctors: 56,
    icon: FaBone,
    cardBg: "rgba(45, 40, 5, 0.55)",
    border: "rgba(180, 160, 20, 0.25)",
    hoverBorder: "rgba(180, 160, 20, 0.6)",
    circleBg: "rgba(140, 120, 10, 0.35)",
    iconColor: "#facc15",
  },
];

// ─── Card Component ───────────────────────────────────────────────────────────

const SpecialtyCard = ({ specialty }) => {
  const Icon = specialty.icon;

  return (
    <div
      className="group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl cursor-pointer transition-all duration-300"
      style={{
        background: specialty.cardBg,
        border: `1px solid ${specialty.border}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `1px solid ${specialty.hoverBorder}`;
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = `1px solid ${specialty.border}`;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Icon circle */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ background: specialty.circleBg }}
      >
        <Icon size={24} color={specialty.iconColor} />
      </div>

      {/* Text */}
      <div className="text-center">
        <h3 className="text-white font-bold text-base mb-1">
          {specialty.name}
        </h3>
        <p
          className="text-sm font-medium"
          style={{ color: specialty.iconColor }}
        >
          {specialty.doctors} doctors
        </p>
      </div>
    </div>
  );
};

const Specialities = () => {
  return (
    <section
      className="w-full py-20 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #0a1628 0%, #060d1a 60%, #040810 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#00b4d8" }}
          >
            Specialties
          </p>
          <h2 className="text-white font-extrabold text-4xl mb-4">
            Browse by Medical Specialty
          </h2>
          <p className="text-[#7aafc9] text-base max-w-lg mx-auto leading-relaxed">
            Find the right specialist for your health needs — from cardiology to
            pediatrics, we have experts across every field.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPECIALTIES.map((specialty) => (
            <SpecialtyCard key={specialty.name} specialty={specialty} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialities;
