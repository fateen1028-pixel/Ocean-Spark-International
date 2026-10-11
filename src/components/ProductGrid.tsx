import { ArrowRight } from "lucide-react";
import { featuredProduct, secondaryProducts } from "../data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ProductGrid() {
  return (
    <section className="section products" id="products">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Products"
            title="Coconut Shell Charcoal."
            lede="Whole-shell lump charcoal is the core line, supplied in bulk through Chennai. Formed and bulk grades are quoted on request — tell us the form and quantity and we will confirm what can be supplied against that specification."
          />
        </Reveal>

        {featuredProduct ? (
          <div className="products__featured">
            <Reveal>
              <ProductCard product={featuredProduct} />
            </Reveal>
          </div>
        ) : null}

        {secondaryProducts.length > 0 ? (
          <Reveal delay={80}>
            <div className="products__lines">
              <h3 className="products__lines-title">Also quoted on request</h3>
              <ul className="products__lines-list">
                {secondaryProducts.map((product) => (
                  <li className="product-line" key={product.id}>
                    <p className="product-line__head">
                      <span className="product-line__name">{product.name}</span>
                      <span className="product-line__tag">{product.tag}</span>
                    </p>
                    <p className="product-line__desc">{product.summary}</p>
                    <ul className="product-line__apps">
                      {product.applications.map((app) => (
                        <li className="chip" key={app}>
                          {app}
                        </li>
                      ))}
                    </ul>
                    <a className="product-line__link" href="#quote">
                      Request this line
                      <ArrowRight size={13} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}