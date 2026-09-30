import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const principles = [
  {
    title: "Systems before screens",
    body: "A product is only as good as what sits beneath it. I care about structure, data flow, and architecture as much as the interface.",
  },
  {
    title: "End-to-end ownership",
    body: "Frontend, backend, database, deployment — I want to understand and build the whole product, not just one layer of it.",
  },
  {
    title: "Performance & reliability",
    body: "Fast, stable, secure software is a baseline. I treat budgets, errors, and edge cases as first-class requirements.",
  },
  {
    title: "Methodical delivery",
    body: "Clean code, documentation, and consistency. When I take on a project, the goal is the best version of it — not the quickest checkbox.",
  },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-shell scroll-mt-20 px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        index="01"
        eyebrow="The engineer"
        title="Products are systems — I build them whole."
      />

      <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-fgmuted">
            <p>
              I&apos;m Mohamed Mostafa — a Full-Stack Engineer with a backend mindset and a product
              eye. My work starts where most interfaces end: the logic, the data model, the API
              contract, and the decisions that make software hold up in the real world.
          </p>
            <p>
              That means I&apos;m as comfortable reasoning about database design and system
              structure as I am crafting a polished, responsive UI. I enjoy the full arc of a
              product: understanding the problem, designing the solution, building it end to end,
              and shipping something people can actually rely on.
          </p>
            <p>
              I&apos;m continuously learning and deliberately building — every project is an
              opportunity to engineer something better than the last.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-line bg-raised p-5 transition-colors hover:border-accent/50">
                <h3 className="font-display text-sm font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fgmuted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
