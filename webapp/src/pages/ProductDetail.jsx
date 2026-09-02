import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS, getProduct } from "../data/products";
import { formatINR, stars } from "../utils/format";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="section container">
        <div className="empty-state">
          <h2>Product not found</h2>
          <Link className="btn btn-dark" to="/products">
            Back to shop
          </Link>
        </div>
      </section>
    );
  }

  const off = Math.round(100 - (product.price / product.mrp) * 100);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  function handleAdd() {
    addToCart(product.id, selectedSize, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <>
      <div className="page-heading">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Shop</Link> /{" "}
          <Link to={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link> /{" "}
          {product.name}
        </div>
      </div>
      <section className="section container">
        <div className="product-detail">
          <div className="gallery">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="detail-info">
            <div className="product-cat">{product.category}</div>
            <h1 className="detail-title">{product.name}</h1>
            <div className="product-rating">
              {stars(product.rating)} <span className="muted">({product.rating})</span>
            </div>
            <div className="detail-price">
              {formatINR(product.price)} <span className="price-mrp">{formatINR(product.mrp)}</span>{" "}
              <span className="price-off">{off}% off</span>
            </div>
            <p className="muted">Inclusive of all taxes. Free shipping on orders above &#8377;2,999.</p>

            <div className="option-group">
              <label>Size</label>
              <div className="size-options">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`size-btn ${selectedSize === s ? "selected" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Color</label>
              <div className="muted">{product.colors.join(" / ")}</div>
            </div>

            <div className="qty-row">
              <label className="qty-label">Quantity</label>
              <div className="qty-control">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  &minus;
                </button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))}>
                  +
                </button>
              </div>
            </div>

            <div className="detail-actions">
              <button className="btn btn-dark" onClick={handleAdd}>
                Add to Cart
              </button>
              <button
                type="button"
                className={`btn btn-outline-dark wishlist-toggle ${wishlisted ? "active" : ""}`}
                onClick={() => toggleWishlist(product.id)}
              >
                {wishlisted ? "♥ Wishlisted" : "♡ Add to Wishlist"}
              </button>
            </div>
            {added && <p className="success-box detail-added-msg">Added to cart!</p>}

            <p className="detail-desc">{product.description}</p>
          </div>
        </div>

        <div className="section related-section">
          <div className="section-title">
            <h2>You may also like</h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
