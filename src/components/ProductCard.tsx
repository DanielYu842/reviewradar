import Link from "next/link";
import Image from "next/image";
import { Product, AnalysisResult, CATEGORY_INFO } from "@/lib/types";
import StarRating from "./StarRating";
import TrustBadge from "./TrustBadge";
import { MessageSquare } from "lucide-react";

interface ProductCardProps {
  product: Product;
  analysis: AnalysisResult;
}

export default function ProductCard({ product, analysis }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="bg-[var(--rr-surface)] rounded-xl border border-[var(--rr-border)] hover:border-[var(--rr-primary-light)] hover:shadow-lg transition-all duration-200 overflow-hidden h-full flex flex-col">
        <div className="bg-[var(--rr-border-light)] h-48 relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 z-10">
            <TrustBadge score={analysis.trustScore} size="sm" showLabel={false} />
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs font-medium text-[var(--rr-text-muted)] uppercase tracking-wide mb-1">
            {product.brand}
          </p>
          <h3 className="font-semibold text-[var(--rr-text)] group-hover:text-[var(--rr-primary-light)] transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>

          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between">
              <StarRating rating={analysis.aggregatedRating} size="sm" />
              <div className="flex items-center gap-1 text-xs text-[var(--rr-text-muted)]">
                <MessageSquare className="w-3.5 h-3.5" />
                {analysis.totalReviews} reviews
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--rr-text)]">
                ${product.priceLow}
                {product.priceHigh !== product.priceLow && (
                  <span className="text-[var(--rr-text-muted)] font-normal">
                    {" "}– ${product.priceHigh}
                  </span>
                )}
              </span>
              <span className="text-xs text-[var(--rr-text-muted)]">
                {CATEGORY_INFO[product.category].label}
              </span>
            </div>

            <div className="flex flex-wrap gap-1">
              {analysis.platformRatings.slice(0, 3).map((pr) => (
                <span
                  key={pr.platform}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--rr-border-light)] text-[var(--rr-text-muted)]"
                >
                  {pr.platform.charAt(0).toUpperCase() + pr.platform.slice(1)}{" "}
                  {pr.averageRating?.toFixed(1)}
                </span>
              ))}
              {analysis.platformRatings.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--rr-border-light)] text-[var(--rr-text-muted)]">
                  +{analysis.platformRatings.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
