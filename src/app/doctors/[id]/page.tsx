import DoctorDetailesClient from '@/Components/DoctorDetailesClient';
import { Doctor, getDoctorByID, getAllDoctors } from "@/lib/data";

const DoctorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const doctor = await getDoctorByID(id);
  const allDoctors = await getAllDoctors();
  const relatedDoctors = allDoctors.filter(
    (d: Doctor) => d.specialty === doctor.specialty && d._id !== id
  );

  return (
    <DoctorDetailesClient doctor={doctor} relatedDoctors={relatedDoctors} />
  );
};

export default DoctorDetailsPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = await getDoctorByID(id);

  if (!doctor) return { title: "Doctor Not Found | Medicon" };

  return {
    title: `${doctor.name} — ${doctor.specialty} | Medicon`,
    description: `Book an appointment with ${doctor.name}, ${doctor.specialty} at ${doctor.hospital}.`,
  };
}