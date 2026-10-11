type Props = { className?: string };

/**
 * Brand mark: the Ocean Spark flame-over-wave logo. Decorative — the company
 * name sits beside it as text, so it carries no alt of its own.
 */
export default function BrandMark({ className }: Props) {
  return (
    <img
      className={className}
      src="/img/logo.png"
      alt=""
      width={207}
      height={256}
      decoding="async"
    />
  );
}
