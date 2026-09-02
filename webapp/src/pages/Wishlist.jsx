import { Link } from "react-router-dom";
import { getProduct } from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const products = wishlist.map(getProduct).filter(Boolean);

  return (
    <>
      <div className="page-heading">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / Wishlist
        </div>
        <h1>My Wishlist</h1>
      </div>
      <section className="section container">
        {products.length === 0 ? (
          <div className="empty-state">
            <h2>Your wishlist is empty</h2>
            <p>Tap the heart on any product to save it here for later.</p>
            <Link className="btn btn-dark" to="/products">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
