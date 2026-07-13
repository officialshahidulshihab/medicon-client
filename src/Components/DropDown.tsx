"use client";
 
import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
 
type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  prefix?: React.ReactNode; // optional icon before label
};
 
const DropDown = ({ label, options, value, onChange, prefix }: Props) => {
    const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
 
    return (
         <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 bg-[#131b2e] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:border-white/20 transition-colors cursor-pointer whitespace-nowrap"
      >
        {prefix}
        {label} <span className="text-white font-medium">{value}</span>
        <FiChevronDown
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
 
      {open && (
        <ul className="absolute right-0 top-full mt-2 w-52 bg-[#131b2e] border border-white/10 rounded-xl overflow-hidden z-50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {options.map((opt) => (
            <li key={opt}>
              <button
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                  value === opt
                    ? "text-cyan-400 bg-cyan-500/10 font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    );
};

export default DropDown;