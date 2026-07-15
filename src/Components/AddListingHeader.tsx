import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
const AddListingHeader = () => {
    return (
        <div className="bg-[#0a0f1e] border-b border-white/10 px-6 py-6">
 
      
      <div className="flex items-center gap-3 mb-1">
        <Link
          href="/dashboard/doctor"
          className="text-white/60 hover:text-white transition-colors"
        >
          <FaChevronLeft className="text-sm" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Add Your Listing</h1>
      </div>
 
     
      <p className="text-cyan-400 text-sm ml-6">
        Create your doctor profile and start receiving patient bookings.
      </p>
 
    </div>
    );
};

export default AddListingHeader;