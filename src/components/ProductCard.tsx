import { ArrowRight, FileText } from "lucide-react";
import type { Product } from "../data/products";
import Img from "./Img";

/** Only rows with a real value are rendered — never a placeholder number. */
function specRows(p: Product) {
  const rows: { label: string; value: string | null }[] = [
    { label: "Form", value: p.form },
    { label: "Grade", value: p.grade },
    { label: "Moisture", value: p.specs.moisture },
    { label: "Ash content", value: p.specs.ash },
    { label: "Fixed carbon", value: p.specs.fixedCarbon },
    { label: "Volatile matter", value: p.specs.volatileMatter },
    { label: "Packaging", value: p.packaging },
    { label: "Minimum order", value: p.moq },
  ];
  return rows.filter((r) => r.value);
}

export default function ProductCard({ product }: { product: Product }) {
  const rows = specRows(product);
  const image = product.image;

  return (
    <article className="product-card">
      {image ? (
        <div className="product-card__media">
          <Img {...image} />
          <span className="product-card__tag">{product.tag}</span>
        </div>
      ) : null}

      <div className="product-card__body">
        <div className="product-card__main">
          <h3>{product.name}</h3>
          <p className="product-card__desc">{product.summary}</p>

          <ul className="product-card__apps" aria-label="Typical applications">
            {product.applications.map((app) => (
              <li className="chip" key={app}>
                {app}
              </li>
            ))}
          </ul>
        </div>

        <div className="product-card__detail">
          <div className="spec">
            <h4 className="spec__title">Specification</h4>
            {rows.length > 0 ? (
              <dl className="spec__rows">
                {rows.map((row) => (
                  <div className="spec__row" key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="spec__fallback">
                Moisture, ash, fixed carbon and volatile matter are confirmed per grade and issued
                with the quotation rather than published as a general range.
              </p>
            )}
          </div>

          <div className="product-card__actions">
            <a className="btn btn--ghost btn--small" href="#quote">
              Request Specifications
              <ArrowRight size={14} className="btn__icon" aria-hidden="true" />
            </a>
            {product.datasheet ? (
              <a className="btn btn--ghost btn--small" href={product.datasheet}>
                <FileText size={14} aria-hidden="true" />
                Datasheet
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}