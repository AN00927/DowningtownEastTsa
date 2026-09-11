"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

import { site } from "@/data/site";

type CopyState = "idle" | "copied" | "failed";

/**
 * Copy text to the clipboard, working around the two ways this normally fails
 * in the wild:
 *
 * 1. `navigator.clipboard` only exists in a secure context. It is there on
 *    localhost and on https, and undefined when the site is opened over a LAN
 *    address like http://192.168.1.5:3000 (i.e. testing on a phone).
 * 2. Even where it exists, the write can be rejected by permissions policy.
 *
 * Falls back to the deprecated execCommand path, which has none of those
 * restrictions. Returns false when both routes fail so the UI can say so
 * instead of pretending it worked.
 */
async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy path rather than giving up.
    }
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    // Keep it off screen but still focusable. display:none or visibility:hidden
    // would make the selection fail.
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);

    // iOS ignores .select() on a readonly textarea and needs an explicit range.
    ta.contentEditable = "true";
    const range = document.createRange();
    range.selectNodeContents(ta);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    ta.setSelectionRange(0, text.length);

    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/**
 * The chapter's national TSA group access code, with a copy button. Students
 * need it once, when they affiliate through iServices, and a hyphenated code
 * is easy to mistype off a phone screen.
 *
 * If copying fails outright the code is selected instead, so the reader can
 * finish the job with a normal copy shortcut or a long press.
 */
export function JoinCode() {
  const [state, setState] = useState<CopyState>("idle");
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2500);
    return () => clearTimeout(t);
  }, [state]);

  async function onCopy() {
    const ok = await copyText(site.groupCode);
    setState(ok ? "copied" : "failed");

    if (!ok && codeRef.current) {
      // Last resort: put the code under the user's own selection so a manual
      // copy is one keystroke or one long press away.
      const range = document.createRange();
      range.selectNodeContents(codeRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

  return (
    <div>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <code
          ref={codeRef}
          className="flex-1 select-all rounded-[4px] border border-white/20 bg-white/10 px-4 py-3 text-center font-display text-xl font-bold tracking-[0.18em] text-white sm:text-2xl"
        >
          {site.groupCode}
        </code>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy group code ${site.groupCode}`}
          className="inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-accent px-5 font-display text-sm font-bold uppercase tracking-[0.08em] text-accent-foreground transition-colors hover:bg-accent-hover active:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {state === "copied" ? (
            <>
              <Check className="size-4" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-4" aria-hidden />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Reserve nothing when idle; this line only appears on failure. */}
      {state === "failed" && (
        <p className="mt-3 text-sm text-white/70">
          Could not copy automatically. The code is selected above, so copy it
          from there.
        </p>
      )}

      {/* Announced to screen readers without moving focus. */}
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied"
          ? "Group code copied to clipboard"
          : state === "failed"
            ? "Copy failed. The code is selected for manual copying."
            : ""}
      </span>
    </div>
  );
}
