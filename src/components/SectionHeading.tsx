import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
  /** Heading level, so each section keeps a correct document outline. */
  as?: "h2" | "h3";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  children,
  as = "h2",
  className,
}: Props) {
  const Heading = as;
  return (
    <div className={["heading-block", className ?? ""].filter(Boolean).join(" ")}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading>{title}</Heading>
      {lede ? <p className="lead">{lede}</p> : null}
      {children}
    </div>
  );
}