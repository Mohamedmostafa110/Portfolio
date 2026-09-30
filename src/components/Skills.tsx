import { skillGroups } from "@/data/portfolio";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-y border-line bg-raised/50 py-20 md:py-28">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Capabilities"
          title="The stack, organized by responsibility."
          description="No percentages, no inflated bars — just the technologies I work with, grouped the way I think about them."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.04} className="h-full">
              <div className="h-full bg-raised p-7">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg font-semibold text-fg">{group.label}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fgmuted">
                    {group.note}
                  </span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-lg border border-line px-3 py-1.5 font-mono text-xs text-fgmuted transition-colors hover:border-accent hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
