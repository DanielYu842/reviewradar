import { Platform, PLATFORM_INFO } from "@/lib/types";

interface PlatformTagProps {
  platform: Platform;
  size?: "sm" | "md";
}

export default function PlatformTag({ platform, size = "md" }: PlatformTagProps) {
  const info = PLATFORM_INFO[platform];
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses}`}
      style={{ backgroundColor: info.bgColor, color: info.color }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: info.color }}
      />
      {info.label}
    </span>
  );
}
