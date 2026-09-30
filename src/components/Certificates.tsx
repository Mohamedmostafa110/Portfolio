import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Award, X } from "lucide-react";
import { certificates } from "@/data/portfolio";
import type { Certificate } from "@/data/portfolio";
import { ProjectImage } from "./ui/ProjectImage";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

function CertificateModal({
  certificate,
  onClose,
}: {
  certificate: Certificate;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${certificate.title} details`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close certificate details"
        onClick={onClose}
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.24 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-line bg-base shadow-pop sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-base/90 px-6 py-4 backdrop-blur-md sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-fgmuted">
            {certificate.kind ?? "certificate details"}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-fgmuted transition-colors hover:border-accent hover:text-accent"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="space-y-7 px-6 py-8 sm:px-8">
          <div>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-fg">
              {certificate.title}
            </h3>
            <p className="mt-2 font-mono text-sm text-accent">
              {certificate.issuer} · {certificate.year}
            </p>
          </div>

          <ProjectImage
            src={certificate.image}
            title={certificate.title}
            hint="certificate image"
            className="aspect-[16/9] w-full rounded-2xl border border-line object-cover"
          />

          {certificate.description ? (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">About</h4>
              <p className="mt-3 text-sm leading-relaxed text-fgmuted">{certificate.description}</p>
            </div>
          ) : null}

          {certificate.experience ? (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                My experience
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-fgmuted">{certificate.experience}</p>
            </div>
          ) : null}

          {certificate.achievements?.length ? (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                What I did
              </h4>
              <ul className="mt-3 space-y-2.5">
                {certificate.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-fgmuted">
                    <span className="mt-2 h-1 w-4 shrink-0 rounded-full bg-accent" aria-hidden />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {certificate.learnings?.length ? (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                What I learned
              </h4>
              <ul className="mt-3 space-y-2.5">
                {certificate.learnings.map((learning) => (
                  <li key={learning} className="flex gap-3 text-sm leading-relaxed text-fgmuted">
                    <span className="mt-2 h-1 w-4 shrink-0 rounded-full bg-accent/70" aria-hidden />
                    {learning}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {certificate.skills?.length ? (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Skills</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {certificate.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fgmuted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Certificates() {
  const [showAll, setShowAll] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!showAll) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowAll(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [showAll]);

  const limit = isMobile ? 4 : 6;
  const visibleCertificates = showAll ? certificates : certificates.slice(0, limit);

  return (
    <section
      id="certificates"
      className={
        showAll
          ? "fixed inset-0 z-40 max-w-none overflow-y-auto bg-base px-5 py-8 sm:px-8 md:py-12"
          : "mx-auto max-w-shell scroll-mt-20 px-5 py-20 sm:px-8 md:py-28"
      }
    >
      <SectionHeading
        index="05"
        eyebrow="Evidence"
        title="Certificates & achievements."
        description="Visual proof of programs, milestones, and work completed — easy to scan, easy to verify."
      />

      {certificates.length === 0 ? (
        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-line bg-raised/50 px-6 py-16 text-center">
            <Award className="h-8 w-8 text-accent" aria-hidden />
            <p className="max-w-md text-sm leading-relaxed text-fgmuted">
              Certificates are added as simple objects in{" "}
              <code className="rounded bg-overlay px-1.5 py-0.5 font-mono text-xs text-accent">
                src/data/portfolio.ts
              </code>{" "}
              — drop the image into{" "}
              <code className="rounded bg-overlay px-1.5 py-0.5 font-mono text-xs text-accent">
                public/images/certificates/
              </code>{" "}
              and the card renders itself. No fake certificates are shown here.
            </p>
          </div>
        </Reveal>
      ) : (
        <>
          {showAll ? (
            <button
              type="button"
              onClick={() => {
                setShowAll(false);
                window.requestAnimationFrame(() =>
                  document.querySelector("#certificates")?.scrollIntoView(),
                );
              }}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fgmuted transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to portfolio
            </button>
          ) : null}
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCertificates.map((cert, i) => (
              <li key={`${cert.title}-${cert.year}`}>
                <Reveal delay={i * 0.05}>
                  <button
                    type="button"
                    onClick={() => setActiveCertificate(cert)}
                    className="group block w-full overflow-hidden rounded-3xl border border-line bg-raised text-left transition-colors hover:border-accent/50"
                  >
                    <ProjectImage
                      src={cert.image}
                      title={cert.title}
                      hint={`add scan → public/images/certificates/`}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="p-5">
                      <h3 className="font-display text-base font-semibold text-fg">{cert.title}</h3>
                      <p className="mt-1 font-mono text-xs text-fgmuted">
                        {cert.issuer} · {cert.year}
                      </p>
                    </div>
                  </button>
                </Reveal>
              </li>
            ))}
          </ul>
          {!showAll && certificates.length > limit ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
              >
                View all certificates
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ) : null}
        </>
      )}
      <AnimatePresence>
        {activeCertificate ? (
          <CertificateModal
            certificate={activeCertificate}
            onClose={() => setActiveCertificate(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
