import { Radar } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--rr-primary)] text-white/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Radar className="w-5 h-5 text-[var(--rr-accent)]" />
            <span className="font-bold text-white">
              Review<span className="text-[var(--rr-accent)]">Radar</span>
            </span>
          </div>
          <p className="text-sm text-center">
            The full picture, in one place. Aggregated reviews from across the
            internet.
          </p>
          <p className="text-xs text-white/40">
            Prototype &mdash; BET350 Project
          </p>
        </div>
      </div>
    </footer>
  );
}
