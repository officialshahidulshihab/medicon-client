import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ManageHeader from "@/Components/ManageHeader";
import ActiveListingCard from "@/Components/ActiveListingCard";
import ManageAppointmentsTable from "@/Components/ManageAppointmentsTable";

export interface Doctor {
  _id: string;
  userId: string;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  rating: number;
  totalReviews: number;
  consultationFee: number;
  photo: string;
  bio: string;
  experience: number;
  isAvailable: boolean;
}

export interface Appointment {
  _id: string;
  doctorId: string;
  userId: string;
  date: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  patientName: string;
  patientEmail: string;
  patientPhoto: string;
  createdAt: string;
}

const ManagePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) redirect("/signin");

  const userId = session.user.id;
  const API = process.env.NEXT_PUBLIC_API_URL;

 
  let doctor: Doctor | null = null;
  let appointments: Appointment[] = [];

  try {
    const doctorRes = await fetch(`${API}/doctors/by-user/${userId}`, {
      cache: "no-store",
    });
    if (doctorRes.ok) {
      doctor = await doctorRes.json();
    }
  } catch (err) {
    console.error("ManagePage: failed to fetch doctor listing", err);
  }


  if (doctor?._id) {
    try {
      const apptRes = await fetch(
        `${API}/appointments/doctor/${userId}?limit=50`,
        { cache: "no-store" }
      );
      if (apptRes.ok) {
        appointments = await apptRes.json();
      }
    } catch (err) {
      console.error("ManagePage: failed to fetch appointments", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <ManageHeader />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        
        <ActiveListingCard doctor={doctor} userId={userId} />

        
        {doctor && (
          <ManageAppointmentsTable
            initialAppointments={appointments}
            doctorId={doctor._id}
          />
        )}
      </div>
    </div>
  );
};

export default ManagePage;