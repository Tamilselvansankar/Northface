import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Header() {
  const { user } = useAuth();
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(query)}`);
  }

  return (
    <header>
      <div className="topbar">
        Free shipping on orders above &#8377;2,999 &middot; This is a demo store — no real payments are
        processed
      </div>
      <nav className="navbar">
        <Link className="brand" to="/">
          NOTH<span>FACE</span>
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">Shop All</NavLink>
          </li>
          <li>
            <Link to="/products?category=Jackets">Jackets</Link>
          </li>
          <li>
            <Link to="/products?category=Bags">Bags</Link>
          </li>
          <li>
            <Link to="/products?category=Accessories">Accessories</Link>
          </li>
        </ul>
        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            &#128269;
          </button>
        </form>
        <div className="nav-icons">
          <Link className="account-link" to={user ? "/account" : "/login"}>
            &#128100; {user ? user.name.split(" ")[0] : "Sign in"}
          </Link>
          <Link className="wishlist-link" to="/wishlist">
            &#9825; Wishlist <span className="nf-count">{wishCount}</span>
          </Link>
          <Link className="cart-link" to="/cart">
            &#128722; Cart <span className="nf-count">{count}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
