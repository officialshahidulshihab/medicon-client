"use client";

type Props = {
  qualifications: string[];
  onChange: (qualifications: string[]) => void;
};

const QualificationsSection = ({ qualifications, onChange }: Props) => {
  const handleItemChange = (index: number, value: string) => {
    const updated = [...qualifications];
    updated[index] = value;
    onChange(updated);
  };

  const addRow = () => {
    onChange([...qualifications, ""]);
  };

  const removeRow = (index: number) => {
  
    if (qualifications.length === 1) {
      onChange([""]);
      return;
    }
    onChange(qualifications.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-6">
     
      <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-6">
        Qualifications
      </h2>

      <div className="flex flex-col gap-3">
        {qualifications.map((qual, index) => (
          <div key={index} className="flex items-center gap-3">
          
            <span className="w-6 h-6 flex-shrink-0 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-semibold">
              {index + 1}
            </span>

            <input
              type="text"
              placeholder={
                index === 0
                  ? "e.g. MBBS - Dhaka Medical College"
                  : index === 1
                    ? "e.g. MD (Cardiology) - BSMMU"
                    : "e.g. Fellowship - Apollo Hospitals India"
              }
              value={qual}
              onChange={(e) => handleItemChange(index, e.target.value)}
              className="flex-1 bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/60 transition-colors"
            />

            
            <button
              type="button"
              onClick={() => removeRow(index)}
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
              aria-label="Remove qualification"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

    
      <button
        type="button"
        onClick={addRow}
        className="mt-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors group"
      >
        <span className="w-6 h-6 rounded-full border border-cyan-500/40 group-hover:border-cyan-400 flex items-center justify-center transition-colors">
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
        Add another qualification
      </button>
    </div>
  );
};

export default QualificationsSection;
