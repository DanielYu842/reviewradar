"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  large?: boolean;
  defaultValue?: string;
  placeholder?: string;
}

export default function SearchBar({
  large = false,
  defaultValue = "",
  placeholder = "Search for a product (e.g. \"laptop for school\", \"blender\", \"iPhone 16\")...",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/search");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-[var(--rr-text-muted)] ${
            large ? "w-6 h-6" : "w-5 h-5"
          }`}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-[var(--rr-surface)] border-2 border-[var(--rr-border)] rounded-xl text-[var(--rr-text)] placeholder-[var(--rr-text-muted)] focus:border-[var(--rr-primary-light)] focus:outline-none transition-colors shadow-sm ${
            large ? "pl-14 pr-32 py-4 text-lg" : "pl-12 pr-24 py-3 text-base"
          }`}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--rr-primary-light)] hover:bg-[var(--rr-primary-hover)] text-white font-semibold rounded-lg transition-colors ${
            large ? "px-6 py-2.5 text-base" : "px-4 py-2 text-sm"
          }`}
        >
          Search
        </button>
      </div>
    </form>
  );
}
