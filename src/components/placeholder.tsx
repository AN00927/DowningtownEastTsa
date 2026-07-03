import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Visible placeholder for imagery the chapter must supply later.
 * Replace usages with <Image> once real assets exist in /public.
 */
export function ImagePlaceholder({
  label = "Photo placeholder",
  className,
  aspect = "aspect-[4/3]",
}: {
  label?: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 rounded-[var(--radius-base)] border border-dashed bg-muted text-muted-foreground",
        aspect,
        className,
      )}
    >
      <ImageIcon className="h-8 w-8" aria-hidden />
      <span className="px-3 text-center text-xs font-medium">{label}</span>
    </div>
  );
}

/** Circular avatar placeholder (officers). */
export function AvatarPlaceholder({
  label = "Photo",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex aspect-square w-full items-center justify-center rounded-full border border-dashed bg-muted text-muted-foreground",
        className,
      )}
    >
      <ImageIcon className="h-8 w-8" aria-hidden />
    </div>
  );
}
