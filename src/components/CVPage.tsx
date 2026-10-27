import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

const cvUrl = "/Mohamed-Mostafa_CV.pdf";

export function CVPage() {
  return (
    <main className="min-h-screen bg-base px-5 sm:px-8">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 border-b border-line py-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-fg transition-colors hover:text-accent"
        >
          <ArrowLeft size={18} aria-hidden />
          Back
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-fgmuted">
          Curriculum Vitae
        </p>
      </header>

      <section className="mx-auto max-w-5xl py-6" aria-label="Curriculum Vitae">
        <iframe
          src={`${cvUrl}#view=FitH`}
          title="Mohamed Mostafa CV"
          className="h-[calc(100vh-180px)] min-h-[560px] w-full rounded-md border border-line bg-white"
        >
          <p className="p-6 text-center text-fgmuted">
            Your browser cannot display this PDF. <a href={cvUrl}>Open the CV</a> instead.
          </p>
        </iframe>

        <div className="flex justify-center py-8">
          <a
            href={cvUrl}
            download="Mohamed-Mostafa_CV.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-accentdeep"
          >
            <Download size={17} aria-hidden />
            Download CV
          </a>
        </div>
      </section>
    </main>
  );
}
