import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Award, Download, ExternalLink, Eye, FileText, X } from "lucide-react";
import { certificates } from "@/data/portfolio";
import type { Certificate } from "@/data/portfolio";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

function CertificatePreview({
  certificate,
  onClose,
}: {
  certificate: Certificate;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/75 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-preview-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.18 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
        transition={{ duration: reduceMotion ? 0 : 0.22 }}
        className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-line bg-base shadow-pop"
      >
        <header className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <h2
              id="certificate-preview-title"
              className="truncate font-display text-base font-semibold text-fg sm:text-lg"
            >
              {certificate.title}
            </h2>
            <p className="mt-0.5 truncate font-mono text-xs text-fgmuted">{certificate.issuer}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close certificate preview"
            className="grid size-10 shrink-0 place-items-center rounded-md border border-line text-fgmuted transition-colors hover:border-accent hover:text-accent"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </header>

        <iframe
          src={certificate.pdfUrl}
          title={`${certificate.title} PDF`}
          className="h-[65vh] min-h-[320px] w-full flex-1 bg-white sm:min-h-[440px]"
        />

        <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-line px-4 py-3 sm:px-6">
          <a
            href={certificate.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Open PDF in new tab
          </a>
          <a
            href={certificate.pdfUrl}
            download
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-accentdeep"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download certificate
          </a>
        </footer>
      </motion.div>
    </motion.div>
  );
}

export function Certificates() {
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);

  return (
    <section
      id="certificates"
      className="mx-auto max-w-shell scroll-mt-20 px-5 py-20 sm:px-8 md:py-28"
    >
      <SectionHeading
        index="05"
        eyebrow="Learning & development"
        title="Certificates & Achievements"
        description="Certificates documenting my training and learning progress across frontend development, web development, and language learning."
      />

      {certificates.length === 0 ? (
        <Reveal>
          <div className="mt-12 rounded-xl border border-dashed border-line bg-raised/50 px-6 py-10 text-center">
            <Award className="mx-auto h-7 w-7 text-accent" aria-hidden />
            <p className="mt-4 text-sm leading-relaxed text-fgmuted">
              Add certificate entries to <code>src/data/portfolio.ts</code> and PDFs to{" "}
              <code>public/certificates/</code>.
            </p>
          </div>
        </Reveal>
      ) : (
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <li key={certificate.id}>
              <Reveal delay={index * 0.04} className="h-full">
                <article
                  className={`flex h-full min-h-[260px] flex-col rounded-2xl border bg-raised p-6 transition-colors duration-300 hover:border-accent/50 ${
                    certificate.featured ? "border-accent/50" : "border-line"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-lg border ${
                        certificate.featured
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : "border-line bg-overlay text-fgmuted"
                      }`}
                    >
                      {certificate.featured ? (
                        <Award className="h-5 w-5" aria-hidden />
                      ) : (
                        <FileText className="h-5 w-5" aria-hidden />
                      )}
                    </span>
                    {certificate.featured ? (
                      <span className="rounded-full border border-accent/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                        Final Diploma
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5">
                    <p className="font-mono text-xs text-fgmuted">{certificate.issuer}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-fg">
                      {certificate.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fgmuted">
                      {certificate.description}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                    <span className="font-mono text-[10px] leading-relaxed text-fgmuted">
                      {certificate.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveCertificate(certificate)}
                      aria-haspopup="dialog"
                      aria-label={`View ${certificate.title}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-fg"
                    >
                      View Certificate
                      <Eye className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
      <AnimatePresence>
        {activeCertificate ? (
          <CertificatePreview
            certificate={activeCertificate}
            onClose={() => setActiveCertificate(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
