"use client";

import { useState } from "react";
import { buttonClass } from "@/components/ui";

// ---------------------------------------------------------------------------
// Demo contact form. There is NO backend wired up.
//
// To receive real messages, connect this to a form service such as Formspree:
//   1. Create a form at https://formspree.io and copy your endpoint URL,
//      e.g. https://formspree.io/f/abcdwxyz
//   2. Replace the onSubmit handler below with a real POST, OR convert this to
//      a plain HTML form and set its action/method:
//
//        <form action="https://formspree.io/f/YOUR_ID" method="POST">
//          <input name="name" ... />
//          <input type="email" name="email" ... />
//          <input name="subject" ... />
//          <textarea name="message" ... />
//          <button type="submit">Send</button>
//        </form>
//
//      (When using Formspree's native action, the name attributes above are
//      what Formspree reads, so you can drop the controlled React state.)
// ---------------------------------------------------------------------------

const inputClass =
  "w-full rounded-[var(--radius-base)] border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-accent";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend: just flip to the success state. See comment above to wire
    // this up to Formspree (or another service) for real delivery.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-base)] border bg-muted/60 p-6 text-foreground"
      >
        <p className="font-semibold">Thanks!</p>
        <p className="mt-2 text-muted-foreground">
          This is a demo form. Connect it to a form service like Formspree to
          receive messages.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate={false}>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className="text-sm font-medium">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
          placeholder="What's this about?"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
          placeholder="Your message..."
        />
      </div>

      <button type="submit" className={buttonClass("primary", "lg")}>
        Send message
      </button>
    </form>
  );
}
