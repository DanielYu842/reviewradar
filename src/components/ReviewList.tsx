"use client";

import { useState, useMemo } from "react";
import { Review, Platform, PLATFORM_INFO } from "@/lib/types";
import { scoreSentiment } from "@/lib/nlp";
import PlatformTag from "./PlatformTag";
import StarRating from "./StarRating";
import { MessageSquare, TrendingUp, TrendingDown, Minus, ArrowUpDown, Filter } from "lucide-react";

type SortOption = "newest" | "oldest" | "positive" | "negative";

function SentimentIcon({ sentiment }: { sentiment: number }) {
  if (sentiment > 0.15)
    return <TrendingUp className="w-3.5 h-3.5 text-[var(--rr-success)]" />;
  if (sentiment < -0.15)
    return <TrendingDown className="w-3.5 h-3.5 text-[var(--rr-danger)]" />;
  return <Minus className="w-3.5 h-3.5 text-[var(--rr-text-muted)]" />;
}

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showAll, setShowAll] = useState(false);

  const platforms = useMemo(() => {
    const counts = new Map<Platform, number>();
    for (const r of reviews) {
      counts.set(r.platform, (counts.get(r.platform) || 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [reviews]);

  const filtered = useMemo(() => {
    let result = [...reviews];

    if (platformFilter !== "all") {
      result = result.filter((r) => r.platform === platformFilter);
    }

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "positive":
        result.sort((a, b) => scoreSentiment(b.text) - scoreSentiment(a.text));
        break;
      case "negative":
        result.sort((a, b) => scoreSentiment(a.text) - scoreSentiment(b.text));
        break;
    }

    return result;
  }, [reviews, platformFilter, sortBy]);

  const displayed = showAll ? filtered : filtered.slice(0, 15);

  return (
    <div className="bg-[var(--rr-surface)] rounded-xl border border-[var(--rr-border)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--rr-text)] flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[var(--rr-primary-light)]" />
          Reviews ({filtered.length}{platformFilter !== "all" ? ` of ${reviews.length}` : ""})
        </h3>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Platform filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-[var(--rr-text-muted)] shrink-0" />
          <button
            onClick={() => setPlatformFilter("all")}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              platformFilter === "all"
                ? "bg-[var(--rr-primary-light)] text-white"
                : "bg-[var(--rr-border-light)] text-[var(--rr-text-secondary)] hover:bg-[var(--rr-border)]"
            }`}
          >
            All
          </button>
          {platforms.map(([platform, count]) => (
            <button
              key={platform}
              onClick={() => setPlatformFilter(platformFilter === platform ? "all" : platform)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                platformFilter === platform
                  ? "text-white"
                  : "text-[var(--rr-text-secondary)] hover:opacity-80"
              }`}
              style={{
                backgroundColor:
                  platformFilter === platform
                    ? PLATFORM_INFO[platform].color
                    : PLATFORM_INFO[platform].bgColor,
                color:
                  platformFilter === platform
                    ? "white"
                    : PLATFORM_INFO[platform].color,
              }}
            >
              {PLATFORM_INFO[platform].label} ({count})
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 sm:ml-auto shrink-0">
          <ArrowUpDown className="w-4 h-4 text-[var(--rr-text-muted)]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs bg-[var(--rr-border-light)] border border-[var(--rr-border)] rounded-lg px-2.5 py-1.5 text-[var(--rr-text)] font-medium cursor-pointer focus:outline-none focus:border-[var(--rr-primary-light)]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="positive">Most Positive</option>
            <option value="negative">Most Negative</option>
          </select>
        </div>
      </div>

      {/* Review items */}
      {displayed.length === 0 ? (
        <p className="text-sm text-[var(--rr-text-muted)] text-center py-8">
          No reviews match the current filter.
        </p>
      ) : (
        <div className="space-y-4">
          {displayed.map((review) => {
            const sentiment = scoreSentiment(review.text);
            return (
              <div
                key={review.id}
                className="border border-[var(--rr-border-light)] rounded-lg p-4 hover:border-[var(--rr-border)] transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <PlatformTag platform={review.platform} size="sm" />
                    <span className="text-sm font-medium text-[var(--rr-text)]">
                      {review.author}
                    </span>
                    {review.verified && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--rr-success-light)] text-[var(--rr-success)] font-medium">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <SentimentIcon sentiment={sentiment} />
                    {review.rating !== null && (
                      <StarRating rating={review.rating} size="sm" showValue={false} />
                    )}
                  </div>
                </div>

                {review.title && (
                  <h4 className="font-medium text-sm text-[var(--rr-text)] mb-1">
                    {review.title}
                  </h4>
                )}
                <p className="text-sm text-[var(--rr-text-secondary)] leading-relaxed">
                  {review.text}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-[var(--rr-text-muted)]">
                  <span>
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {review.helpful !== undefined && review.helpful > 0 && (
                    <span>{review.helpful} found this helpful</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!showAll && filtered.length > 15 && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full mt-4 py-2.5 text-sm font-medium text-[var(--rr-primary-light)] hover:text-[var(--rr-primary-hover)] border border-[var(--rr-border)] rounded-lg hover:bg-[var(--rr-border-light)] transition-colors"
        >
          Show all {filtered.length} reviews
        </button>
      )}

      {showAll && filtered.length > 15 && (
        <button
          onClick={() => setShowAll(false)}
          className="w-full mt-4 py-2.5 text-sm font-medium text-[var(--rr-text-muted)] hover:text-[var(--rr-text-secondary)] border border-[var(--rr-border)] rounded-lg hover:bg-[var(--rr-border-light)] transition-colors"
        >
          Show fewer reviews
        </button>
      )}
    </div>
  );
}
