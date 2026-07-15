
"use client"

import { useRouter } from "next/navigation";

type Props = {
  isSubmitting: boolean;
  onSubmit: () => void;
};
const FormActions = ({ isSubmitting, onSubmit }: Props) => {
    const router = useRouter();
  return (
    <div className="flex items-center justify-end gap-3">
      
      <button
        onClick={() => router.push("/dashboard/doctor")}
        disabled={isSubmitting}
        className="px-6 py-3 rounded-xl text-sm font-semibold text-white/60 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Cancel
      </button>

    
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="px-8 py-3 rounded-xl text-sm font-bold text-white bg-cyan-500 hover:bg-cyan-400 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Publishing..." : "Publish Listing"}
      </button>
    </div>
  );
};

export default FormActions;
