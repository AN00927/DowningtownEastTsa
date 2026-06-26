"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, Users, User } from "lucide-react";
import { quiz, type QuizOption } from "@/data/quiz";
import {
  events,
  participationOf,
  teamSizeLabel,
  type EventCategory,
} from "@/data/events";
import { Badge, Card, buttonClass } from "@/components/ui";
import { cn } from "@/lib/utils";

const TOP_N = 5;

export function QuizFlow() {
  // answers[questionIndex] = chosen option index (or undefined)
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>(
    () => Array(quiz.length).fill(undefined),
  );
  const [done, setDone] = useState(false);

  const recommendations = useMemo(() => {
    if (!done) return [];

    const catScore: Record<string, number> = {};
    const eventScore: Record<string, number> = {};

    answers.forEach((optIdx, qIdx) => {
      if (optIdx === undefined) return;
      const opt: QuizOption = quiz[qIdx].options[optIdx];
      if (opt.categories) {
        for (const [cat, pts] of Object.entries(opt.categories)) {
          catScore[cat] = (catScore[cat] ?? 0) + (pts ?? 0);
        }
      }
      if (opt.events) {
        for (const [id, pts] of Object.entries(opt.events)) {
          eventScore[id] = (eventScore[id] ?? 0) + (pts ?? 0);
        }
      }
    });

    return [...events]
      .map((e) => ({
        event: e,
        score:
          (catScore[e.category as EventCategory] ?? 0) +
          (eventScore[e.id] ?? 0) * 2,
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_N);
  }, [done, answers]);

  const total = quiz.length;
  const current = quiz[step];
  const progress = Math.round(((done ? total : step) / total) * 100);

  const choose = (optIdx: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = optIdx;
      return next;
    });
    // Auto-advance shortly after choosing.
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setAnswers(Array(total).fill(undefined));
    setStep(0);
    setDone(false);
  };

  if (done) {
    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-accent">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Your matches
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Events you might love
          </h2>
          <p className="mt-2 text-muted-foreground">
            Based on your answers. Look through them, you&apos;re not locked in!
          </p>
        </div>

        {recommendations.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            We couldn&apos;t find a strong match. Browse all events instead.
          </Card>
        ) : (
          <div className="space-y-4">
            {recommendations.map(({ event }, i) => (
              <Card key={event.id} className="flex items-start gap-4 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{event.name}</h3>
                    {event.scope === "pa" && (
                      <Badge className="border-accent/40 bg-accent/10 text-accent">
                        PA-only
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{event.blurb}</p>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    {participationOf(event) === "individual" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Users className="h-4 w-4" />
                    )}
                    {teamSizeLabel(event)} · {event.category}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={restart} className={buttonClass("outline", "md")}>
            <RotateCcw className="h-4 w-4" /> Retake quiz
          </button>
          <Link href="/events" className={buttonClass("primary", "md")}>
            Browse all events <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {step + 1} of {total}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {current.prompt}
      </h2>

      <div className="mt-6 grid gap-3">
        {current.options.map((opt, i) => {
          const selected = answers[step] === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              className={cn(
                "rounded-[var(--radius-base)] border p-4 text-left text-base transition-colors",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {step > 0 && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
      )}
    </div>
  );
}
