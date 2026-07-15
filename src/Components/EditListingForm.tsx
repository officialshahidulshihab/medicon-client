"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BasicInfoSection from "./BasicInfoSection";
import HospitalFeesSection from "./HospitalFeesSection";
import ProfileBioSection from "./ProfileBioSection";
import QualificationsSection from "./QualificationsSection";
import AvailabilitySection from "./AvailabilitySection";
import FormActions from "./FormActions";

type FormData = {
  fullName: string;
  experience: string;
  specialty: string;
  location: string;
  hospital: string;
  consultationFee: string;
  photoUrl: string;
  bio: string;
  qualifications: string[];
  availableSlots: string[];
  isAvailable: boolean;
};


type DoctorListing = {
  _id: string;
  name: string;
  experience: number;
  specialty: string;
  location: string;
  hospital: string;
  consultationFee: number;
  photo: string;
  bio: string;
  qualifications: string[];
  availableSlots: string[];
  isAvailable: boolean;
};

type Props = {
  doctor: DoctorListing;
};

const SuccessToast = ({ onDismiss }: { onDismiss: () => void }) => (
  <div className="flex items-center justify-between gap-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-5 py-4">
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-emerald-400 text-sm font-medium">
        Listing updated! Redirecting to dashboard…
      </p>
    </div>
    <button onClick={onDismiss} className="text-emerald-400/50 hover:text-emerald-400 transition-colors text-lg leading-none">×</button>
  </div>
);

const EditListingForm = ({ doctor }: Props) => {
  const router = useRouter();

  
  const [form, setForm] = useState<FormData>({
    fullName: doctor.name,
    experience: String(doctor.experience),
    specialty: doctor.specialty,
    location: doctor.location,
    hospital: doctor.hospital,
    consultationFee: String(doctor.consultationFee),
    photoUrl: doctor.photo,
    bio: doctor.bio,
    qualifications: doctor.qualifications.length > 0 ? doctor.qualifications : [""],
    availableSlots: doctor.availableSlots,
    isAvailable: doctor.isAvailable,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleQualificationsChange = (qualifications: string[]) => {
    setForm((prev) => ({ ...prev, qualifications }));
    if (error) setError("");
  };

  const handleAvailableSlotsChange = (availableSlots: string[]) => {
    setForm((prev) => ({ ...prev, availableSlots }));
    if (error) setError("");
  };

  const handleIsAvailableChange = (isAvailable: boolean) => {
    setForm((prev) => ({ ...prev, isAvailable }));
  };

  const validate = (): boolean => {
    if (!form.fullName.trim())                              { setError("Full name is required.");               return false; }
    if (!form.experience.trim() || Number(form.experience) < 0) { setError("Please enter a valid years of experience."); return false; }
    if (!form.specialty)                                    { setError("Please select a specialty.");           return false; }
    if (!form.location)                                     { setError("Please select a location.");            return false; }
    if (!form.hospital.trim())                              { setError("Hospital / clinic name is required.");  return false; }
    if (!form.consultationFee.trim() || Number(form.consultationFee) <= 0) { setError("Please enter a valid consultation fee."); return false; }
    if (!form.bio.trim())                                   { setError("Professional bio is required.");        return false; }
    if (form.qualifications.filter((q) => q.trim()).length === 0) { setError("Please add at least one qualification."); return false; }
    if (form.availableSlots.length === 0)                   { setError("Please select at least one time slot."); return false; }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/${doctor._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            qualifications: form.qualifications.filter((q) => q.trim()),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message ?? "Failed to update listing. Please try again.");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/dashboard/doctor"), 2000);
    } catch (err) {
      console.error("EditListingForm submit error:", err);
      setError("Network error. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <BasicInfoSection
        fullName={form.fullName}
        experience={form.experience}
        specialty={form.specialty}
        location={form.location}
        onChange={handleChange}
      />
      <HospitalFeesSection
        hospital={form.hospital}
        consultationFee={form.consultationFee}
        photoUrl={form.photoUrl}
        onChange={handleChange}
      />
      <ProfileBioSection bio={form.bio} onChange={handleChange} />
      <QualificationsSection
        qualifications={form.qualifications}
        onChange={handleQualificationsChange}
      />
      <AvailabilitySection
        availableSlots={form.availableSlots}
        isAvailable={form.isAvailable}
        onSlotsChange={handleAvailableSlotsChange}
        onIsAvailableChange={handleIsAvailableChange}
      />

      {error && (
        <div className="flex items-center gap-3 bg-red-400/10 border border-red-400/20 rounded-xl px-5 py-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {success && <SuccessToast onDismiss={() => setSuccess(false)} />}

      <FormActions isSubmitting={isSubmitting} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditListingForm;