"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaStar, FaTrash, FaPen } from "react-icons/fa";
import type { Doctor } from "@/app/dashboard/doctor/manage/page";

type Props = {
  doctor: Doctor | null;
  userId: string;
};


const DeleteModal = ({
  doctorName,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  doctorName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
    />

    
    <div className="relative bg-[#0d1526] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
      
      <div className="w-12 h-12 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center mx-auto mb-4">
        <FaTrash className="text-red-400 text-base" />
      </div>

      <h3 className="text-white font-bold text-lg text-center mb-2">
        Delete Listing?
      </h3>
      <p className="text-white/50 text-sm text-center mb-6 leading-relaxed">
        This will permanently remove{" "}
        <span className="text-white font-medium">{doctorName}</span> from
        Medicon. Existing appointments will not be deleted.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/60 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-40"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {isDeleting ? "Deleting…" : "Yes, Delete"}
        </button>
      </div>
    </div>
  </div>
);


const ActiveListingCard = ({ doctor, userId }: Props) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handleDelete = async () => {
    if (!doctor) return;
    setIsDeleting(true);
    setDeleteError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/${doctor._id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        const data = await res.json();
        setDeleteError(data?.message ?? "Failed to delete listing.");
        return;
      }

      
      router.push("/dashboard/doctor");
      router.refresh();
    } catch {
      setDeleteError("Network error. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal && doctor && (
        <DeleteModal
          doctorName={doctor.name}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
          isDeleting={isDeleting}
        />
      )}

      <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-6">
        <h2 className="text-white font-bold text-base mb-4">Active Listing</h2>

       
        {!doctor ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <p className="text-white/40 text-sm">
              You haven&apos;t created a listing yet.
            </p>
            <Link
              href="/dashboard/doctor/add-listing"
              className="text-sm font-semibold text-white bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-xl transition-colors"
            >
              + Add Listing
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4 bg-[#111827] border border-white/5 rounded-xl px-4 py-4">
           
            <div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0 border border-white/10">
              {doctor.photo ? (
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-cyan-400/10 flex items-center justify-center">
                  <span className="text-cyan-400 text-xl font-bold">
                    {doctor.name?.[0] ?? "D"}
                  </span>
                </div>
              )}
            </div>

            
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-base leading-tight">
                {doctor.name}
              </p>
              <p className="text-cyan-400 text-sm mt-0.5">
                {doctor.specialty} · {doctor.hospital}, {doctor.location}
              </p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1 text-yellow-400 text-xs font-medium">
                  <FaStar className="text-[10px]" />
                  {doctor.rating ?? 0}
                  <span className="text-white/30 font-normal">
                    ({doctor.totalReviews ?? 0} reviews)
                  </span>
                </span>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-white/50 text-xs">
                  ৳{doctor.consultationFee?.toLocaleString()} / session
                </span>
              
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    doctor.isAvailable
                      ? "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
                      : "bg-red-400/10 border-red-400/20 text-red-400"
                  }`}
                >
                  {doctor.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>

        
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link href={`/dashboard/doctor/edit-listing`}>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors">
                  <FaPen className="text-[11px]" />
                  Edit
                </button>
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                aria-label="Delete listing"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
          </div>
        )}

       
        {deleteError && (
          <p className="text-red-400 text-xs mt-3 text-center">{deleteError}</p>
        )}
      </div>
    </>
  );
};

export default ActiveListingCard;