import { Link } from "react-router-dom";
import { formatINR, stars } from "../utils/format";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const off = Math.round(100 - (product.price / product.mrp) * 100);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-thumb-link">
        <div className="product-thumb">
          {product.badge && <span className="badge">{product.badge}</span>}
          <button
            type="button"
            className={`wishlist-btn ${wishlisted ? "active" : ""}`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
          >
            {wishlisted ? "♥" : "♡"}
          </button>
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>
        <div className="product-info">
          <div className="product-cat">{product.category}</div>
          <div className="product-name">{product.name}</div>
          <div className="product-rating">
            {stars(product.rating)} <span className="muted">({product.rating})</span>
          </div>
          <div className="product-price">
            <span className="price-now">{formatINR(product.price)}</span>
            <span className="price-mrp">{formatINR(product.mrp)}</span>
            <span className="price-off">{off}% off</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
