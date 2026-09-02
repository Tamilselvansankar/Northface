import { Link, useNavigate } from "react-router-dom";
import { getProduct } from "../data/products";
import { formatINR } from "../utils/format";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart, subtotal } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();

  const shipping = cart.length === 0 ? 0 : subtotal >= 2999 ? 0 : 99;
  const total = subtotal + shipping;

  function handleCheckout() {
    if (!user) {
      navigate("/login?redirect=/cart&checkout=1");
      return;
    }
    const order = {
      id: "NF" + Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      items: cart.map((item) => {
        const p = getProduct(item.id);
        return { id: item.id, name: p.name, size: item.size, qty: item.qty, price: p.price, image: p.image };
      }),
      subtotal,
      shipping,
      total,
      status: "Confirmed"
    };
    addOrder(user.email, order);
    clearCart();
    navigate(`/account?ordered=${order.id}`);
  }

  if (cart.length === 0) {
    return (
      <>
        <div className="page-heading">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / Cart
          </div>
          <h1>Your Cart</h1>
        </div>
        <section className="section container">
          <div className="empty-state">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Link className="btn btn-dark" to="/products">
              Continue Shopping
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="page-heading">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / Cart
        </div>
        <h1>Your Cart</h1>
      </div>
      <section className="section container">
        <div className="cart-layout">
          <div>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const p = getProduct(item.id);
                  if (!p) return null;
                  return (
                    <tr key={`${item.id}-${item.size}`}>
                      <td>
                        <div className="cart-item-info">
                          <img src={p.image} alt={p.name} />
                          <div>
                            <div className="cart-item-name">{p.name}</div>
                            <div className="muted small">Size: {item.size}</div>
                            <button
                              type="button"
                              className="remove-link"
                              onClick={() => removeFromCart(item.id, item.size)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{formatINR(p.price)}</td>
                      <td>
                        <div className="qty-control cart-qty">
                          <button type="button" onClick={() => updateQty(item.id, item.size, item.qty - 1)}>
                            &minus;
                          </button>
                          <span>{item.qty}</span>
                          <button type="button" onClick={() => updateQty(item.id, item.size, item.qty + 1)}>
                            +
                          </button>
                        </div>
                      </td>
                      <td className="cart-line-total">{formatINR(p.price * item.qty)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="row">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
            </div>
            <div className="row total-row">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
            <button className="btn btn-accent btn-full" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <p className="form-note">This is a demo store. Checkout simulates an order — no real payment is taken.</p>
          </div>
        </div>
      </section>
    </>
  );
}
