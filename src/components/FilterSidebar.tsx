"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { CATEGORY_INFO, Category } from "@/lib/types";
import { SlidersHorizontal } from "lucide-react";

const BUDGET_TIERS = [
  { label: "Under $50", value: "0-50" },
  { label: "$50 – $200", value: "50-200" },
  { label: "$200 – $500", value: "200-500" },
  { label: "$500 – $1,000", value: "500-1000" },
  { label: "$1,000+", value: "1000-9999" },
];

const USE_CASES = [
  "everyday",
  "school",
  "work",
  "budget",
  "creative",
  "photography",
  "cooking",
  "gardening",
  "gaming",
];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentBudget = searchParams.get("budget") || "";
  const currentUseCase = searchParams.get("useCase") || "";

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-[var(--rr-surface)] rounded-xl border border-[var(--rr-border)] p-5 sticky top-20 space-y-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[var(--rr-primary-light)]" />
          <h2 className="font-semibold text-[var(--rr-text)]">Filters</h2>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--rr-text-secondary)] mb-2">
            Category
          </h3>
          <div className="space-y-1.5">
            <button
              onClick={() => updateFilter("category", "")}
              className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                !currentCategory
                  ? "bg-[var(--rr-primary-light)] text-white font-medium"
                  : "text-[var(--rr-text-secondary)] hover:bg-[var(--rr-border-light)]"
              }`}
            >
              All Categories
            </button>
            {(Object.entries(CATEGORY_INFO) as [Category, (typeof CATEGORY_INFO)[Category]][]).map(
              ([key, info]) => (
                <button
                  key={key}
                  onClick={() => updateFilter("category", key)}
                  className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    currentCategory === key
                      ? "bg-[var(--rr-primary-light)] text-white font-medium"
                      : "text-[var(--rr-text-secondary)] hover:bg-[var(--rr-border-light)]"
                  }`}
                >
                  {info.label}
                </button>
              )
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--rr-text-secondary)] mb-2">
            Budget
          </h3>
          <div className="space-y-1.5">
            <button
              onClick={() => updateFilter("budget", "")}
              className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                !currentBudget
                  ? "bg-[var(--rr-primary-light)] text-white font-medium"
                  : "text-[var(--rr-text-secondary)] hover:bg-[var(--rr-border-light)]"
              }`}
            >
              Any Price
            </button>
            {BUDGET_TIERS.map((tier) => (
              <button
                key={tier.value}
                onClick={() => updateFilter("budget", tier.value)}
                className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  currentBudget === tier.value
                    ? "bg-[var(--rr-primary-light)] text-white font-medium"
                    : "text-[var(--rr-text-secondary)] hover:bg-[var(--rr-border-light)]"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--rr-text-secondary)] mb-2">
            Use Case
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {USE_CASES.map((uc) => (
              <button
                key={uc}
                onClick={() =>
                  updateFilter("useCase", currentUseCase === uc ? "" : uc)
                }
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  currentUseCase === uc
                    ? "bg-[var(--rr-primary-light)] text-white"
                    : "bg-[var(--rr-border-light)] text-[var(--rr-text-secondary)] hover:bg-[var(--rr-border)]"
                }`}
              >
                {uc}
              </button>
            ))}
          </div>
        </div>

        {(currentCategory || currentBudget || currentUseCase) && (
          <button
            onClick={() => {
              const params = new URLSearchParams();
              const q = searchParams.get("q");
              if (q) params.set("q", q);
              router.push(`/search?${params.toString()}`);
            }}
            className="w-full text-sm text-[var(--rr-danger)] hover:text-[var(--rr-danger)]/80 font-medium py-2 border border-[var(--rr-danger)]/20 rounded-lg hover:bg-[var(--rr-danger-light)]/50 transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </aside>
  );
}
