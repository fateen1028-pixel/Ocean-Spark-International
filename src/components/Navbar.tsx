import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { company, navigation } from "../data/company";
import BrandMark from "./BrandMark";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [past, setPast] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Transparent only at the very top of the page. The moment the visitor
  // starts scrolling the bar takes its solid background, so the links stay
  // legible over whatever is passing underneath. A few pixels of tolerance
  // keeps trackpad jitter and rubber-band overscroll from flickering it.
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock background scroll and close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("is-locked");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.body.classList.remove("is-locked");
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // A resize past the desktop breakpoint must not leave the drawer orphaned.
  // The 1120px here must stay in step with the .nav__links breakpoint in
  // components.css — below it the links do not fit on one line.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1120px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className={`header${past ? " is-past" : ""}`}>
      <div className="header__inner">
        <a className="brand" href="#top">
          <BrandMark className="brand__mark" />
          <span className="brand__text">
            <span className="brand__name">{company.name}</span>
            <span className="brand__sub">Charcoal &amp; Trade</span>
          </span>
        </a>

        <nav aria-label="Primary">
          <ul className="nav__links">
            {navigation.map((item) => (
              <li key={item.href}>
                <a className="nav__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a className="btn btn--primary btn--small" href="#quote">
            Request a Quote
            <ArrowRight size={15} className="btn__icon" aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav__toggle-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div className="nav__drawer" id="mobile-nav" hidden={!open}>
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="btn btn--primary" href="#quote" onClick={() => setOpen(false)}>
          Request a Quote
          <ArrowRight size={16} className="btn__icon" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}