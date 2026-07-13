import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { MdVerified } from "react-icons/md";


export interface IReview {
  _id?: string;
  reviewText: string;
  reviewerName: string;
  reviewerLocation: string;
  reviewerAvatar: string;
  rating: number;       // 1 – 5
  doctorSeen: string;
  specialty: string;
  isVerified: boolean;
  createdAt?: string;
}


const StarRow = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <AiFillStar
        key={i}
        size={16}
        style={{ color: i < rating ? "#f59e0b" : "#1e3a5f" }}
      />
    ))}
  </div>
);


interface ReviewCardProps {
  review: IReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div
      className="flex flex-col justify-between rounded-2xl p-6 h-full select-none"
      style={{
        backgroundColor: "#0d1b2e",
        border: "1px solid #1a3050",
        minWidth: "320px",
        maxWidth: "360px",
        boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
      }}
    >
     
      <div>
        <FaRegCommentDots
          size={28}
          className="mb-4"
          style={{ color: "#2a4a6e" }}
        />
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "#8baabf" }}
        >
          &ldquo;{review.reviewText}&rdquo;
        </p>
      </div>

     
      <div>
       
        <div className="flex items-center justify-between mb-3">
         
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
              style={{ border: "2px solid #1a3a5f" }}
            >
              <Image
                src={review.reviewerAvatar}
                alt={review.reviewerName}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <p
                className="text-sm font-semibold leading-tight"
                style={{ color: "#ffffff" }}
              >
                {review.reviewerName}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#4e7a9f" }}>
                {review.reviewerLocation}
              </p>
            </div>
          </div>

         
          <StarRow rating={review.rating} />
        </div>

       
        <div
          className="w-full h-px mb-3"
          style={{ backgroundColor: "#132035" }}
        />

        
        {review.isVerified && (
          <div className="flex items-center gap-1.5">
            <MdVerified size={15} style={{ color: "#3b9eff" }} />
            <span
              className="text-xs font-medium"
              style={{ color: "#3b9eff" }}
            >
              Saw {review.doctorSeen}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;