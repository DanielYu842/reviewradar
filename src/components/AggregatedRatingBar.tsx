import { PlatformRating, PLATFORM_INFO } from "@/lib/types";

interface AggregatedRatingBarProps {
  platformRatings: PlatformRating[];
}

export default function AggregatedRatingBar({
  platformRatings,
}: AggregatedRatingBarProps) {
  const totalReviews = platformRatings.reduce((sum, pr) => sum + pr.reviewCount, 0);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-[var(--rr-text-secondary)] uppercase tracking-wide">
        Rating by Source
      </h4>
      <div className="space-y-2.5">
        {platformRatings.map((pr) => {
          const info = PLATFORM_INFO[pr.platform];
          const barWidth =
            pr.averageRating !== null ? (pr.averageRating / 5) * 100 : 50;

          return (
            <div key={pr.platform} className="flex items-center gap-3">
              <div className="w-20 shrink-0">
                <span
                  className="text-sm font-medium"
                  style={{ color: info.color }}
                >
                  {info.label}
                </span>
              </div>
              <div className="flex-1 h-3 bg-[var(--rr-border-light)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: info.color,
                  }}
                />
              </div>
              <div className="w-20 shrink-0 text-right">
                <span className="text-sm font-bold text-[var(--rr-text)]">
                  {pr.averageRating !== null
                    ? `${pr.averageRating.toFixed(1)}/5`
                    : "N/A"}
                </span>
                <span className="text-xs text-[var(--rr-text-muted)] ml-1">
                  ({pr.reviewCount})
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex h-3 rounded-full overflow-hidden border border-[var(--rr-border)]">
        {platformRatings.map((pr) => {
          const width = (pr.reviewCount / totalReviews) * 100;
          const info = PLATFORM_INFO[pr.platform];
          return (
            <div
              key={pr.platform}
              className="h-full transition-all"
              style={{ width: `${width}%`, backgroundColor: info.color }}
              title={`${info.label}: ${pr.reviewCount} reviews (${Math.round(width)}%)`}
            />
          );
        })}
      </div>
      <p className="text-xs text-[var(--rr-text-muted)]">
        Review distribution across {platformRatings.length} platforms ({totalReviews} total)
      </p>
    </div>
  );
}
