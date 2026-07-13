"use client";

import { useState } from "react";
import Image from "next/image";
import { CiHospital1 } from "react-icons/ci";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { MdWorkspacePremium, MdVerified } from "react-icons/md";
import { BsChatSquareText } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import DoctorCard from "@/Components/DoctorCard";
import { Doctor } from "@/lib/data";

export interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export interface DoctorDetail extends Doctor {
  bio: string;
  qualifications: string[];
  reviews: Review[];
  isVerified: boolean;
}

function getNextAvailableDates(count = 3) {
  const dates: { label: string; value: string }[] = [];
  const today = new Date();
  let offset = 0;

  while (dates.length < count) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    dates.push({
      label: d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      value: d.toISOString().split("T")[0],
    });
    offset++;
  }
  return dates;
}

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "2:00 PM", "4:30 PM"];

const TRUST_ITEMS = [
  "Free cancellation up to 2 hours before",
  "SMS confirmation sent immediately",
  "No hidden charges",
];

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const starClass = size === "md" ? "text-base" : "text-xs";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${starClass} ${
            star <= Math.round(rating) ? "text-yellow-400" : "text-gray-600"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function BookingWidget({
  fee,
  isAvailable,
}: {
  fee: number;
  isAvailable: boolean;
}) {
  const dates = getNextAvailableDates(3);
  const [selectedDate, setSelectedDate] = useState(dates[0].value);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selectedSlot) {
      alert("Please select a time slot first.");
      return;
    }
    alert(`Appointment booked for ${selectedDate} at ${selectedSlot}`);
  };

  return (
    <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-6">
      <div className="rounded-2xl border border-white/10 bg-[#131b2e] p-5">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-0.5">
              Consultation Fee
            </p>
            <p className="text-white font-extrabold text-3xl leading-none">
              ৳ {fee.toLocaleString()}
            </p>
          </div>
          {isAvailable && (
            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-1 rounded-full mt-0.5 whitespace-nowrap">
              Available Today
            </span>
          )}
        </div>

        <p className="text-white text-sm font-semibold mb-2">Select Date</p>
        <div className="flex gap-2 mb-5">
          {dates.map((d) => (
            <button
              key={d.value}
              onClick={() => {
                setSelectedDate(d.value);
                setSelectedSlot(null);
              }}
              className={`flex-1 text-[11px] py-2 px-1 rounded-lg border transition-all cursor-pointer ${
                selectedDate === d.value
                  ? "bg-cyan-500 border-cyan-500 text-white font-bold"
                  : "border-white/10 text-gray-400 hover:border-cyan-400/40 hover:text-white"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <p className="text-white text-sm font-semibold mb-2">Available Slots</p>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`flex items-center gap-1.5 text-xs py-2.5 px-3 rounded-lg border transition-all cursor-pointer ${
                selectedSlot === slot
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold"
                  : "border-white/10 text-gray-400 hover:border-white/25 hover:text-white"
              }`}
            >
              <IoTimeOutline className="text-sm shrink-0" />
              {slot}
            </button>
          ))}
        </div>

        <button
          onClick={handleConfirm}
          disabled={!isAvailable}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
            isAvailable
              ? "bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-white cursor-pointer"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          Confirm Appointment
        </button>

        <div className="mt-4 flex flex-col gap-2.5">
          {TRUST_ITEMS.map((text) => (
            <div
              key={text}
              className="flex items-center gap-2 text-xs text-gray-400"
            >
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const DoctorDetailesClient = ({
  doctor,
  relatedDoctors,
}: {
  doctor: DoctorDetail;
  relatedDoctors: Doctor[];
}) => {
  return (
    <div className="min-h-screen bg-[#0a0f1e] font-sans">
      <div className="px-6 py-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            <div className="rounded-2xl border border-white/10 bg-[#131b2e] p-6">
              <div className="flex gap-5 items-start">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-xl overflow-hidden relative">
                    <Image
                      src={doctor.photo}
                      alt={doctor.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  {doctor.isAvailable && (
                    <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#131b2e]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <h1 className="text-white font-bold text-xl leading-tight">
                      {doctor.name}
                    </h1>
                    {doctor.isVerified && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-cyan-300 border border-cyan-400/50 bg-cyan-400/5 px-2 py-0.5 rounded-full">
                        <MdVerified className="text-xs" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-cyan-400 font-semibold text-sm mb-0.5">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-400 text-sm mb-3">
                    {doctor.hospital}
                  </p>

                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-gray-400 text-sm">
                    <span className="flex items-center gap-1.5">
                      <IoLocationOutline className="text-base" />
                      {doctor.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MdWorkspacePremium className="text-base" />
                      {doctor.experience} yrs exp.
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-yellow-400 text-base">★</span>
                      <span className="text-white font-semibold">
                        {doctor.rating}
                      </span>
                      <span className="text-gray-500 text-xs">
                        ({doctor.totalReviews} reviews)
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#131b2e] p-6">
              <h2 className="text-white font-bold text-base mb-3">About</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {doctor.bio}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#131b2e] p-6">
              <h2 className="flex items-center gap-2 text-white font-bold text-base mb-4">
                <CiHospital1 className="text-cyan-400 text-xl" />
                Qualifications & Training
              </h2>
              <ul className="flex flex-col gap-3">
                {(doctor.qualifications ?? []).map((q, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-300 text-sm"
                  >
                    <FaCheckCircle className="text-emerald-400 shrink-0 text-base" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#131b2e] p-6">
              <h2 className="flex items-center gap-2 text-white font-bold text-base mb-4">
                <BsChatSquareText className="text-cyan-400 text-lg" />
                Patient Reviews ({doctor.totalReviews})
              </h2>
              <div className="flex flex-col gap-5">
                {(doctor.reviews ?? []).map((rev, i) => (
                  <div
                    key={i}
                    className="border-b border-white/5 pb-5 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-800 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {rev.name[0].toUpperCase()}
                        </div>
                        <span className="text-white text-sm font-semibold">
                          {rev.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={rev.rating} />
                        <span className="text-gray-500 text-xs">
                          {rev.date}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed ml-10">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {relatedDoctors.length > 0 && (
              <div>
                <h2 className="text-white font-bold text-base mb-4">
                  Other {doctor.specialty}s
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedDoctors.slice(0, 2).map((d) => (
                    <DoctorCard key={d._id} doctor={d} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <BookingWidget
            fee={doctor.consultationFee}
            isAvailable={doctor.isAvailable}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailesClient;
