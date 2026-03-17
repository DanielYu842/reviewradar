"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { getReviewsForProduct } from "@/data/reviews";
import { analyzeProduct } from "@/lib/nlp";
import { Product, AnalysisResult } from "@/lib/types";
import { Search, ArrowUpDown } from "lucide-react";

type SortOption = "rating" | "trust" | "reviews" | "price-low" | "price-high";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const budget = searchParams.get("budget") || "";
  const useCase = searchParams.get("useCase") || "";
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  const results = useMemo(() => {
    let filtered = [...products];

    if (query) {
      const stopWords = new Set(["a", "an", "the", "for", "and", "or", "of", "to", "in", "on", "is", "it", "my", "i"]);
      const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 0 && !stopWords.has(w));
      if (words.length > 0) {
        filtered = filtered.filter((p) => {
          const searchable = [
            p.name.toLowerCase(),
            p.brand.toLowerCase(),
            p.description.toLowerCase(),
            p.category.replace("-", " "),
            ...p.useCases.map((uc) => uc.replace("-", " ")),
          ].join(" ");
          return words.every((word) => searchable.includes(word));
        });
      }
    }

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (budget) {
      const [min, max] = budget.split("-").map(Number);
      filtered = filtered.filter(
        (p) => p.priceLow <= max && p.priceHigh >= min
      );
    }

    if (useCase) {
      filtered = filtered.filter((p) =>
        p.useCases.some((uc) => uc.includes(useCase))
      );
    }

    const withAnalysis: { product: Product; analysis: AnalysisResult }[] =
      filtered.map((product) => {
        const reviews = getReviewsForProduct(product.slug);
        const analysis = analyzeProduct(reviews, product.slug, product.name);
        return { product, analysis };
      });

    switch (sortBy) {
      case "rating":
        withAnalysis.sort(
          (a, b) => b.analysis.aggregatedRating - a.analysis.aggregatedRating
        );
        break;
      case "trust":
        withAnalysis.sort(
          (a, b) => b.analysis.trustScore - a.analysis.trustScore
        );
        break;
      case "reviews":
        withAnalysis.sort(
          (a, b) => b.analysis.totalReviews - a.analysis.totalReviews
        );
        break;
      case "price-low":
        withAnalysis.sort((a, b) => a.product.priceLow - b.product.priceLow);
        break;
      case "price-high":
        withAnalysis.sort((a, b) => b.product.priceHigh - a.product.priceHigh);
        break;
    }

    return withAnalysis;
  }, [query, category, budget, useCase, sortBy]);

  const activeFilterCount = [category, budget, useCase].filter(Boolean).length;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[var(--rr-text)]">
              {query ? (
                <>
                  Results for &ldquo;{query}&rdquo;
                </>
              ) : category ? (
                <>
                  {category.charAt(0).toUpperCase() +
                    category.slice(1).replace("-", " & ")}
                </>
              ) : (
                "All Products"
              )}
            </h1>
            <p className="text-sm text-[var(--rr-text-muted)] mt-1">
              {results.length} product{results.length !== 1 ? "s" : ""} found
              {activeFilterCount > 0 &&
                ` with ${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} applied`}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4 bg-[var(--rr-surface)] rounded-lg border border-[var(--rr-border)] px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-[var(--rr-text-secondary)]">
                  <ArrowUpDown className="w-4 h-4" />
                  Sort by
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-sm bg-transparent border-none text-[var(--rr-text)] font-medium cursor-pointer focus:outline-none"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="trust">Trust Score</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {results.length === 0 ? (
                <div className="text-center py-16">
                  <Search className="w-12 h-12 text-[var(--rr-text-muted)] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[var(--rr-text)] mb-2">
                    No products found
                  </h3>
                  <p className="text-sm text-[var(--rr-text-muted)]">
                    Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {results.map(({ product, analysis }) => (
                    <ProductCard
                      key={product.slug}
                      product={product}
                      analysis={analysis}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--rr-primary-light)] border-t-transparent rounded-full" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
