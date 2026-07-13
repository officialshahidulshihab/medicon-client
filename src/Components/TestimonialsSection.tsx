import { getAllReview } from "@/lib/data";
import ReviewCard, { IReview } from "./ReviewCard";


const MarqueeTrack = ({
  reviews,
  direction = "left",
}: {
  reviews: IReview[];
  direction?: "left" | "right";
}) => {
  const doubled = [...reviews, ...reviews];

  return (
    <div
      className={`flex gap-5 w-max ${
        direction === "left" ? "marquee-left" : "marquee-right"
      }`}
    >
      {doubled.map((review, idx) => (
        <div key={`${review._id}-${idx}`} className="h-full">
          <ReviewCard review={review} />
        </div>
      ))}
    </div>
  );
};


const TestimonialsSection = async () => {
  const reviews: IReview[] = await getAllReview();

  const row1 = reviews;


  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#060d18" }}
    >
     
      <div className="text-center mb-14 px-4">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
          style={{ color: "#3b9eff" }}
        >
          Testimonials
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "#ffffff" }}
        >
          What Patients Are Saying
        </h2>
        <p className="text-base max-w-xl mx-auto" style={{ color: "#4e7a9f" }}>
          Real experiences from real patients across Bangladesh who found their
          doctors on MedConnect BD.
        </p>
      </div>

     
        <div className="overflow-hidden">
          <MarqueeTrack reviews={row1} direction="left" />
        </div>
       
      

  
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
        style={{
          background: "linear-gradient(to right, #060d18 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
        style={{
          background: "linear-gradient(to left, #060d18 0%, transparent 100%)",
        }}
      />
    </section>
  );
};

export default TestimonialsSection;