import { useState } from "react";
import { ImageOff } from "lucide-react";

interface ProjectImageProps {
  src?: string;
  title: string;
  hint?: string;
  className?: string;
}

/**
 * Renders the project screenshot if the file exists in /public,
 * otherwise a branded placeholder — never a fake screenshot.
 */
export function ProjectImage({ src, title, hint, className }: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${title} — screenshot placeholder`}
        className={`flex flex-col items-center justify-center gap-3 bg-navy-800 bg-grid ${
          className ?? ""
        }`}
      >
        <ImageOff className="h-7 w-7 text-gold/70" aria-hidden />
        <p className="px-6 text-center font-mono text-xs text-mist/70">{title}</p>
        <p className="px-6 text-center font-mono text-[10px] tracking-wide text-mist/40">
          {hint ?? `add screenshot → public${src ?? "/images/projects/"}`}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${title} — project screenshot`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
