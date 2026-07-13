import { getFeaturedDoctor } from "@/lib/data";

import Link from "next/link";
import React from "react";
import DoctorCard from "./DoctorCard";
import { object } from "better-auth";

const FeaturedSection = async () => {
  type Doctor = {
    _id: string;
    name: string;
    specialty: string;
    hospital: string;
    location: string;
    experience: number;
    consultationFee: number;
    photo: string;
    rating: number;
    totalReviews: number;
    isAvailable: boolean;
  };
  const data = await getFeaturedDoctor();

  return (
    <section className="bg-[#0d1117] px-6 py-14">
      <div className="flex items-start justify-between mb-8 max-w-7xl mx-auto">
        <div>
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-1">
            Top Rated
          </p>
          <h2 className="text-white text-3xl font-bold mb-2">
            Featured Doctors
          </h2>
          <p className="text-gray-400 text-sm">
            Handpicked specialists with outstanding patient reviews and proven
            expertise.
          </p>
        </div>
        <Link
          href="/doctors"
          className="text-cyan-400 text-sm font-medium hover:underline whitespace-nowrap mt-1"
        >
          View All Doctors →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
        {data.map((doctor: object, ind: number) => (
          <DoctorCard key={ind} doctor={doctor}></DoctorCard>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/doctors"
          className="px-8 py-3 rounded-xl border border-cyan-500/40 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/10 transition-colors"
        >
          Browse All 500+ Doctors
        </Link>
      </div>
    </section>
  );
};

export default FeaturedSection;
