type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
};
 

const DoctorPagination = ({ currentPage, totalPages, onPageChange }: Props) => {
    return (
        <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/25 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        Prev
      </button>
 
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
            p === currentPage
              ? "bg-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]"
              : "border border-white/10 text-gray-400 hover:text-white hover:border-white/25"
          }`}
        >
          {p}
        </button>
      ))}
 
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/25 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        Next
      </button>
    </div>
    );
};

export default DoctorPagination;