import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink, FolderGit2, X } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { ProjectImage } from "./ui/ProjectImage";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

function isRealLink(url?: string) {
  return Boolean(url && url !== "#");
}

function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      {isRealLink(project.liveDemo) ? (
        <a
          href={project.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("project_live_click", { project: project.id })}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-accent underline-offset-4 hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          Live Demo
        </a>
      ) : null}
      {isRealLink(project.github) ? (
        <a
          href={isRealLink(project.github) ? project.github : site.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("project_github_click", { project: project.id })}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-fgmuted underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          <FolderGit2 className="h-3.5 w-3.5" aria-hidden />
          GitHub
        </a>
      ) : null}
    </div>
  );
}

function TechChips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {items.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fgmuted"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ Case-study modal ------------------------------ */

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
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

  const cs = project.caseStudy;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <motion.button
        type="button"
        aria-label="Close case study"
        onClick={onClose}
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-base shadow-pop sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-base/90 px-6 py-4 backdrop-blur-md">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-fgmuted">
            case study — {project.year}
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

        <div className="space-y-10 px-6 py-8 sm:px-10">
          <div>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-fg">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-sm text-accent">{project.tagline}</p>
            <p className="mt-4 leading-relaxed text-fgmuted">{project.description}</p>
            <div className="mt-5">
              <TechChips items={project.technologies} />
            </div>
          </div>

          <ProjectImage
            src={project.image}
            title={project.title}
            className="aspect-[16/9] w-full rounded-2xl border border-line object-cover"
          />

          <div className="grid gap-8 sm:grid-cols-2">
            <CaseBlock title="The problem">{cs.problem}</CaseBlock>
            <CaseBlock title="My role">{cs.role}</CaseBlock>
          </div>

          {cs.thinking ? <CaseBlock title="The thinking">{cs.thinking}</CaseBlock> : null}

          <CaseBlock title="Architecture & structure">
            <ul className="space-y-2.5">
              {cs.architecture.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-fgmuted">
                  <span className="mt-2 h-1 w-4 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </CaseBlock>

          <CaseBlock title="Key technical decisions">
            <ul className="space-y-2.5">
              {cs.decisions.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-fgmuted">
                  <span className="mt-2 h-1 w-4 shrink-0 rounded-full bg-accent/60" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </CaseBlock>

          {cs.challenges ? <CaseBlock title="Challenges">{cs.challenges}</CaseBlock> : null}
          {cs.outcome ? <CaseBlock title="Outcome">{cs.outcome}</CaseBlock> : null}
          {cs.lessons ? <CaseBlock title="Lessons learned">{cs.lessons}</CaseBlock> : null}

          {project.relatedNote ? (
            <div className="rounded-2xl border border-dashed border-accent/40 bg-overlay p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                related build
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fgmuted">{project.relatedNote}</p>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <ProjectLinks project={project} />
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fgmuted">
              {project.category} · {project.year}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CaseBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{title}</h4>
      <div className="mt-3 text-sm leading-relaxed text-fgmuted">{children}</div>
    </div>
  );
}

/* --------------------------------- Section ---------------------------------- */

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
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

  const visibleProjects = showAll ? projects : projects.slice(0, isMobile ? 5 : 7);
  const featured = visibleProjects.find((p) => p.featured);
  const rest = visibleProjects.filter((p) => p !== featured);

  return (
    <section
      id="projects"
      className={
        showAll
          ? "fixed inset-0 z-40 max-w-none overflow-y-auto bg-base px-5 py-8 sm:px-8 md:py-12"
          : "mx-auto max-w-shell scroll-mt-20 px-5 py-20 sm:px-8 md:py-28"
      }
    >
      <SectionHeading
        index="03"
        eyebrow="Selected projects"
        title="Work that goes from problem to product."
        description="A visual gallery first — every project opens into a technical case study: problem, role, architecture, decisions."
      />

      {showAll ? (
        <button
          type="button"
          onClick={() => {
            setShowAll(false);
            window.requestAnimationFrame(() =>
              document.querySelector("#projects")?.scrollIntoView(),
            );
          }}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fgmuted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to portfolio
        </button>
      ) : null}

      <div className="mt-14 space-y-8">
        {featured ? (
          <Reveal>
            <article className="group grid overflow-hidden rounded-3xl border border-line bg-raised transition-colors hover:border-accent/50 md:grid-cols-2">
              <div className="relative overflow-hidden">
                <ProjectImage
                  src={featured.image}
                  title={featured.title}
                  className="h-full min-h-[260px] w-full bg-raised object-contain"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="font-mono text-xs text-accent">
                  featured · {featured.category} · {featured.year}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  {featured.title}
                  <span className="ml-3 align-middle font-mono text-sm font-normal text-fgmuted">
                    {featured.tagline}
                  </span>
                </h3>
                <p className="mt-4 leading-relaxed text-fgmuted">{featured.description}</p>
                <div className="mt-5">
                  <TechChips items={featured.technologies} />
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActive(featured)}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-accentdeep"
                  >
                    Read the case study
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </button>
                  <ProjectLinks project={featured} />
                </div>
              </div>
            </article>
          </Reveal>
        ) : null}

        <div className="grid gap-8 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-raised transition-colors hover:border-accent/50">
                <div className="relative overflow-hidden">
                  <ProjectImage
                    src={project.image}
                    title={project.title}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-navy-950/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mist backdrop-blur">
                    {project.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-fg">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-fgmuted">{project.year}</span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-accent">{project.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fgmuted">
                    {project.description}
                  </p>
                  {project.relatedNote ? (
                    <p className="mt-3 border-l-2 border-accent/50 pl-3 text-xs italic leading-relaxed text-fgmuted">
                      {project.relatedNote}
                    </p>
                  ) : null}
                  <div className="mt-5">
                    <TechChips items={project.technologies} />
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                    <button
                      type="button"
                      onClick={() => setActive(project)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg transition-colors hover:text-accent"
                    >
                      Case study
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </button>
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {!showAll && projects.length > (isMobile ? 5 : 7) ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              View all projects
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {active ? <CaseStudyModal project={active} onClose={() => setActive(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}
