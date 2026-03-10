import Link from "next/link";
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
  ArrowRight,
  MessageSquare,
} from "lucide-react";

const CATEGORIES = [
  { key: "laptops", label: "Laptops", icon: Laptop, count: 0 },
  { key: "phones", label: "Phones", icon: Smartphone, count: 0 },
  { key: "kitchen", label: "Kitchen", icon: ChefHat, count: 0 },
  { key: "lawn-garden", label: "Lawn & Garden", icon: Trees, count: 0 },
];

export default function HomePage() {
  const categoryCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: products.filter((p) => p.category === cat.key).length,
  }));

  const featured = products.slice(0, 4).map((product) => {
    const reviews = getReviewsForProduct(product.slug);
    const analysis = analyzeProduct(reviews, product.slug);
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
                The full picture, in one place.
              </p>
              <p className="text-base text-white/60 mb-10 max-w-xl mx-auto">
                Stop opening 10 tabs to research a product. We aggregate reviews
                from Amazon, Reddit, YouTube, and more — so you can decide with
                confidence.
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

        {/* Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[var(--rr-text)] mb-8">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoryCounts.map((cat) => (
                <Link
                  key={cat.key}
                  href={`/search?category=${cat.key}`}
                  className="group bg-[var(--rr-surface)] rounded-xl border border-[var(--rr-border)] p-6 hover:border-[var(--rr-primary-light)] hover:shadow-md transition-all text-center"
                >
                  <cat.icon className="w-10 h-10 mx-auto mb-3 text-[var(--rr-text-muted)] group-hover:text-[var(--rr-primary-light)] transition-colors" />
                  <h3 className="font-semibold text-[var(--rr-text)]">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-[var(--rr-text-muted)] mt-1">
                    {cat.count} products
                  </p>
                </Link>
              ))}
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
                    <div className="bg-[var(--rr-border-light)] h-40 flex items-center justify-center">
                      <Radar className="w-12 h-12 text-[var(--rr-text-muted)] group-hover:text-[var(--rr-primary-light)] transition-colors" />
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

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-[var(--rr-text)] mb-4">
              Tired of drowning in reviews?
            </h2>
            <p className="text-[var(--rr-text-secondary)] mb-8 max-w-xl mx-auto">
              Whether you&apos;re buying a laptop for school, a phone for your kid, or
              a blender that won&apos;t break in six months — ReviewRadar gives you
              the full picture without the headache.
            </p>
            <SearchBar />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
