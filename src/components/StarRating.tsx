import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = true,
}: StarRatingProps) {
  const sizeMap = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-6 h-6" };
  const textMap = { sm: "text-xs", md: "text-sm", lg: "text-lg" };
  const iconSize = sizeMap[size];
  const textSize = textMap[size];

  const fullStars = Math.floor(rating);
  const partialFill = rating - fullStars;
  const emptyStars = maxRating - fullStars - (partialFill > 0 ? 1 : 0);

  return (
    <div className="inline-flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`${iconSize} fill-[var(--rr-accent)] text-[var(--rr-accent)]`}
        />
      ))}
      {partialFill > 0 && (
        <div className={`relative ${iconSize}`}>
          <Star className={`${iconSize} text-[var(--rr-border)]`} />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${partialFill * 100}%` }}
          >
            <Star
              className={`${iconSize} fill-[var(--rr-accent)] text-[var(--rr-accent)]`}
            />
          </div>
        </div>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={`${iconSize} text-[var(--rr-border)]`}
        />
      ))}
      {showValue && (
        <span className={`ml-1 font-semibold ${textSize} text-[var(--rr-text)]`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
