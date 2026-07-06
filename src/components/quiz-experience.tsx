"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Clapperboard,
  Cog,
  FlaskConical,
  Palette,
  RotateCcw,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink, Card } from "@/components/ui";
import { teamSizeLabel, type EventCategory } from "@/data/events";
import {
  profileFromAnswers,
  quizQuestions,
  rankEvents,
  type QuizMatch,
} from "@/data/quiz";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<EventCategory, LucideIcon> = {
  "Creative & Design": Palette,
  "Engineering & Technology": Cog,
  "Science & Research": FlaskConical,
  "Media & Communication": Clapperboard,
  "Academic & Competition": Trophy,
};

const OPTION_KEYS = "ABCDE";
const STORAGE_KEY = "deastTsaQuizProfile";

type Stage = "intro" | "quiz" | "results";

/** Relative fit (0-100) of a match within the result set, for the meter bars. */
function fitPercent(match: QuizMatch, matches: QuizMatch[]): number {
  const best = matches[0].score;
  const worst = matches[matches.length - 1].score;
  if (worst === best) return 100;
  return Math.round(100 * (1 - (match.score - best) / (worst - best)));
}

function CategoryTag({ category }: { category: EventCategory }) {
  const Icon = CATEGORY_ICONS[category];
  return (
    <span className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent">
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {category.replace(" & ", " + ")}
    </span>
  );
}

/** Ranked result rows for matches #2 and below. */
function MatchRow({
  match,
  rank,
  matches,
}: {
  match: QuizMatch;
  rank: number;
  matches: QuizMatch[];
}) {
  const { event } = match;
  return (
    <li>
      <Link href={`/events/${event.id}`} className="group block">
        <Card className="flex items-center gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-soft-lg sm:gap-5">
          <span className="w-10 shrink-0 text-right font-display text-3xl font-bold tabular-nums text-primary/25">
            {String(rank).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h4 className="font-display text-xl font-bold uppercase tracking-[0.04em] text-primary transition-colors group-hover:text-accent">
                {event.name}
              </h4>
              <CategoryTag category={event.category} />
            </div>
            {/* Relative fit meter */}
            <div
              className="mt-2.5 h-1.5 w-full max-w-[240px] -skew-x-[20deg] bg-muted"
              aria-hidden
            >
              <span
                className="block h-full bg-accent transition-[width] duration-500"
                style={{ width: `${Math.max(fitPercent(match, matches), 4)}%` }}
              />
            </div>
          </div>
          <ArrowRight
            className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
            aria-hidden
          />
        </Card>
      </Link>
    </li>
  );
}

export function QuizExperience() {
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  /** Chosen option index per question. */
  const [answers, setAnswers] = useState<number[]>([]);
  /** Option briefly highlighted between click and advancing. */
  const [pending, setPending] = useState<number | null>(null);
  const [matches, setMatches] = useState<QuizMatch[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const total = quizQuestions.length;

  // A finished profile from a previous visit unlocks "see my last results".
  useEffect(() => {
    try {
      setHasSaved(localStorage.getItem(STORAGE_KEY) !== null);
    } catch {
      // Storage unavailable (private mode) — the quiz still works.
    }
  }, []);

  function finish(finalAnswers: number[]) {
    const profile = profileFromAnswers(
      finalAnswers.map((choice, i) => quizQuestions[i].options[choice]),
    );
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setHasSaved(true);
    } catch {
      // Ignore storage failures.
    }
    setMatches(rankEvents(profile));
    setShowAll(false);
    setStage("results");
  }

  function choose(optionIndex: number) {
    if (pending !== null) return;
    setPending(optionIndex);
    const next = [...answers.slice(0, index), optionIndex];
    // Brief pause so the selection reads before the next question slides in.
    setTimeout(() => {
      setPending(null);
      setAnswers(next);
      if (index + 1 >= total) finish(next);
      else setIndex(index + 1);
    }, 300);
  }

  function restart() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
    setHasSaved(false);
    setAnswers([]);
    setIndex(0);
    setShowAll(false);
    setStage("quiz");
  }

  function showSavedResults() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      setMatches(rankEvents(JSON.parse(stored) as number[]));
      setShowAll(false);
      setStage("results");
    } catch {
      // Corrupt/unavailable storage: just let them take the quiz.
    }
  }

  /* ------------------------------ Intro ------------------------------ */
  if (stage === "intro") {
    return (
      <Card className="border-t-4 border-t-accent p-7 sm:p-10">
        <span className="block h-1.5 w-16 -skew-x-[20deg] bg-accent" aria-hidden />
        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">How it works</h2>
        <p className="mt-4 max-w-[58ch] text-muted-foreground">
          Answer {total} quick questions about how you like to think, build,
          and compete. We compare your answers against every event the chapter
          offers and rank your closest matches. There are no wrong answers,
          and it takes about two minutes.
        </p>
        <dl className="mt-7 grid grid-cols-3 gap-4 border-t pt-6">
          {[
            { value: String(total), label: "Questions" },
            { value: "~2 min", label: "To finish" },
            { value: "Top 5", label: "Matches" },
          ].map((s) => (
            <div key={s.label}>
              <dt className="font-display text-3xl font-bold tabular-nums text-primary sm:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setStage("quiz")}
            className="inline-flex h-13 cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-accent px-8 font-display text-base font-bold uppercase tracking-[0.08em] text-accent-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Start the Quiz
          </button>
          {hasSaved && (
            <button
              type="button"
              onClick={showSavedResults}
              className="cursor-pointer font-display text-sm font-bold uppercase tracking-[0.08em] text-primary/80 underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              See my last results
            </button>
          )}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Your answers stay in your browser. Nothing is uploaded or shared.
        </p>
      </Card>
    );
  }

  /* ------------------------------- Quiz ------------------------------- */
  if (stage === "quiz") {
    const question = quizQuestions[index];
    return (
      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-accent">
            Question {index + 1} of {total}
          </p>
          {index > 0 ? (
            <button
              type="button"
              onClick={() => setIndex(index - 1)}
              className="inline-flex cursor-pointer items-center gap-1.5 font-display text-sm font-bold uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
          ) : null}
        </div>

        {/* Skewed segment per question — the varsity progress bar. */}
        <div className="mt-4 flex gap-1.5" aria-hidden>
          {quizQuestions.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 -skew-x-[20deg] transition-colors duration-300",
                i < index ? "bg-accent" : i === index ? "bg-accent/50" : "bg-muted",
              )}
            />
          ))}
        </div>

        {/* Keyed by question index so the rise-in animation replays. */}
        <div key={index} style={{ animation: "rise-in 0.45s ease-out both" }}>
          <h2 className="mt-9 text-balance text-3xl font-bold sm:text-4xl">
            {question.question}
          </h2>
          <div className="mt-8 flex flex-col gap-3">
            {question.options.map((option, i) => {
              const selected = pending === i || (pending === null && answers[index] === i);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={pending !== null}
                  onClick={() => choose(i)}
                  className={cn(
                    "group flex w-full cursor-pointer items-center gap-4 rounded-[6px] border bg-card p-4 text-left shadow-soft transition-all duration-200 sm:p-5",
                    selected
                      ? "-translate-y-0.5 border-accent shadow-soft-lg"
                      : "border-border hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-soft-lg",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 shrink-0 -skew-x-[20deg] items-center justify-center rounded-[3px] font-display text-sm font-bold transition-colors duration-200",
                      selected
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground",
                    )}
                  >
                    <span className="inline-block skew-x-[20deg]">
                      {OPTION_KEYS[i]}
                    </span>
                  </span>
                  <span className="text-[15px] font-medium leading-snug text-foreground">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------ Results ------------------------------ */
  const [top, ...rest] = matches;
  const visibleRest = showAll ? rest : rest.slice(0, 4);

  return (
    <div style={{ animation: "rise-in 0.45s ease-out both" }}>
      <div className="text-center">
        <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-accent">
          Results
        </p>
        <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
          Your best matches
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Ranked by how closely each event fits your answers. Tap any match to
          read the full event details.
        </p>
      </div>

      {top ? (
        <Card className="mt-10 border-t-4 border-t-accent p-7 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-block -skew-x-[20deg] bg-accent px-3.5 py-1 shadow-soft">
              <span className="inline-block skew-x-[20deg] font-display text-xs font-bold uppercase tracking-[0.1em] text-accent-foreground">
                Best Match
              </span>
            </span>
            <CategoryTag category={top.event.category} />
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold uppercase tracking-[0.04em] text-primary sm:text-4xl">
            {top.event.name}
          </h3>
          <p className="mt-3 max-w-[60ch] text-muted-foreground">
            {top.event.blurb}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ButtonLink href={`/events/${top.event.id}`} variant="accent">
              View Event <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <span className="text-sm text-muted-foreground">
              {teamSizeLabel(top.event)}
              {top.event.scope === "pa" && " · PA-only event"}
            </span>
          </div>
        </Card>
      ) : (
        <Card className="mt-10 p-8 text-center text-muted-foreground">
          No matches found. Try retaking the quiz.
        </Card>
      )}

      {visibleRest.length > 0 && (
        <ol className="mt-5 flex flex-col gap-4">
          {visibleRest.map((match, i) => (
            <MatchRow
              key={match.event.id}
              match={match}
              rank={i + 2}
              matches={matches}
            />
          ))}
        </ol>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {!showAll && rest.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex h-11 cursor-pointer items-center justify-center rounded-[4px] border border-border bg-card px-6 font-display text-sm font-bold uppercase tracking-[0.08em] text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            Show all {matches.length} matches
          </button>
        )}
        <button
          type="button"
          onClick={restart}
          className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[4px] border border-border bg-card px-6 font-display text-sm font-bold uppercase tracking-[0.08em] text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
