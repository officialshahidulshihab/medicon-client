"use client";
 
import Image from "next/image";
import Link from "next/link";
import { CiStar } from "react-icons/ci";
 
export interface RecentDoctor {
  _id: string;
  name: string;
  specialty: string;
  hospital: string;
  photo: string;
  rating: number;
}
 
const RecentlyViewedDoctors = ({
  doctors,
}: {
  doctors: RecentDoctor[];
}) => {
    if (doctors.length === 0) return null;
    return (
        <div
      className="rounded-2xl p-6"
      style={{ background: "#131b2e", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
        <span className="text-cyan-400 text-lg">👁</span>
        Recently Viewed Doctors
      </h2>
 
      <div className="flex flex-col gap-3">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="flex items-center justify-between p-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0">
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{doctor.name}</p>
                <p className="text-cyan-400 text-xs font-medium">{doctor.specialty}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <CiStar className="text-yellow-400 text-xs" />
                  <span className="text-yellow-400 text-xs font-semibold">{doctor.rating}</span>
                  <span className="text-gray-500 text-xs">· {doctor.hospital}</span>
                </div>
              </div>
            </div>
 
           
            <Link href={`/doctors/${doctor._id}?action=book`}>
              <button
                className="text-xs px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap"
                style={{
                  background: "rgba(56,189,248,0.1)",
                  color: "#38bdf8",
                  border: "1px solid rgba(56,189,248,0.25)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(56,189,248,0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(56,189,248,0.1)")
                }
              >
                Book Again
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
    );
};

export default RecentlyViewedDoctors;