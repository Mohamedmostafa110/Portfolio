import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Menu, Moon, Search, Sun, X } from "lucide-react";
import { Link } from "react-router-dom";
import { navItems } from "@/data/portfolio";
import { site } from "@/config/site";
import { useTheme } from "@/hooks/useTheme";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="grid size-10 place-items-center rounded-md border border-line text-fgmuted transition-colors hover:border-accent hover:text-accent"
    >
      {theme === "dark" ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-line bg-base/80 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-shell items-center justify-between gap-6 px-5 sm:px-8"
        aria-label="Primary"
      >
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          {site.name}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href.slice(1) ? "true" : undefined}
                className="rounded-md px-3 py-2 text-[0.95rem] text-fgmuted transition-colors hover:text-fg aria-[current=true]:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/cv"
            aria-label="View CV"
            title="View CV"
            className="grid size-10 place-items-center rounded-md border border-line text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <FileText size={18} aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            aria-label="Open command menu"
            className="hidden items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-fgmuted transition-colors hover:border-accent hover:text-fg md:flex"
          >
            <Search size={15} aria-hidden />
            <span className="font-mono text-xs">{isMac ? "⌘ K" : "Ctrl K"}</span>
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md border border-line text-fgmuted lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-b border-line bg-base md:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {[{ label: "Home", href: "#top" }, ...navItems].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-fg transition-colors hover:bg-overlay hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
