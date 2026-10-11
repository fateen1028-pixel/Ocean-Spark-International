import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [past, setPast] = useState(false);
  // The footer carries its own "Back to top" link. A fixed floating button
  // sat on top of it, so the control is suppressed once the footer is in view
  // and the two never overlap.
  const [footerSeen, setFooterSeen] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setFooterSeen(entry.isIntersecting),
      { rootMargin: "0px 0px -40% 0px" },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const visible = past && !footerSeen;

  return (
    <button
      type="button"
      className={`to-top${visible ? " is-visible" : ""}`}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp size={17} aria-hidden="true" />
    </button>
  );
}