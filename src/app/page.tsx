import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { products } from "@/data/products";
import { getReviewsForProduct } from "@/data/reviews";
import { analyzeProduct } from "@/lib/nlp";
import StarRating from "@/components/StarRating";
import TrustBadge from "@/components/TrustBadge";
import {
  Radar,
  Search,
  BarChart3,
  ShieldCheck,
  Laptop,
  Smartphone,
  ChefHat,
  Trees,
  Headphones,
  ArrowRight,
  MessageSquare,
  Layers,
  ShieldAlert,
  Scale,
} from "lucide-react";

const ELECTRONICS_CATEGORIES = [
  { key: "laptops", label: "Laptops", icon: Laptop, count: 0 },
  { key: "phones", label: "Phones", icon: Smartphone, count: 0 },
  { key: "audio", label: "Audio", icon: Headphones, count: 0 },
];

const HOME_CATEGORIES = [
  { key: "kitchen", label: "Kitchen", icon: ChefHat, count: 0 },
  { key: "lawn-garden", label: "Lawn & Garden", icon: Trees, count: 0 },
];

export default function HomePage() {
  const electronicsCounts = ELECTRONICS_CATEGORIES.map((cat) => ({
    ...cat,
    count: products.filter((p) => p.category === cat.key).length,
  }));
  const homeCounts = HOME_CATEGORIES.map((cat) => ({
    ...cat,
    count: products.filter((p) => p.category === cat.key).length,
  }));

  const featured = products.slice(0, 4).map((product) => {
    const reviews = getReviewsForProduct(product.slug);
    const analysis = analyzeProduct(reviews, product.slug, product.name);
    return { product, analysis };
  });

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[var(--rr-primary)] via-[#1E3A5F] to-[#0F2439] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Radar className="w-10 h-10 text-[var(--rr-accent)]" />
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                  Review<span className="text-[var(--rr-accent)]">Radar</span>
                </h1>
              </div>
              <p className="text-xl sm:text-2xl text-white/80 mb-2 font-medium">
                Every review. Every platform. One trust score.
              </p>
              <p className="text-base text-white/60 mb-10 max-w-xl mx-auto">
                Amazon only shows you Amazon reviews. ReviewRadar pulls from
                five sources — Amazon, Reddit, YouTube, Best Buy, and Walmart —
                and cross-references them so you see what&apos;s real before you buy.
              </p>
              <SearchBar large />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-[var(--rr-surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-[var(--rr-text)] mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Search,
                  title: "Search",
                  desc: "Type in the product you're considering. We'll find it across the internet.",
                },
                {
                  icon: BarChart3,
                  title: "Scan",
                  desc: "We aggregate reviews from multiple platforms and analyze sentiment in seconds.",
                },
                {
                  icon: ShieldCheck,
                  title: "Decide",
                  desc: "Get a clear trust score, pros & cons, and source breakdown — then buy with confidence.",
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--rr-primary-light)]/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-[var(--rr-primary-light)]" />
                  </div>
                  <h3 className="font-semibold text-lg text-[var(--rr-text)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--rr-text-secondary)]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why ReviewRadar */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-[var(--rr-text)] mb-4">
              Why ReviewRadar Instead of Amazon?
            </h2>
            <p className="text-center text-sm text-[var(--rr-text-secondary)] max-w-2xl mx-auto mb-12">
              Amazon is a marketplace — it has a financial incentive to sell, not
              just inform. ReviewRadar is a research tool built to give you the
              unfiltered truth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-[var(--rr-surface)] rounded-xl border border-[var(--rr-border)] p-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--rr-primary-light)]/10 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-[var(--rr-primary-light)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--rr-text)] mb-2">
                  Cross-Platform Truth
                </h3>
                <p className="text-sm text-[var(--rr-text-secondary)] mb-4">
                  Amazon only shows its own reviews. We pull from five independent
                  sources — including Reddit threads and YouTube teardowns — so you
                  get perspectives Amazon will never surface.
                </p>
                <div className="text-xs text-[var(--rr-text-muted)] border-t border-[var(--rr-border-light)] pt-3">
                  <span className="font-medium text-[var(--rr-primary-light)]">Amazon:</span>{" "}
                  1 source &nbsp;→&nbsp;{" "}
                  <span className="font-medium text-[var(--rr-primary-light)]">ReviewRadar:</span>{" "}
                  5 sources
                </div>
              </div>

              <div className="bg-[var(--rr-surface)] rounded-xl border border-[var(--rr-border)] p-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--rr-primary-light)]/10 flex items-center justify-center mb-4">
                  <ShieldAlert className="w-6 h-6 text-[var(--rr-primary-light)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--rr-text)] mb-2">
                  Trust Score
                </h3>
                <p className="text-sm text-[var(--rr-text-secondary)] mb-4">
                  Our proprietary trust score measures source diversity, review
                  volume, cross-platform agreement, and recency. Amazon stars can
                  be inflated by incentivized reviews — our score cannot.
                </p>
                <div className="text-xs text-[var(--rr-text-muted)] border-t border-[var(--rr-border-light)] pt-3">
                  <span className="font-medium text-[var(--rr-primary-light)]">Amazon:</span>{" "}
                  star average &nbsp;→&nbsp;{" "}
                  <span className="font-medium text-[var(--rr-primary-light)]">ReviewRadar:</span>{" "}
                  multi-factor trust metric
                </div>
              </div>

              <div className="bg-[var(--rr-surface)] rounded-xl border border-[var(--rr-border)] p-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--rr-primary-light)]/10 flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-[var(--rr-primary-light)]" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--rr-text)] mb-2">
                  Unbiased Aggregation
                </h3>
                <p className="text-sm text-[var(--rr-text-secondary)] mb-4">
                  We have no products to sell and no affiliate stake. ReviewRadar
                  surfaces community voices from Reddit, YouTube creators, and
                  retail sites equally — so the data speaks for itself.
                </p>
                <div className="text-xs text-[var(--rr-text-muted)] border-t border-[var(--rr-border-light)] pt-3">
                  <span className="font-medium text-[var(--rr-primary-light)]">Amazon:</span>{" "}
                  marketplace seller &nbsp;→&nbsp;{" "}
                  <span className="font-medium text-[var(--rr-primary-light)]">ReviewRadar:</span>{" "}
                  neutral research tool
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-[var(--rr-surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[var(--rr-text)] mb-10">
              Browse by Category
            </h2>

            {/* Tier 1: High-Consideration Electronics */}
            <div className="mb-10">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[var(--rr-text)]">
                  High-Consideration Electronics
                </h3>
                <p className="text-sm text-[var(--rr-text-secondary)] mt-1">
                  Over 80% of electronics buyers read reviews on 3+ platforms
                  before purchasing — this is where multi-source aggregation
                  delivers the most value.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {electronicsCounts.map((cat) => (
                  <Link
                    key={cat.key}
                    href={`/search?category=${cat.key}`}
                    className="group bg-[var(--rr-bg)] rounded-xl border border-[var(--rr-border)] p-6 hover:border-[var(--rr-primary-light)] hover:shadow-md transition-all text-center"
                  >
                    <cat.icon className="w-10 h-10 mx-auto mb-3 text-[var(--rr-text-muted)] group-hover:text-[var(--rr-primary-light)] transition-colors" />
                    <h4 className="font-semibold text-[var(--rr-text)]">
                      {cat.label}
                    </h4>
                    <p className="text-sm text-[var(--rr-text-muted)] mt-1">
                      {cat.count} products
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tier 2: Trending Home */}
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[var(--rr-text)]">
                  Trending Home
                </h3>
                <p className="text-sm text-[var(--rr-text-secondary)] mt-1">
                  Kitchen and outdoor products have among the highest rates of
                  unreliable Amazon reviews — our trust score helps you filter
                  the noise.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                {homeCounts.map((cat) => (
                  <Link
                    key={cat.key}
                    href={`/search?category=${cat.key}`}
                    className="group bg-[var(--rr-bg)] rounded-xl border border-[var(--rr-border)] p-6 hover:border-[var(--rr-primary-light)] hover:shadow-md transition-all text-center"
                  >
                    <cat.icon className="w-10 h-10 mx-auto mb-3 text-[var(--rr-text-muted)] group-hover:text-[var(--rr-primary-light)] transition-colors" />
                    <h4 className="font-semibold text-[var(--rr-text)]">
                      {cat.label}
                    </h4>
                    <p className="text-sm text-[var(--rr-text-muted)] mt-1">
                      {cat.count} products
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-[var(--rr-surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[var(--rr-text)]">
                Trending Products
              </h2>
              <Link
                href="/search"
                className="text-sm font-medium text-[var(--rr-primary-light)] hover:text-[var(--rr-primary-hover)] flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map(({ product, analysis }) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group"
                >
                  <div className="bg-[var(--rr-bg)] rounded-xl border border-[var(--rr-border)] hover:border-[var(--rr-primary-light)] hover:shadow-lg transition-all overflow-hidden">
                    <div className="bg-[var(--rr-border-light)] h-40 relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[var(--rr-text-muted)] font-medium uppercase">
                        {product.brand}
                      </p>
                      <h3 className="font-semibold text-[var(--rr-text)] mt-1 group-hover:text-[var(--rr-primary-light)] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-3">
                        <StarRating
                          rating={analysis.aggregatedRating}
                          size="sm"
                        />
                        <TrustBadge
                          score={analysis.trustScore}
                          size="sm"
                          showLabel={false}
                        />
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-[var(--rr-text-muted)]">
                        <MessageSquare className="w-3 h-3" />
                        {analysis.totalReviews} reviews from{" "}
                        {analysis.platformRatings.length} sources
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  );
}
