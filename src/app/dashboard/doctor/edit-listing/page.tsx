import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import EditListingForm from "@/Components/EditListingForm";

const EditListingPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) redirect("/signin");

  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/doctors/by-user/${session.user.id}`,
    { cache: "no-store" }
  );

  
  if (!res.ok) redirect("/dashboard/doctor/add-listing");

  const doctor = await res.json();

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
     
      <div className="bg-[#0a0f1e] border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3 mb-1">
          <Link href="/dashboard/doctor/manage" className="text-white/60 hover:text-white transition-colors">
            <FaChevronLeft className="text-sm" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Edit Listing</h1>
        </div>
        <p className="text-cyan-400 text-sm ml-6">
          Update your doctor profile and availability.
        </p>
      </div>

      <EditListingForm doctor={doctor} />
    </div>
  );
};

export default EditListingPage;