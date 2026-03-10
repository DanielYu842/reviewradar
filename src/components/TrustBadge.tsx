import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";

interface TrustBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function TrustBadge({
  score,
  size = "md",
  showLabel = true,
}: TrustBadgeProps) {
  const getColor = () => {
    if (score >= 70) return { bg: "bg-[var(--rr-success-light)]", text: "text-[var(--rr-success)]", border: "border-[var(--rr-success)]" };
    if (score >= 40) return { bg: "bg-[var(--rr-warning-light)]", text: "text-[var(--rr-warning)]", border: "border-[var(--rr-warning)]" };
    return { bg: "bg-[var(--rr-danger-light)]", text: "text-[var(--rr-danger)]", border: "border-[var(--rr-danger)]" };
  };

  const getLabel = () => {
    if (score >= 70) return "High Trust";
    if (score >= 40) return "Moderate Trust";
    return "Low Trust";
  };

  const IconComponent = score >= 70 ? ShieldCheck : score >= 40 ? Shield : ShieldAlert;

  const colors = getColor();
  const sizeClasses = {
    sm: { container: "px-2 py-1 gap-1", icon: "w-3.5 h-3.5", text: "text-xs", score: "text-xs" },
    md: { container: "px-3 py-1.5 gap-1.5", icon: "w-4 h-4", text: "text-sm", score: "text-sm" },
    lg: { container: "px-4 py-2 gap-2", icon: "w-5 h-5", text: "text-base", score: "text-lg" },
  }[size];

  return (
    <div
      className={`inline-flex items-center rounded-full border ${colors.bg} ${colors.border} ${colors.text} ${sizeClasses.container}`}
      title={`Trust Score: ${score}/100 — ${getLabel()}`}
    >
      <IconComponent className={sizeClasses.icon} />
      <span className={`font-bold ${sizeClasses.score}`}>{score}</span>
      {showLabel && (
        <span className={`font-medium ${sizeClasses.text} hidden sm:inline`}>
          {getLabel()}
        </span>
      )}
    </div>
  );
}
