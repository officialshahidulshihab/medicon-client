"use client";
import Image from "next/image";

import { CiLocationOn, CiStar } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
const Banner = () => {
  const DIVISIONS = [
    "Dhaka",
    "Chittagong",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
  ];

  const [division, setDivision] = useState("Dhaka");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

   const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (division !== "Dhaka") params.set("division", division);
    router.push(`/doctors?${params.toString()}`);
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <section
      className="relative w-full "
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, #0e2235 0%, #07111e 50%, #040a14 100%)",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,180,216,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-0 py-16 lg:py-0 lg:min-h-[calc(100vh-64px)]">
        <div className="flex-1 flex flex-col items-start lg:pr-12 z-10">
          {/* Trust badge */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: "rgba(0,180,216,0.08)",
              border: "1px solid rgba(0,180,216,0.25)",
            }}
          >
            <HiOutlineSparkles className="text-[#0ea5e9]" />
            <span className="text-[#00b4d8] text-xs font-semibold">
              Trusted by 50,000+ patients across Bangladesh
            </span>
          </div>

          <h1
            className="text-white font-extrabold leading-[1.1] mb-5"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}
          >
            Find Your
            <br />
            <span style={{ color: "#00b4d8" }}>Specialist Doctor</span>
            <br />
            in Bangladesh
          </h1>

          <p className="text-[#7aafc9] text-base leading-relaxed mb-8 max-w-md">
            Book appointments with verified specialist doctors across all 8
            divisions. Real profiles, real reviews, real care — instantly.
          </p>

          <div
            className="flex items-center w-full max-w-xl rounded-full p-1.5 gap-1"
            style={{
              background: "rgba(9,22,40,0.95)",
              border: "1px solid rgba(30,58,95,0.7)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex items-center gap-2.5 flex-1 px-4">
              <IoIosSearch className="text-[#0ea5e9]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Specialty, doctor name..."
                className="bg-transparent text-white text-sm outline-none w-full placeholder-[#3a6080]"
              />
            </div>

            <div
              className="w-px self-stretch"
              style={{ background: "rgba(30,58,95,0.8)" }}
            />

            <div
              ref={dropdownRef}
              className="relative flex items-center gap-2 px-4 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <CiLocationOn color="#00b4d8" />
              <span className="text-[#c8dae8] text-sm">{division}</span>
              <FaChevronDown size={10} color="#7aafc9" className="" />

              {open && (
                <div
                  className="absolute top-10 left-0 z-50 rounded-xl overflow-hidden py-1"
                  style={{
                    background: "#0a1628",
                    border: "1px solid rgba(30,58,95,0.8)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    minWidth: 160,
                  }}
                >
                  {DIVISIONS.map((d) => (
                    <div
                      key={d}
                      onClick={(e) => {
                        setDivision(d);
                        setOpen(false);
                      }}
                      className="px-4 py-2.5 text-sm cursor-pointer transition-colors"
                      style={{
                        color: division === d ? "#00d4f5" : "#c8dae8",
                        background:
                          division === d
                            ? "rgba(0,180,216,0.1)"
                            : "transparent",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(0,180,216,0.08)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          division === d
                            ? "rgba(0,180,216,0.1)"
                            : "transparent")
                      }
                    >
                      {d}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
            onClick={handleSearch}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-white font-bold text-sm transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(90deg, #00b4d8, #0096c7)",
                boxShadow: "0 2px 14px rgba(0,180,216,0.4)",
              }}
            >
              <IoIosSearch />
              Search
            </button>
          </div>

          <div className="flex items-center gap-6 mt-8 flex-wrap">
            <div className="flex items-center gap-2">
              <MdVerifiedUser className=" text-[#00bb82]" />
              <span className="text-[#c8dae8] text-sm">
                <strong className="text-white">500+</strong> Verified Doctors
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CiLocationOn className="text-[#0c91cf]" />
              <span className="text-[#c8dae8] text-sm">
                <strong className="text-white">8</strong> Divisions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CiStar className="text-[#f3b101]" />
              <span className="text-[#c8dae8] text-sm">
                <strong className="text-white">4.8</strong> Average Rating
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center relative lg:justify-end lg:flex-[1.3]">
          <div className="relative" style={{ width: 520, maxWidth: "100%" }}>
            {/* Main photo card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                height: 560,
                background: "#0d1f35",
                border: "1px solid rgba(30,58,95,0.5)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              }}
            >
              <Image
                src="/doctor-hero.jpg"
                alt="Dr. Farhan Ahmed — Senior Cardiologist"
                fill
                className="object-cover object-top"
                priority
                // Fallback gradient shown if image missing
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "linear-gradient(160deg, #1a3a5c 0%, #0d2137 60%, #060e1c 100%)",
                }}
              />

              <div
                className="absolute bottom-0 left-0 right-0 px-5 py-4"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,12,24,0.98) 0%, rgba(5,12,24,0.85) 100%)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-base">
                      Dr. Farhan Ahmed
                    </h3>
                    <p
                      style={{ color: "#00b4d8" }}
                      className="text-sm font-medium"
                    >
                      Senior Cardiologist
                    </p>
                    <p className="text-[#5a8aaa] text-xs mt-0.5">
                      Square Hospital, Dhaka
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      border: "1px solid rgba(245,158,11,0.3)",
                    }}
                  >
                    <CiStar size={13} className="text-[#f3b101]" />
                    <span className="text-[#f59e0b] text-sm font-bold">
                      4.9
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -left-5 top-8 px-4 py-3 rounded-2xl"
              style={{
                background: "#0d1f35",
                border: "1px solid rgba(30,58,95,0.6)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              }}
            >
              <div className="text-white font-extrabold text-xl leading-none">
                14
              </div>
              <div className="text-[#5a8aaa] text-xs mt-0.5">Years Exp.</div>
            </div>

            <div
              className="absolute -right-5 top-20 px-4 py-3 rounded-2xl"
              style={{
                background: "#0d1f35",
                border: "1px solid rgba(30,58,95,0.6)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              }}
            >
              <div className="text-white font-extrabold text-xl leading-none">
                312
              </div>
              <div className="text-[#5a8aaa] text-xs mt-0.5">Reviews</div>
            </div>

            <div
              className="absolute -right-5 bottom-28 flex items-center gap-2 px-4 py-2.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, #00b4d8, #0096c7)",
                boxShadow: "0 4px 18px rgba(0,180,216,0.45)",
              }}
            >
              <MdVerifiedUser className="text-[#ffffff]" />
              <span className="text-white text-sm font-bold">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
