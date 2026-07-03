// Auto-scrolling keyword strip. Server component, pure CSS motion (stops under
// reduced-motion via globals.css). Items render twice for a seamless loop.
import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <ul className="animate-marquee flex w-max items-center gap-10 pr-10">
        {row.map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center gap-10 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            {item}
            <span className="text-accent" aria-hidden>
              ◆
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
