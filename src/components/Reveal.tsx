import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger in milliseconds — keep under ~240ms so content is never gated. */
  delay?: number;
  className?: string;
};

/**
 * Scroll-triggered reveal. Content is in the DOM and readable by assistive
 * tech from the start; only opacity and transform animate.
 *
 * Reduced motion needs no branch here — the stylesheet already forces
 * `.reveal` visible under `prefers-reduced-motion: reduce`.
 */
export default function Reveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      className={["reveal", shown ? "is-visible" : "", className ?? ""].filter(Boolean).join(" ")}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}