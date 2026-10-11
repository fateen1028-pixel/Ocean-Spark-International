import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Img from "./Img";

const HERO_POSTER = {
  base: "/img/hero-charcoal",
  widths: [800, 1600],
  // Decorative: the copy and the page description carry the meaning.
  alt: "",
  aspect: "16/9",
  sizes: "100vw",
};

const VIDEO_POSTER = "/img/hero-charcoal-poster.webp";

/**
 * Three encodings of one 12s clip, cut from Mixkit #6969 (glowing charcoal
 * under flame) under the Mixkit Free Licence — commercial use, no attribution.
 *
 *   lo   1280×720   CRF 32   3.0 MB   baseline profile
 *   mid  1280×720   CRF 28   3.9 MB
 *   hi   1920×1080  CRF 27   7.1 MB
 *
 * lo and mid are both the source's native 720p and differ only in bitrate —
 * an earlier 480p "lo" looked soft because it had to be stretched back up,
 * which is exactly the artefact we are trying to avoid. Bandwidth is saved
 * with CRF, not with resolution. hi is an upscale of the 720p source, done
 * with lanczos plus a light unsharp so large displays get a file matching
 * their pixel grid instead of the browser's bilinear stretch; it carries no
 * detail the source did not have.
 */
const TIERS = ["lo", "mid", "hi"] as const;
type Tier = (typeof TIERS)[number];

const videoSrc = (tier: Tier) => `/video/hero-charcoal-${tier}.mp4`;

/** Chromium-only Network Information API; absent everywhere else. */
type NetInfo = {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

const connection = (): NetInfo | undefined =>
  (navigator as Navigator & { connection?: NetInfo }).connection;

/**
 * Pick a starting tier from what the browser will admit about the network.
 *
 * The awkward case is a missing API, which is not the rarity it looks like:
 * iOS Safari, Firefox and most Android browsers never expose
 * navigator.connection at all, so "unknown" is the *normal* reading on a phone
 * and a default of mid silently bills every phone visitor 3.9 MB. Phones
 * therefore start at lo; both lo and mid are 720p, so the ceiling cost of
 * being wrong is the quality gap between CRF 32 and CRF 28, not resolution.
 */
function pickTier(): Tier {
  const net = connection();
  if (!net) return matchMedia("(max-width: 719px)").matches ? "lo" : "mid";
  if (net.saveData) return "lo";
  if (net.effectiveType === "slow-2g" || net.effectiveType === "2g") return "lo";
  if (net.effectiveType === "3g") return "mid";
  return (net.downlink ?? 0) >= 8 ? "hi" : "mid";
}

/**
 * The hero clip plays on its own and loops, for as long as anyone is looking
 * at the hero. It is never driven by scroll: scrubbing made the background
 * stutter against the scrollbar and broke the loop.
 *
 * Decoding stops when the hero leaves the viewport or the tab is hidden —
 * a background video nobody can see is pure battery.
 *
 * The source is attached after mount, so the poster is always the first paint
 * and a slow connection costs the visitor nothing until it has decided which
 * rendition it can afford.
 */
export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Match the stylesheet's rule: never move the frame for someone who asked
  // for stillness. They get the poster photograph and nothing else.
  const [still, setStill] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setStill(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Land the entrance on the frame after mount, so the copy is on screen
  // before it animates rather than animating into existence.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready || still) return;

    let tier = pickTier();
    let onScreen = true;

    // The one rule: play while the hero is on screen and the tab is in front,
    // otherwise stop. Everything else routes through this.
    const play = () => {
      if (onScreen && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };

    const load = (next: Tier) => {
      const at = video.currentTime;
      video.src = videoSrc(next);
      video.load();
      // Keep the playhead across the swap so stepping down mid-view does not
      // visibly restart the clip.
      video.addEventListener(
        "loadeddata",
        () => {
          if (at > 0 && Number.isFinite(video.duration)) video.currentTime = at;
        },
        { once: true },
      );
    };

    // Step down — never up — when the network reports a change, or when the
    // clip has still produced no frame after 4 seconds.
    const downgrade = () => {
      const next = TIERS[TIERS.indexOf(tier) - 1];
      if (!next) return;
      tier = next;
      load(tier);
      play();
    };

    load(tier);
    play();

    const bail = setTimeout(() => {
      if (video.readyState < 2) downgrade();
    }, 4000);

    const net = connection();
    net?.addEventListener?.("change", downgrade);
    document.addEventListener("visibilitychange", play);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        play();
      },
      { threshold: 0.05 },
    );
    io.observe(video);

    return () => {
      clearTimeout(bail);
      net?.removeEventListener?.("change", downgrade);
      document.removeEventListener("visibilitychange", play);
      io.disconnect();
    };
  }, [ready, still]);

  return (
    <section className="hero" id="top">
      {still ? (
        <Img {...HERO_POSTER} className="hero__bg" priority />
      ) : (
        <video
          ref={videoRef}
          className="hero__bg"
          poster={VIDEO_POSTER}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      <div className="container hero__inner">
        {/* `is-ready` only lands after paint, so the entrance never plays
            before the copy is on screen. */}
        <div className={`hero__copy${ready && !still ? " is-ready" : ""}`}>
          <p className="eyebrow">Coconut Shell Charcoal Import &amp; Trade</p>

          <h1 className="hero__title">
            Thailand to Chennai, <em>as one managed supply chain.</em>
          </h1>

          <p className="hero__lead">
            We source coconut shell charcoal from southern Thailand, land it at Chennai
            and supply it in bulk to distributors, wholesalers and industrial buyers.
          </p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#quote">
              Request a Quote
              <ArrowRight size={16} className="btn__icon" aria-hidden="true" />
            </a>
            <a className="btn btn--on-dark" href="#products">
              Explore Our Products
            </a>
          </div>

          <p className="hero__meta">Thailand Origin · Chennai Clearance · Bulk Supply</p>
        </div>
      </div>
    </section>
  );
}
