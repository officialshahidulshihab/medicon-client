export const getFeaturedDoctor = async () => {
  const res = await fetch("http://localhost:5000/doctors");
  const data = await res.json();
  return data;
};


export const getAllReview=async()=>{
  const res=await fetch("http://localhost:5000/review")
  const data=await res.json()
  return data;

}


export const getAllDoctors=async () => {
  const res = await fetch("http://localhost:5000/all-doctors");
  const data = await res.json();
  return data;
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
 