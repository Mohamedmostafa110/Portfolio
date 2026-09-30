import { Cable, Globe, LayoutDashboard, MousePointerClick, ServerCog } from "lucide-react";
import { services } from "@/data/portfolio";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const icons = {
  interface: LayoutDashboard,
  experience: MousePointerClick,
  website: Globe,
  integration: Cable,
  fullstack: ServerCog,
} as const;

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-y border-line bg-raised/50 py-20 md:py-28">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="What I do"
          title="From a blank page to a working product."
          description="Services shaped around outcomes — written so a business owner understands them and a technical lead can probe deeper."
        />

        <ul className="mt-14 space-y-0 divide-y divide-line border-y border-line">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <li key={service.title}>
                <Reveal delay={i * 0.04}>
                  <div className="group grid gap-4 py-7 sm:grid-cols-[3rem_1fr_2fr] sm:items-center sm:gap-8">
                    <span
                      className="hidden h-12 w-12 items-center justify-center rounded-xl border border-line text-fgmuted transition-colors group-hover:border-accent group-hover:text-accent sm:flex"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-fg transition-colors group-hover:text-accent sm:text-xl">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-fgmuted sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  )
  ;
}
