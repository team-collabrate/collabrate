"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("success");
      setMessage("You're on the list. Thanks for subscribing.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-[440px] max-lg:max-w-none">
      <div className="footer-field flex items-center gap-2 rounded-[12px] p-1.5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "loading") setStatus("idle");
          }}
          placeholder="you@company.com"
          aria-label="Email address"
          autoComplete="email"
          className="h-11 min-w-0 flex-1 bg-transparent px-3 text-[15px] text-foreground outline-none placeholder:text-foreground/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-11 shrink-0 rounded-[8px] bg-[linear-gradient(180deg,#A86BEF_0%,#8A2BE2_100%)] px-4 text-[14px] font-medium text-white transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_18px_-6px_rgba(138,43,226,0.55)] disabled:opacity-70"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={`mt-2 text-[13px] ${status === "error" ? "text-red-600" : status === "success" ? "text-emerald-600" : "text-foreground/65"}`}
      >
        {message || "We don't spam you or sell the data."}
      </p>
    </form>
  );
}
