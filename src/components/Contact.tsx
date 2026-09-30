import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type FormStatus = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-line bg-raised px-4 py-3 text-sm text-fg placeholder:text-fgmuted/60 transition-colors focus:border-accent focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("sending");
    const data = new FormData(form);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _subject: `Portfolio inquiry — ${String(data.get("name") ?? "")}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
      track("contact_submit");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <SectionHeading
              index="07"
              eyebrow="Contact"
              title="Have an idea in mind? Let's build it."
              description="Tell me what you're trying to create — a product, a platform, a website, or a problem that needs software. I usually reply within a day."
            />
            <Reveal delay={0.1}>
              <dl className="mt-10 space-y-5">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-fgmuted">
                    email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${site.email}`}
                      className="font-mono text-sm text-accent underline-offset-4 hover:underline"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-fgmuted">
                    availability
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-fg">{site.availability}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-fgmuted">
                    base
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-fg">{site.location}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-line bg-raised p-6 shadow-card sm:p-8"
              aria-label="Contact form"
            >
              <div className="grid gap-5">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-fg">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-fg">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium text-fg"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    rows={6}
                    placeholder="What are we building?"
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-accentdeep disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden />
                        Send message
                      </>
                    )}
                  </button>
                </MagneticButton>

                <div aria-live="polite">
                  {status === "success" ? (
                    <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                      Thanks for reaching out — your message has been sent.
                    </p>
                  ) : null}
                  {status === "error" ? (
                    <p className="inline-flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
                      <XCircle className="h-4 w-4" aria-hidden />
                      Something went wrong — please email me directly.
                    </p>
                  ) : null}
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
