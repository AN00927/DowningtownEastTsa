// Auto-scrolling keyword strip. Server component, pure CSS motion (stops under
// reduced-motion via globals.css). Items render twice for a seamless loop.
// Color is inherited from the wrapper; alternate words render outlined for a
// bold varsity rhythm.
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
            className="flex shrink-0 items-center gap-10 font-display text-xl font-bold uppercase tracking-[0.14em]"
          >
            <span className={cn(i % 2 === 1 && "text-stroke-white")}>
              {item}
            </span>
            <span className="h-[3px] w-5 -skew-x-[20deg] bg-current opacity-60" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
