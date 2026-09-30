import { journey } from "@/data/portfolio";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Journey() {
  return (
    <section id="journey" className="scroll-mt-20 border-y border-line bg-raised/50 py-20 md:py-28">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="The journey"
          title="A trajectory of deliberate, compounding growth."
        />

        <ol className="relative mt-14 space-y-10 border-l border-line pl-8 sm:pl-10">
          {journey.map((entry, i) => (
            <li key={entry.title} className="relative">
              <span
                className="absolute -left-[38px] top-1.5 flex h-4 w-4 items-center justify-center sm:-left-[46px]"
                aria-hidden
              >
                <span className="absolute h-4 w-4 rounded-full border border-accent/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <Reveal delay={i * 0.05}>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                  {entry.period}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-fg">
                  {entry.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-fgmuted">{entry.organization}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fgmuted">
                  {entry.description}
                </p>
                {entry.tags && entry.tags.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Related skills">
                    {entry.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fgmuted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
