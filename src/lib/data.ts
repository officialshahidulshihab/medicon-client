export const getFeaturedDoctor = async () => {
  const res = await fetch("http://localhost:5000/doctors");
  const data = await res.json();
  return data;
};
