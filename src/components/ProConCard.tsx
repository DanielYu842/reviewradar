import { ThumbsUp, ThumbsDown } from "lucide-react";
import { ProConItem } from "@/lib/types";

interface ProConCardProps {
  type: "pro" | "con";
  items: ProConItem[];
}

export default function ProConCard({ type, items }: ProConCardProps) {
  const isPro = type === "pro";

  if (items.length === 0) return null;

  return (
    <div
      className={`rounded-xl border-2 p-5 ${
        isPro
          ? "border-[var(--rr-success)]/30 bg-[var(--rr-success-light)]/50"
          : "border-[var(--rr-danger)]/30 bg-[var(--rr-danger-light)]/50"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        {isPro ? (
          <ThumbsUp className="w-5 h-5 text-[var(--rr-success)]" />
        ) : (
          <ThumbsDown className="w-5 h-5 text-[var(--rr-danger)]" />
        )}
        <h3
          className={`font-semibold text-lg ${
            isPro ? "text-[var(--rr-success)]" : "text-[var(--rr-danger)]"
          }`}
        >
          {isPro ? "What People Love" : "Common Complaints"}
        </h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                isPro ? "bg-[var(--rr-success)]" : "bg-[var(--rr-danger)]"
              }`}
            />
            <span className="text-sm text-[var(--rr-text)]">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
