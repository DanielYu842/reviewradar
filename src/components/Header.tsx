"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Radar, Search, Menu, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  }

  return (
    <header className="bg-[var(--rr-primary)] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Radar className="w-7 h-7 text-[var(--rr-accent)]" />
            <span className="text-xl font-bold tracking-tight">
              Review<span className="text-[var(--rr-accent)]">Radar</span>
            </span>
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center flex-1 max-w-xl mx-8"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--rr-text-muted)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 backdrop-blur text-white placeholder-white/50 border border-white/20 focus:bg-white/20 focus:outline-none focus:border-[var(--rr-accent)] transition-all text-sm"
              />
            </div>
          </form>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/search?category=laptops"
              className="hover:text-[var(--rr-accent)] transition-colors"
            >
              Laptops
            </Link>
            <Link
              href="/search?category=phones"
              className="hover:text-[var(--rr-accent)] transition-colors"
            >
              Phones
            </Link>
            <Link
              href="/search?category=kitchen"
              className="hover:text-[var(--rr-accent)] transition-colors"
            >
              Kitchen
            </Link>
            <Link
              href="/search?category=lawn-garden"
              className="hover:text-[var(--rr-accent)] transition-colors"
            >
              Garden
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-white/10 px-4 py-4 space-y-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 text-sm"
              />
            </div>
          </form>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/search?category=laptops" className="py-2 hover:text-[var(--rr-accent)]" onClick={() => setMobileMenuOpen(false)}>Laptops</Link>
            <Link href="/search?category=phones" className="py-2 hover:text-[var(--rr-accent)]" onClick={() => setMobileMenuOpen(false)}>Phones</Link>
            <Link href="/search?category=kitchen" className="py-2 hover:text-[var(--rr-accent)]" onClick={() => setMobileMenuOpen(false)}>Kitchen</Link>
            <Link href="/search?category=lawn-garden" className="py-2 hover:text-[var(--rr-accent)]" onClick={() => setMobileMenuOpen(false)}>Garden</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
