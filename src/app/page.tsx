import Banner from "@/Components/Banner";
import FeaturedSection from "@/Components/FeaturedSection";
import NewsShelter from "@/Components/NewsShelter";
import SimpleSteps from "@/Components/SimpleSteps";
import Specialities from "@/Components/Specialities";
import StatSection from "@/Components/StatSection";
import TestimonialsSection from "@/Components/TestimonialsSection";


export default function Home() {
  return (
    <>
    <Banner></Banner>
    <Specialities></Specialities>
    <FeaturedSection></FeaturedSection>
    <SimpleSteps></SimpleSteps>
    <StatSection></StatSection>
    <TestimonialsSection></TestimonialsSection>
    <NewsShelter></NewsShelter>
    </>
  );
}
