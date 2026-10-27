import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { MagneticButton } from "./ui/MagneticButton";

const headline = ["Ideas,", "engineered", "into", "products."];

function Word({ children, index, reduce }: { children: string; index: number; reduce: boolean }) {
  if (reduce) return <span>{children} </span>;
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}&nbsp;
    </motion.span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="group relative overflow-hidden bg-base pt-16"
      aria-label="Introduction"
    >
      {/* The grid stays hidden until the Hero is hovered. */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-grid opacity-0 transition-opacity duration-500 group-hover:opacity-[0.16]" />
      </div>

      <div className="mx-auto max-w-shell px-5 pb-20 pt-16 sm:px-8 sm:pt-24 md:pb-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center lg:gap-14">
          <div className="min-w-0">
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-fgmuted"
            >
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {site.availability}
            </motion.p>

            <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-7xl">
              {headline.map((word, i) => (
                <Word key={word} index={i} reduce={Boolean(reduce)}>
                  {word}
                </Word>
              ))}
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-fgmuted"
            >
              I&apos;m <span className="font-medium text-fg">Mohamed Mostafa</span>, a Full-Stack
              Engineer. I take products from idea to production — interface, backend logic,
              database, APIs, and deployment — with performance and reliability treated as features,
              not afterthoughts.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-accentdeep hover:text-navy-950"
                >
                  View selected projects
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  Let&apos;s build something
                </a>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/cv"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  CV
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          <motion.figure
            initial={reduce ? false : { opacity: 0, scale: 0.97, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[270px] sm:max-w-[320px] lg:max-w-none"
          >
            <motion.div
              aria-hidden
              animate={reduce ? undefined : { rotate: [3, 1.5, 3], y: [0, -4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-3 rounded-[2rem] border border-accent/40"
            />
            <motion.div
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-line bg-raised p-2 shadow-card"
            >
              <img
                src="/images/my%20pic.png"
                alt="Mohamed Mostafa"
                fetchPriority="high"
                className="h-full w-full rounded-[1.1rem] object-cover object-center"
              />
            </motion.div>
            <figcaption className="absolute inset-x-2 bottom-2 rounded-b-[1.1rem] bg-navy-950/80 px-4 py-3 backdrop-blur-sm">
              <span className="block text-sm font-semibold text-mist">Mohamed Mostafa</span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-slateblue">
                Full-Stack Engineer
              </span>
            </figcaption>
          </motion.figure>
        </div>

        {/* Technical metadata strip — system-inspired, restrained */}
        <motion.dl
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
        >
          {[
            ["focus", "Full-Stack Product Development"],
            ["stack", "React · TypeScript · C# · .NET · SQL"],
            ["mode", "Remote-friendly · detail-driven delivery"],
          ].map(([key, value]) => (
            <div key={key} className="bg-raised px-5 py-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-fgmuted">
                {key}
              </dt>
              <dd className="mt-1.5 font-mono text-xs text-fg">{value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="mx-auto mb-10 flex w-max items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-fgmuted transition-colors hover:text-accent"
      >
        scroll
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden />
      </motion.a>
    </section>
  );
}
