"use client";
 

const ALL_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];
 
type Props = {
  availableSlots: string[];
  isAvailable: boolean;
  onSlotsChange: (slots: string[]) => void;
  onIsAvailableChange: (value: boolean) => void;
};
const AvailabilitySection = ({
  availableSlots,
  isAvailable,
  onSlotsChange,
  onIsAvailableChange,
}: Props) => {
     const toggleSlot = (slot: string) => {
    if (availableSlots.includes(slot)) {
      onSlotsChange(availableSlots.filter((s) => s !== slot));
    } else {
      
      const next = [...availableSlots, slot].sort(
        (a, b) => ALL_SLOTS.indexOf(a) - ALL_SLOTS.indexOf(b)
      );
      onSlotsChange(next);
    }
  };
    return (
          <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-6">
      
      <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-6">
        Availability
      </h2>
 
      <div className="flex items-center justify-between mb-6 bg-[#111827] border border-white/10 rounded-xl px-4 py-3">
        <div>
          <p className="text-sm text-white/80 font-medium">Currently accepting patients</p>
          <p className="text-xs text-white/30 mt-0.5">
            Patients will see your profile as{" "}
            <span className={isAvailable ? "text-emerald-400" : "text-red-400"}>
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </p>
        </div>
 
        
        <button
          type="button"
          role="switch"
          aria-checked={isAvailable}
          onClick={() => onIsAvailableChange(!isAvailable)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
            isAvailable ? "bg-emerald-500" : "bg-white/10"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
              isAvailable ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
 
      
      <div>
        <p className="text-sm text-white/60 mb-3">
          Select your available time slots{" "}
          {availableSlots.length > 0 && (
            <span className="text-cyan-400 font-medium">
              ({availableSlots.length} selected)
            </span>
          )}
        </p>
 
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ALL_SLOTS.map((slot) => {
            const selected = availableSlots.includes(slot);
            return (
              <button
                type="button"
                key={slot}
                onClick={() => toggleSlot(slot)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 border ${
                  selected
                    ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-300"
                    : "bg-[#111827] border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
 
       
        {availableSlots.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {availableSlots.map((slot) => (
              <span
                key={slot}
                className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-2.5 py-1 text-cyan-400 text-xs font-medium"
              >
                {slot}
                <button
                  type="button"
                  onClick={() => toggleSlot(slot)}
                  className="text-cyan-400/50 hover:text-cyan-300 transition-colors"
                  aria-label={`Remove ${slot}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
    );
};

export default AvailabilitySection;