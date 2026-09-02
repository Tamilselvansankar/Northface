import { Link, useSearchParams } from "react-router-dom";
import { CATEGORIES, PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  let list = PRODUCTS;
  if (activeCategory !== "All") {
    list = list.filter((p) => p.category === activeCategory);
  }
  if (query) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  const title = query ? `Search results for "${searchParams.get("q")}"` : activeCategory === "All" ? "Shop All" : activeCategory;

  return (
    <>
      <div className="page-heading">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / Shop
        </div>
        <h1>{title}</h1>
      </div>
      <section className="section container">
        <div className="filters-bar">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              className={`filter-chip ${c === activeCategory ? "active" : ""}`}
              to={c === "All" ? "/products" : `/products?category=${encodeURIComponent(c)}`}
            >
              {c}
            </Link>
          ))}
        </div>
        <div className="product-grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {list.length === 0 && <p className="empty-note">No products match your search.</p>}
      </section>
    </>
  );
}
