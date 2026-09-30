import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, FileText, Github, Mail, Search } from "lucide-react";
import { site } from "@/config/site";

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: "section" | "github" | "mail";
  run: () => void;
}

const sectionCommands: Command[] = [
  {
    id: "about",
    label: "Go to About",
    hint: "section",
    icon: "section",
    run: () => scrollTo("#about"),
  },
  {
    id: "services",
    label: "Go to Services",
    hint: "section",
    icon: "section",
    run: () => scrollTo("#services"),
  },
  {
    id: "projects",
    label: "Go to Projects",
    hint: "section",
    icon: "section",
    run: () => scrollTo("#projects"),
  },
  {
    id: "journey",
    label: "Go to Journey",
    hint: "section",
    icon: "section",
    run: () => scrollTo("#journey"),
  },
  {
    id: "skills",
    label: "Go to Skills",
    hint: "section",
    icon: "section",
    run: () => scrollTo("#skills"),
  },
  {
    id: "certificates",
    label: "Go to Certificates",
    hint: "section",
    icon: "section",
    run: () => scrollTo("#certificates"),
  },
  {
    id: "contact",
    label: "Go to Contact",
    hint: "section",
    icon: "section",
    run: () => scrollTo("#contact"),
  },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((v) => !v);
      }
      if (event.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const commands = useMemo<Command[]>(
    () => [
      ...sectionCommands,
      {
        id: "github",
        label: "Open GitHub",
        hint: "external",
        icon: "github",
        run: () => window.open(site.github, "_blank", "noopener noreferrer"),
      },
      {
        id: "email",
        label: "Send an email",
        hint: "external",
        icon: "mail",
        run: () => {
          window.location.href = `mailto:${site.email}`;
        },
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => setActiveIndex(0), [query]);

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = filtered[activeIndex];
      if (command) {
        setOpen(false);
        command.run();
      }
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close command palette"
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-raised shadow-pop"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-fgmuted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                className="w-full bg-transparent py-3.5 text-sm text-fg placeholder:text-fgmuted/60 focus:outline-none"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-fgmuted">
                esc
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2" role="listbox" aria-label="Commands">
              {filtered.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-fgmuted">No matches.</li>
              ) : (
                filtered.map((command, index) => {
                  const Icon =
                    command.icon === "github" ? Github : command.icon === "mail" ? Mail : FileText;
                  return (
                    <li key={command.id} role="option" aria-selected={index === activeIndex}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          command.run();
                        }}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          index === activeIndex ? "bg-overlay text-accent" : "text-fg"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden />
                        <span className="flex-1">{command.label}</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-fgmuted">
                          {command.hint}
                        </span>
                        {index === activeIndex ? (
                          <ArrowDown className="h-3 w-3 -rotate-90" aria-hidden />
                        ) : null}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
            <p className="border-t border-line px-4 py-2.5 font-mono text-[10px] text-fgmuted">
              ↑↓ navigate · ↵ select · ctrl/⌘ K toggle
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
