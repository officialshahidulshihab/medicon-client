"use client";
 
type Props = {
  bio: string;
  onChange: (field: string, value: string) => void;
};
 
const ProfileBioSection = ({ bio, onChange }: Props) => {
    return (
        <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-6">
 
      
      <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-6">
        Profile &amp; Bio
      </h2>
 
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-white/80 font-medium">
          Professional Bio
        </label>
        <textarea
          name="bio"
          placeholder="Write a detailed professional bio describing your expertise, specialization, and approach to patient care..."
          value={bio}
          onChange={(e) => onChange("bio", e.target.value)}
          rows={6}
          maxLength={1000}
          className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 transition-colors resize-none leading-relaxed"
        />
 
        
        <p className="text-white/30 text-xs text-right">
          {bio.length} / 1000
        </p>
      </div>
 
    </div>
    );
};

export default ProfileBioSection;