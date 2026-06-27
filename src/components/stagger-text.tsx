import { cn } from "@/lib/utils";

/**
 * Reveals text word by word with a small staggered rise (anime.js-inspired).
 * Server-safe: the animation runs purely from CSS on mount and respects
 * prefers-reduced-motion (handled in globals.css). Spacing/wrapping is
 * preserved because each word is an inline-block followed by a normal space.
 */
export function StaggerText({
  text,
  className,
  step = 70,
}: {
  text: string;
  className?: string;
  /** Delay between words, in ms. */
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span
            className="rise-word"
            style={{ animationDelay: `${i * step}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
