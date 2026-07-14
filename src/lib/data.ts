import { authClient } from "./auth-client";

export const getFeaturedDoctor = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`,{
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export const getDoctorByID = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-doctors/${id}`,{
    cache: "no-store",
  });
  const data = await res.json();
  return {
    ...data,
    about: data.about ?? "",
    qualifications: data.qualifications ?? [],
    reviews: data.reviews ?? [],
    isVerified: data.isVerified ?? false,
  };
};

export const getAllReview = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`,{
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export const getTimeSlot = async (doctorId: string, selectedDate: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/slots/${doctorId}/${selectedDate}`,{cache:"no-store"}
  );
  const data = await res.json();
  return data;
};

export const getAllDoctors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-doctors`,{cache:"no-store"});
  const data = await res.json();
  return data;
};

export const getUserData = async () => {
  const { data: session } = await authClient.getSession();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/user/${session?.user.id}`,{cache:"no-store"}
  );
  const data = await res.json();
  return data
};

export type Doctor = {
  _id: string;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  experience: number;
  consultationFee: number;
  photo: string;
  rating: number;
  totalReviews: number;
  isAvailable: boolean;
};
