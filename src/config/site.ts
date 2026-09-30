/**
 * Central site configuration.
 * Change your contact email, social links and domain HERE — nowhere else.
 * VITE_CONTACT_EMAIL (see .env.example) overrides `email` at build time.
 */
export const site = {
  name: "Mohamed Mostafa",
  role: "Full-Stack Engineer",
  tagline: "Product Builder",
  email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? "momostafa8316@gmail.com",
  github: "https://github.com/Mohamedmostafa110",
  linkedin: "https://www.linkedin.com/in/mohamed-mostafa00/",
  // TODO: replace with your real domain (used for canonical + OG tags in index.html).
  domain: "https://mohamedmostafa.dev",
  location: "Egypt — open to remote work",
  availability: "Available for freelance & collaboration",
};
