"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { checkDemoFields, normalizeMobile, type DemoErrors } from "@/lib/demo-request";
import { currentVisitorId, trackEvent } from "@/lib/analytics/tracker";

const field = "w-full bg-ink border border-line px-4 py-3 text-bone placeholder:text-dim focus:border-gold outline-none transition-colors";
const FAILED = "We could not send your request. Please check your connection and try again.";

/** One id per page load, so a retried submit is the same request. getRandomValues works on plain http, unlike randomUUID. */
const newReference = () => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
};

export default function DemoForm() {
  const [values, setValues] = useState({ name: "", company: "", mobile: "", email: "" });
  const [errors, setErrors] = useState<DemoErrors>({});
  const [website, setWebsite] = useState(""); // honeypot: hidden from visitors, bots fill it
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const reference = useRef<string | null>(null);
  const started = useRef(false);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [k]: e.target.value }));

  // Digits only, at most 10. A pasted "+91 98765 43210" or "098765 43210" keeps its 10 digits.
  const setMobile = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, mobile: normalizeMobile(e.target.value).slice(0, 10) }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const checked = checkDemoFields(values);
    if (!checked.ok) return setErrors(checked.errors);
    setErrors({});
    setSubmitError(null);
    setLoading(true);
    reference.current ??= newReference();
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...checked.value, website, externalRef: reference.current, entryPoint: "contact", visitorId: currentVisitorId() ?? undefined }),
      });
      if (res.ok) { trackEvent("demo_request"); return setDone(true); }
      const data = (await res.json().catch(() => null)) as { error?: unknown } | null;
      setSubmitError(typeof data?.error === "string" && data.error ? data.error : FAILED);
    } catch {
      setSubmitError(FAILED);
    } finally {
      setLoading(false);
    }
  };

  const wrap = "lg:col-span-8 relative bg-ink border border-line p-6 md:p-8";

  if (done)
    return (
      <div className={`${wrap} flex flex-col justify-center`} role="status">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
        <p className="text-2xl font-semibold text-bone">Thank you — we have your request.</p>
        <p className="mt-3 text-muted">
          Our team will call <span className="text-bone">{values.mobile}</span> within 2–3 working days to confirm your demo.
        </p>
      </div>
    );

  const err = (k: keyof DemoErrors) => errors[k] && <p className="mt-1 text-xs text-red-400">{errors[k]}</p>;
  const border = (k: keyof DemoErrors) => (errors[k] ? "!border-red-400" : "");

  return (
    <form onSubmit={onSubmit} noValidate className={`${wrap} flex flex-col gap-4`} onFocus={() => { if (!started.current) { started.current = true; trackEvent("form_start"); } }}>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
      {/* Honeypot: off-screen and skipped by keyboard and screen readers; only bots fill it */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="demo-website">Website</label>
        <input id="demo-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input id="demo-name" className={`${field} ${border("name")}`} type="text" name="name" autoComplete="name" placeholder="Full name" value={values.name} onChange={set("name")} />
          {err("name")}
        </div>
        <div>
          <input id="demo-company" className={`${field} ${border("company")}`} type="text" name="company" autoComplete="organization" placeholder="Company / plant name" value={values.company} onChange={set("company")} />
          {err("company")}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input id="demo-mobile" className={`${field} ${border("mobile")}`} type="tel" inputMode="numeric" maxLength={20} name="mobile" autoComplete="tel" placeholder="Mobile (10 digits)" value={values.mobile} onChange={setMobile} />
          {err("mobile")}
        </div>
        <div>
          <input id="demo-email" className={`${field} ${border("email")}`} type="email" name="email" autoComplete="email" placeholder="Work email" value={values.email} onChange={set("email")} />
          {err("email")}
        </div>
      </div>
      {submitError && (
        <div role="alert" className="border border-red-400/50 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {submitError}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={loading} className="px-7 py-3.5 bg-gold text-ink text-sm font-semibold hover:bg-gold2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? "Sending…" : "Book a demo"}
        </button>
        <p className="text-xs text-dim">No spam. We usually reply within 2–3 working days.</p>
      </div>
      <p className="text-xs text-dim leading-relaxed">
        By pressing “Book a demo” you ask us to contact you about FactoONE using these details. We use them only for that, and you can ask us to delete them at any time.{" "}
        <Link href="/privacy" className="text-gold hover:text-gold2 underline underline-offset-2">Privacy notice</Link>
      </p>
    </form>
  );
}
