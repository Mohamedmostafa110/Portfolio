# Mohamed Mostafa — Personal Portfolio

A production-oriented, data-driven personal portfolio for **Mohamed Mostafa — Full-Stack Engineer & Product Builder**.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide**.

---

## Quick start

```bash
npm install
npm run dev        # local development
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
npm run lint       # ESLint
npm run format     # Prettier
```

Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages…).

---

## 1. Architecture

```
src/
├── config/
│   └── site.ts            # ← your name, email, socials, domain (change ONCE, here)
├── data/
│   └── portfolio.ts       # ← ALL content: projects, services, skills, journey, certificates
├── hooks/
│   └── useTheme.ts        # theme state + persistence (no-flash predecided in index.html)
├── lib/
│   └── analytics.ts       # optional privacy-conscious tracking (no-op unless configured)
├── components/
│   ├── ui/                # Reveal, MagneticButton, SectionHeading, ProjectImage primitives
│   ├── Navbar.tsx  Hero.tsx  About.tsx  Services.tsx  Projects.tsx
│   ├── Journey.tsx Certificates.tsx Skills.tsx Contact.tsx Footer.tsx
│   ├── ThemeToggle.tsx    CommandPalette.tsx (Ctrl/⌘ + K)
│   └── App.tsx / main.tsx / index.css (design tokens)
public/
├── images/projects/       # ← drop project screenshots here
└── images/certificates/   # ← drop certificate scans here
```

Design tokens live in `src/index.css` (`:root` = light, `.dark` = dark) and are mapped to
Tailwind utilities in `tailwind.config.js`. Change the palette in **one** place.

## 2. Data-entry system (the important part)

**Every piece of content is a plain typed object in `src/data/portfolio.ts`.**
The UI renders dynamically — adding content never requires touching a component.

### Add a new project
1. Drop 1–2 screenshots into `public/images/projects/` (e.g. `myapp-1.png`).
2. In `portfolio.ts`, add one object to `projects`:
```ts
{
  id: "my-app",                    // unique, url-safe
  title: "My App",
  tagline: "One-line hook.",
  year: 2026,
  category: "Web App",             // "Web App" | "Platform" | "Desktop" | "Embedded"
  description: "Two sentences a business owner understands.",
  image: "/images/projects/myapp-1.png",
  technologies: ["React", "TypeScript"],
  liveDemo: "https://…",           // optional — omit or use "#" to hide the link
  github: "https://github.com/…",  // optional
  featured: false,                 // true → large split layout at the top
  caseStudy: {
    problem: "…",
    role: "…",
    architecture: ["…"],
    decisions: ["…"],
    // optional: thinking, challenges, outcome, lessons
  },
}
```
Set `featured: true` to promote it; `id`, `title`, `tagline`, `year`, `category`,
`description`, `technologies`, `caseStudy` are required by the type system.

### Add a new certificate
1. Put the scan in `public/images/certificates/`.
2. Add one object to `certificates`:
```ts
{ title: "React Development", issuer: "ITI", year: "2026",
  image: "/images/certificates/react-iti.png", url: "https://…" /* optional */ }
```

### Add journey / experience
Add one object to `journey`:
```ts
{ period: "2026", title: "…", organization: "…", description: "…", tags: ["…"] }
```
Add skills by appending strings inside the right group in `skillGroups`.
Navigation items live in `navItems`; social links in `socials`.

**Missing screenshots?** A branded placeholder renders automatically — the site never
shows fake images. Fields you don't have yet can be omitted; the case study simply
doesn't render that block.

## 3. Theme system

- Dark is the primary identity (Midnight Navy `#0B132B` + warm gold `#D6C6A8`); light is
  intentionally designed (warm paper `#F7F5F0`), not an inversion.
- First paint is decided by an inline script in `index.html` reading `localStorage` /
  `prefers-color-scheme` — **no flash**.
- Toggle = top-right button. Palette: edit CSS variables in `src/index.css`.

## 4. Animation system

- Framer Motion, used sparingly: scroll reveals (`Reveal`), hero word reveal, fast modal/menu
  transitions, one magnetic hover effect (pure CSS transform, no library).
- Everything respects `prefers-reduced-motion` (content renders fully without motion).
- No 3D, no WebGL, no particle systems. Hero backdrop is pure CSS (grid + radial glow).

## 5. Contact form & email automation (FormSubmit)

The form posts via FormSubmit's **AJAX endpoint** (`https://formsubmit.co/ajax/<email>`), so the
visitor stays on the site with inline success/error feedback — no ugly redirect.

**To activate:**
1. Set your receiving address once, either in `src/config/site.ts` (`email`) or via
   `VITE_CONTACT_EMAIL` in `.env` (see `.env.example`).
2. Deploy, submit the form once. FormSubmit emails you a **one-time activation link** —
   click it. Until activation, submissions are held.

**Validation / UX:** required fields + native email validation, disabled + spinner while
sending, `aria-live` success/error messages, keyboard accessible.

**Honest limitations of FormSubmit (free tier):**
- Requires that one-time activation per address.
- Free submissions per month are capped (~250); the AJAX endpoint can be rate-limited under
  abuse — always keep the direct `mailto:` fallback visible (it is, next to the form).
- `_captcha: "false"` only applies after activation.
- If FormSubmit is ever down, the error state tells visitors to email you directly.
- Nothing secret lives in the frontend — no keys, no SMTP.

## 6. Environment variables

| Variable             | Purpose                                             |
|----------------------|-----------------------------------------------------|
| `VITE_CONTACT_EMAIL` | Overrides the contact-form receiving email          |
| `VITE_ANALYTICS_URL` | Optional self-hosted analytics ingest (else no-op)  |

## 7. Deployment (Vercel example)

1. Push the repo to GitHub.
2. Vercel → Import → Framework: **Vite** → Build: `npm run build` → Output: `dist`.
3. Add env vars in project settings if used.
4. After going live: replace the domain in `index.html` (canonical + OG) and `src/config/site.ts`,
   then generate a real `og-image.png` (1200×630) and enable the sitemap line in `robots.txt`.

## 8. Performance / Accessibility / SEO checklist

- [ ] `npm run build` passes (strict TypeScript)
- [ ] Lighthouse ≥ 90 where achievable (images lazy-loaded, manualChunks split, ~zero layout shift)
- [ ] Add real screenshots (`public/images/projects/`) + a real `og-image.png`
- [ ] Replace placeholder GitHub/LinkedIn/demo links in `src/data/portfolio.ts` & `config/site.ts`
- [ ] Test contact form end-to-end (activation email → submit → inbox shows name/email/message)
- [ ] Keyboard-only pass: nav, modal (Esc), palette (Ctrl/⌘+K), form
- [ ] Contrast verified in both themes; reduced-motion verified
- [ ] Mobile pass: menu, hero, project grid, form

## 9. Things that need YOUR real assets (nothing was invented)

1. Real project screenshots → `public/images/projects/`
2. Real certificate scans → `public/images/certificates/`
3. Real GitHub / LinkedIn / Live Demo URLs (`#` placeholders currently hidden)
4. Receiving email in `src/config/site.ts` (+ FormSubmit activation)
5. Real domain in `index.html` + `robots.txt` + an `og-image.png`
6. Case-study fields marked *placeholder* in `portfolio.ts` (thinking, challenges, lessons)
