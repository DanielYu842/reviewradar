import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import TrustBadge from "@/components/TrustBadge";
import PlatformTag from "@/components/PlatformTag";
import ProConCard from "@/components/ProConCard";
import AggregatedRatingBar from "@/components/AggregatedRatingBar";
import { getProductBySlug, products } from "@/data/products";
import { getReviewsForProduct } from "@/data/reviews";
import { analyzeProduct, scoreSentiment } from "@/lib/nlp";
import { PLATFORM_INFO, CATEGORY_INFO, Platform } from "@/lib/types";
import {
  ExternalLink,
  ChevronLeft,
  Info,
  BarChart3,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

function SentimentIcon({ sentiment }: { sentiment: number }) {
  if (sentiment > 0.15)
    return <TrendingUp className="w-3.5 h-3.5 text-[var(--rr-success)]" />;
  if (sentiment < -0.15)
    return <TrendingDown className="w-3.5 h-3.5 text-[var(--rr-danger)]" />;
  return <Minus className="w-3.5 h-3.5 text-[var(--rr-text-muted)]" />;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const reviews = getReviewsForProduct(slug);
  const analysis = analyzeProduct(reviews, slug);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--rr-text-muted)] mb-6">
            <Link
              href="/"
              className="hover:text-[var(--rr-primary-light)] transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/search?category=${product.category}`}
              className="hover:text-[var(--rr-primary-light)] transition-colors"
            >
              {CATEGORY_INFO[product.category].label}
            </Link>
            <span>/</span>
            <span className="text-[var(--rr-text)]">{product.name}</span>
          </nav>

          {/* Product Header */}
          <div className="bg-[var(--rr-surface)] rounded-2xl border border-[var(--rr-border)] p-6 sm:p-8 mb-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <div className="bg-[var(--rr-border-light)] rounded-xl h-64 flex items-center justify-center">
                  <BarChart3 className="w-20 h-20 text-[var(--rr-text-muted)]" />
                </div>
              </div>

              <div className="lg:w-2/3 space-y-4">
                <div>
                  <p className="text-sm font-medium text-[var(--rr-text-muted)] uppercase tracking-wide">
                    {product.brand}
                  </p>
                  <h1 className="text-3xl font-bold text-[var(--rr-text)] mt-1">
                    {product.name}
                  </h1>
                  <p className="text-[var(--rr-text-secondary)] mt-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-extrabold text-[var(--rr-text)]">
                      {analysis.aggregatedRating.toFixed(1)}
                    </span>
                    <div>
                      <StarRating
                        rating={analysis.aggregatedRating}
                        size="md"
                        showValue={false}
                      />
                      <p className="text-xs text-[var(--rr-text-muted)] mt-0.5">
                        {analysis.totalReviews} reviews from{" "}
                        {analysis.platformRatings.length} sources
                      </p>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-[var(--rr-border)] hidden sm:block" />
                  <TrustBadge score={analysis.trustScore} size="lg" />
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <div>
                    <span className="text-sm text-[var(--rr-text-muted)]">
                      Price Range
                    </span>
                    <p className="font-semibold text-[var(--rr-text)]">
                      ${product.priceLow} – ${product.priceHigh}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-[var(--rr-text-muted)]">
                      Sentiment
                    </span>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-sm font-medium text-[var(--rr-success)]">
                        {analysis.sentimentBreakdown.positive}% positive
                      </span>
                      <span className="text-sm font-medium text-[var(--rr-text-muted)]">
                        {analysis.sentimentBreakdown.neutral}% neutral
                      </span>
                      <span className="text-sm font-medium text-[var(--rr-danger)]">
                        {analysis.sentimentBreakdown.negative}% negative
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.useCases.map((uc) => (
                    <Link
                      key={uc}
                      href={`/search?useCase=${uc}`}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--rr-border-light)] text-[var(--rr-text-secondary)] hover:bg-[var(--rr-primary-light)] hover:text-white transition-colors"
                    >
                      {uc}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: Pros/Cons + Rating Breakdown */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pros and Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProConCard type="pro" items={analysis.pros} />
                <ProConCard type="con" items={analysis.cons} />
              </div>

              {/* Rating Breakdown */}
              <div className="bg-[var(--rr-surface)] rounded-xl border border-[var(--rr-border)] p-6">
                <AggregatedRatingBar
                  platformRatings={analysis.platformRatings}
                />
              </div>

              {/* Reviews */}
              <div className="bg-[var(--rr-surface)] rounded-xl border border-[var(--rr-border)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[var(--rr-text)] flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[var(--rr-primary-light)]" />
                    Reviews ({reviews.length})
                  </h3>
                </div>

                <div className="space-y-4">
                  {reviews.slice(0, 15).map((review) => {
                    const sentiment = scoreSentiment(review.text);
                    return (
                      <div
                        key={review.id}
                        className="border border-[var(--rr-border-light)] rounded-lg p-4 hover:border-[var(--rr-border)] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <PlatformTag
                              platform={review.platform}
                              size="sm"
                            />
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
                              <StarRating
                                rating={review.rating}
                                size="sm"
                                showValue={false}
                              />
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
                          {review.helpful !== undefined &&
                            review.helpful > 0 && (
                              <span>
                                {review.helpful} found this helpful
                              </span>
                            )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {reviews.length > 15 && (
                  <p className="text-center text-sm text-[var(--rr-text-muted)] mt-4">
                    Showing 15 of {reviews.length} reviews
                  </p>
                )}
              </div>
            </div>

            {/* Right column: Source Links + Specs */}
            <div className="space-y-6">
              {/* Trust Score Explainer */}
              <div className="bg-[var(--rr-surface)] rounded-xl border border-[var(--rr-border)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-5 h-5 text-[var(--rr-primary-light)]" />
                  <h3 className="font-semibold text-[var(--rr-text)]">
                    Trust Score Breakdown
                  </h3>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <TrustBadge score={analysis.trustScore} size="lg" />
                </div>
                <p className="text-xs text-[var(--rr-text-secondary)] leading-relaxed mb-3">
                  The trust score is calculated based on four factors:
                </p>
                <ul className="space-y-2 text-xs text-[var(--rr-text-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--rr-primary-light)] mt-1.5 shrink-0" />
                    <span>
                      <strong>Source diversity</strong> — reviews from{" "}
                      {analysis.platformRatings.length} different platforms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--rr-primary-light)] mt-1.5 shrink-0" />
                    <span>
                      <strong>Review volume</strong> — {analysis.totalReviews}{" "}
                      total reviews analyzed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--rr-primary-light)] mt-1.5 shrink-0" />
                    <span>
                      <strong>Cross-platform agreement</strong> — how
                      consistently platforms rate this product
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--rr-primary-light)] mt-1.5 shrink-0" />
                    <span>
                      <strong>Recency</strong> — more recent reviews carry more
                      weight
                    </span>
                  </li>
                </ul>
              </div>

              {/* Source Links */}
              <div className="bg-[var(--rr-surface)] rounded-xl border border-[var(--rr-border)] p-5">
                <h3 className="font-semibold text-[var(--rr-text)] mb-3 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-[var(--rr-primary-light)]" />
                  Review Sources
                </h3>
                <div className="space-y-2.5">
                  {analysis.platformRatings.map((pr) => {
                    const info = PLATFORM_INFO[pr.platform];
                    return (
                      <a
                        key={pr.platform}
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg border border-[var(--rr-border-light)] hover:border-[var(--rr-border)] hover:bg-[var(--rr-border-light)] transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: info.color }}
                          />
                          <span className="text-sm font-medium text-[var(--rr-text)]">
                            {info.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[var(--rr-text)]">
                            {pr.averageRating?.toFixed(1)}/5
                          </span>
                          <span className="text-xs text-[var(--rr-text-muted)]">
                            ({pr.reviewCount})
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-[var(--rr-text-muted)] group-hover:text-[var(--rr-primary-light)] transition-colors" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Specs */}
              <div className="bg-[var(--rr-surface)] rounded-xl border border-[var(--rr-border)] p-5">
                <h3 className="font-semibold text-[var(--rr-text)] mb-3">
                  Specifications
                </h3>
                <dl className="space-y-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between gap-4 py-1.5 border-b border-[var(--rr-border-light)] last:border-0"
                    >
                      <dt className="text-sm text-[var(--rr-text-muted)] shrink-0">
                        {key}
                      </dt>
                      <dd className="text-sm text-[var(--rr-text)] text-right font-medium">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8">
            <Link
              href={`/search?category=${product.category}`}
              className="inline-flex items-center gap-1 text-sm text-[var(--rr-primary-light)] hover:text-[var(--rr-primary-hover)] font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to {CATEGORY_INFO[product.category].label}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
