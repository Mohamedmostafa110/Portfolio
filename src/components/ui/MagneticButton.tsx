import { useRef, type MouseEvent, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** 0..1 — how strongly the element follows the cursor */
  strength?: number;
}

/**
 * Lightweight magnetic effect — no library, one transform on hover.
 * Wraps real <a>/<button> elements; on touch devices it is inert.
 */
export function MagneticButton({ children, className, strength = 0.22 }: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (event: MouseEvent<HTMLSpanElement>) => {
    if (!ref.current || window.matchMedia("(hover: none)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${
        className ?? ""
      }`}
    >
      {children}
    </span>
  );
}
