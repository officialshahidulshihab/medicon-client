import { Doctor } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { CiHospital1 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { MdWorkspacePremium } from "react-icons/md";

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const id = doctor._id;
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#131b2e] overflow-hidden font-sans">
      <div className="relative h-56">
        <Image
          src={doctor.photo}
          alt={doctor.name}
          fill
          className="object-cover object-center"
        />

        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-sm ${
            doctor.isAvailable
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50"
              : "bg-red-500/20 text-red-300 border-red-400/50"
          }`}
        >
          {doctor.isAvailable ? "Available" : "Booked"}
        </span>

        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          <span className="text-yellow-400 text-sm">★</span>
          {doctor.rating}
          <span className="text-white/50">({doctor.totalReviews})</span>
        </span>
      </div>

      <div className="px-4 pt-4 pb-4">
        <p className="text-white font-bold text-base mb-0.5">{doctor.name}</p>
        <p className="text-cyan-400 text-sm font-semibold mb-3">
          {doctor.specialty}
        </p>

        <div className="flex flex-col gap-2 mb-4 text-gray-400 text-xs">
          <span className="flex items-center gap-2">
            <CiHospital1 className="text-xl" />
            {doctor.hospital}
          </span>
          <span className="flex items-center gap-2">
            <IoLocationOutline className="text-xl" />
            {doctor.location}
          </span>
          <span className="flex items-center gap-2">
            <MdWorkspacePremium className="text-xl" />
            {doctor.experience} years experience
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 gap-2">
          <div>
            <span className="text-gray-500 text-[11px] block">
              Consultation
            </span>
            <span className="text-white font-bold text-[15px]">
              ৳ {doctor.consultationFee.toLocaleString()}
            </span>
          </div>
          <div className="flex gap-2">
            <Link href={`/doctors/${id}`}>
              <button className="text-xs px-3 py-1.5 rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 transition-colors cursor-pointer">
                Profile
              </button>
            </Link>
            <Link href={`/doctors/${id}`}>
              <button
                disabled={!doctor.isAvailable}
                className={`text-xs px-4 py-1.5 rounded-lg font-semibold transition-colors ${
                  doctor.isAvailable
                    ? "bg-cyan-500 text-white hover:bg-cyan-600 cursor-pointer"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
