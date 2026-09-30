import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { navItems, socials } from "@/data/portfolio";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";

const socialIcons = { github: Github, linkedin: Linkedin, mail: Mail } as const;

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-shell px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-fg">
              Mohamed Mostafa
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-fgmuted">
              Full-Stack Engineer building production-oriented digital products — from idea to
              deployment.
            </p>
            <ul className="mt-5 flex gap-3">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target={social.url.startsWith("http") ? "_blank" : undefined}
                      rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={() => track("social_click", { network: social.icon })}
                      aria-label={social.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-fgmuted transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer" className="w-full max-w-md md:w-auto">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fgmuted">
              Explore
            </p>
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3 md:gap-x-10">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-fgmuted transition-colors hover:text-accent"
                  >
                    {item.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 -translate-x-0.5 translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-fgmuted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fgmuted">
            designed & engineered — react · typescript · tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
