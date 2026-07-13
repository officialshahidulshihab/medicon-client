"use client";
 
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
 
const SPECIALTIES = [
  "All Specialties",
  "Cardiologist",
  "Neurologist",
  "Orthopedic Surgeon",
  "Gynecologist",
  "Pediatrician",
  "Dermatologist",
  "Ophthalmologist",
];
 
const RATING_OPTIONS = ["Any", "4+", "4.5+", "4.8+"];
 
type Props = {
  selectedSpecialty: string;
  setSelectedSpecialty: (v: string) => void;
  maxFee: number;
  setMaxFee: (v: number) => void;
  selectedRating: string;
  setSelectedRating: (v: string) => void;
  onReset: () => void;
};
 
function CollapsibleSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
 
  return (
    <div className="rounded-2xl border border-white/10 bg-[#131b2e] p-4">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full mb-3 cursor-pointer group"
      >
        <span className="text-white font-semibold text-sm">{title}</span>
        {open
          ? <FiChevronUp className="text-gray-500 group-hover:text-gray-300 transition-colors" />
          : <FiChevronDown className="text-gray-500 group-hover:text-gray-300 transition-colors" />
        }
      </button>
      {open && children}
    </div>
  );
}

const FilterSideBar = ({
  selectedSpecialty,
  setSelectedSpecialty,
  maxFee,
  setMaxFee,
  selectedRating,
  setSelectedRating,
  onReset,
}: Props) => {
     const feePercent = (maxFee / 5000) * 100;
    return (
          <aside className="w-full lg:w-[260px] shrink-0 flex flex-col gap-3">
      
      <CollapsibleSection title="Specialty">
        <ul className="flex flex-col gap-0.5">
          {SPECIALTIES.map((s) => (
            <li key={s}>
              <button
                onClick={() => setSelectedSpecialty(s)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  selectedSpecialty === s
                    ? "bg-cyan-500/15 text-cyan-400 font-semibold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      </CollapsibleSection>
 
    
      <CollapsibleSection title="Max Consultation Fee">
        <div className="flex justify-between text-xs mb-3">
          <span className="text-gray-500">৳ 0</span>
          <span className="text-cyan-400 font-semibold">৳ {maxFee.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={0}
          max={5000}
          step={100}
          value={maxFee}
          onChange={(e) => setMaxFee(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-cyan-400
            [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(34,211,238,0.6)]
            [&::-webkit-slider-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, #22d3ee ${feePercent}%, #1e293b ${feePercent}%)`,
          }}
        />
      </CollapsibleSection>
 
      
      <CollapsibleSection title="Minimum Rating">
        <div className="flex flex-wrap gap-2">
          {RATING_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRating(r)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                selectedRating === r
                  ? "border-cyan-500 bg-cyan-500/15 text-cyan-400 font-semibold"
                  : "border-white/15 text-gray-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </CollapsibleSection>
 
      
      <button
        onClick={onReset}
        className="w-full py-2.5 rounded-2xl border border-white/10 bg-[#131b2e] text-cyan-400 text-sm font-semibold hover:bg-white/5 transition-colors cursor-pointer"
      >
        Reset Filters
      </button>
    </aside>
    );
};

export default FilterSideBar;