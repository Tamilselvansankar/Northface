import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-col">
          <div className="brand">
            NOTH<span>FACE</span>
          </div>
          <p>Gear built for the trail, the summit, and everywhere in between.</p>
          <p className="fine-print">
            Demo project — Nothface is a fictional brand created for this sample e-commerce site. All
            prices are in INR. No real orders, payments, or shipments are made.
          </p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li>
              <Link to="/products?category=Jackets">Jackets</Link>
            </li>
            <li>
              <Link to="/products?category=Hoodies">Hoodies</Link>
            </li>
            <li>
              <Link to="/products?category=T-Shirts">T-Shirts</Link>
            </li>
            <li>
              <Link to="/products?category=Bags">Bags</Link>
            </li>
            <li>
              <Link to="/products?category=Accessories">Accessories</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Account</h4>
          <ul>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li>
              <Link to="/account">My account</Link>
            </li>
            <li>
              <Link to="/wishlist">My wishlist</Link>
            </li>
            <li>
              <Link to="/cart">My cart</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Demo login</h4>
          <p className="fine-print">
            Email: demo@nothface.com
            <br />
            Password: Demo@123
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Nothface. Demo store for portfolio/testing purposes only.
      </div>
    </footer>
  );
}
