import AllDoctorClient from "@/Components/AllDoctorClient";
import { getAllDoctors } from "@/lib/data";
import { Suspense } from "react";

const AllDoctorPage = async () => {
  const doctors = await getAllDoctors();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      }
    >
      <AllDoctorClient doctors={doctors} />
    </Suspense>
  );
};

export default AllDoctorPage;
