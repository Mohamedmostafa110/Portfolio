import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string; // e.g. "01"
  eyebrow: string; // mono label
  title: string;
  description?: string;
}

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-accent" aria-hidden>
          {index}
        </span>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-fgmuted">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg text-balance sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl leading-relaxed text-fgmuted">{description}</p>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
