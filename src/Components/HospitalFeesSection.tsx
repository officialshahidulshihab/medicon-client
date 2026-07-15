"use client";

import Image from "next/image";

 
type Props = {
  hospital: string;
  consultationFee: string;
  photoUrl: string;
  onChange: (field: string, value: string) => void;
};
const HospitalFeesSection = ({
  hospital,
  consultationFee,
  photoUrl,
  onChange,
}: Props) => {
    return (
        <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-6">
 
    
      <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-6">
        Hospital &amp; Fees
      </h2>
 
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
 
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/80 font-medium">
            Hospital / Clinic Name
          </label>
          <input
            type="text"
            name="hospital"
            placeholder="e.g. Square Hospital"
            value={hospital}
            onChange={(e) => onChange("hospital", e.target.value)}
            className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 transition-colors"
          />
        </div>
 
        
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/80 font-medium">
            Consultation Fee (৳)
          </label>
          <input
            type="number"
            name="consultationFee"
            placeholder="e.g. 1500"
            min={0}
            value={consultationFee}
            onChange={(e) => onChange("consultationFee", e.target.value)}
            className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 transition-colors"
          />
        </div>
 
      </div>
 
     
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-white/80 font-medium">
          Profile Photo URL
        </label>
        <input
          type="url"
          name="photoUrl"
          placeholder="https://..."
          value={photoUrl}
          onChange={(e) => onChange("photoUrl", e.target.value)}
          className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 transition-colors"
        />
 
        
        {photoUrl && (
          <div className="mt-3 flex items-center gap-3">
            <Image
              src={photoUrl}
              alt="Profile preview"
              width={14}
              height={14}
              className="w-14 h-14 rounded-xl object-cover border border-white/10"
              onError={(e) => {
                
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <p className="text-white/40 text-xs">Photo preview</p>
          </div>
        )}
 
      </div>
 
    </div>
    );
};

export default HospitalFeesSection;