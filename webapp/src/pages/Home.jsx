import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

const CATEGORY_TILES = [
  { name: "Jackets", seed: "nf-cat-jackets" },
  { name: "Hoodies", seed: "nf-cat-hoodies" },
  { name: "T-Shirts", seed: "nf-cat-tshirts" },
  { name: "Bags", seed: "nf-cat-bags" },
  { name: "Accessories", seed: "nf-cat-acc" }
];

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.badge === "Bestseller")
    .concat(PRODUCTS.filter((p) => p.badge !== "Bestseller"))
    .slice(0, 8);

  return (
    <>
      <section className="hero">
        <h1>
          Built for the Mountains.
          <br />
          Worn on the Street.
        </h1>
        <p>
          Jackets, hoodies and accessories engineered for the outdoors — priced in INR, delivered
          anywhere in India.
        </p>
        <Link className="btn btn-accent" to="/products">
          Shop the Collection
        </Link>
        <Link className="btn btn-outline" to="/products?category=Jackets" style={{ marginLeft: 12 }}>
          Explore Jackets
        </Link>
      </section>

      <section className="section container">
        <div className="section-title">
          <h2>Shop by Category</h2>
        </div>
        <div className="category-strip">
          {CATEGORY_TILES.map((c) => (
            <Link className="category-card" key={c.name} to={`/products?category=${c.name}`}>
              <img src={`https://picsum.photos/seed/${c.seed}/400/300`} alt={c.name} />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <h2>Bestsellers</h2>
          <Link to="/products">View all &rarr;</Link>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
