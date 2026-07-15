"use client";
 

const SPECIALTIES = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "Gynecology",
  "Oncology",
  "Psychiatry",
  "General Medicine",
];
 
const LOCATIONS = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];
 
type Props = {
  fullName: string;
  experience: string;
  specialty: string;
  location: string;
  onChange: (field: string, value: string) => void;
};
const BasicInfoSection = ({
  fullName,
  experience,
  specialty,
  location,
  onChange,
}: Props) => {
    return (
        <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-6">
 
      
      <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-6">
        Basic Information
      </h2>
 
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
 
       
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/80 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Dr. Your Name"
            value={fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 transition-colors"
          />
        </div>
 
       
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/80 font-medium">Years of Experience</label>
          <input
            type="number"
            name="experience"
            placeholder="e.g. 10"
            min={0}
            value={experience}
            onChange={(e) => onChange("experience", e.target.value)}
            className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 transition-colors"
          />
        </div>
 
      </div>
 
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 
        
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/80 font-medium">Specialty</label>
          <select
            name="specialty"
            value={specialty}
            onChange={(e) => onChange("specialty", e.target.value)}
            className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/60 transition-colors appearance-none cursor-pointer"
            style={{ color: specialty ? "#fff" : "rgba(255,255,255,0.2)" }}
          >
            <option value="" disabled>Select specialty</option>
            {SPECIALTIES.map((s) => (
              <option key={s} value={s} className="text-white bg-[#111827]">
                {s}
              </option>
            ))}
          </select>
        </div>
 
        
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/80 font-medium">Location / Division</label>
          <select
            name="location"
            value={location}
            onChange={(e) => onChange("location", e.target.value)}
            className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/60 transition-colors appearance-none cursor-pointer"
            style={{ color: location ? "#fff" : "rgba(255,255,255,0.2)" }}
          >
            <option value="" disabled>Select location</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l} className="text-white bg-[#111827]">
                {l}
              </option>
            ))}
          </select>
        </div>
 
      </div>
 
    </div>
    );
};

export default BasicInfoSection;