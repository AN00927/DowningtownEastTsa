// Native <details>/<summary> accordion: keyboard-accessible and screen-reader
// friendly with zero JS. Server component.
import { Plus } from "lucide-react";
import type { FaqItem } from "@/data/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y rounded-[var(--radius-base)] border bg-card shadow-soft">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-bold text-primary transition-colors hover:text-accent sm:px-6 [&::-webkit-details-marker]:hidden">
            {item.question}
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] border border-border text-accent transition-transform duration-200 group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-white">
              <Plus className="h-4 w-4" aria-hidden />
            </span>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:text-base">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
