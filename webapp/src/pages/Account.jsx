import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatINR } from "../utils/format";

export default function Account() {
  const { user, logout, getOrders } = useAuth();
  const [searchParams] = useSearchParams();
  const orderedId = searchParams.get("ordered");

  return (
    <>
      <div className="page-heading">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / My Account
        </div>
        <h1>My Account</h1>
      </div>
      <section className="section container">
        {!user ? (
          <div className="empty-state">
            <h2>You're not signed in</h2>
            <p>Sign in to view your account and order history.</p>
            <Link className="btn btn-dark" to="/login?redirect=/account">
              Sign In
            </Link>
          </div>
        ) : (
          <div className="account-grid">
            <div className="account-sidebar">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.phone || "Phone not set"}</p>
              <p>{user.address || "Address not set"}</p>
              <button className="btn btn-outline-dark" onClick={logout}>
                Sign Out
              </button>
            </div>
            <div>
              {orderedId && (
                <div className="success-box">
                  Order <strong>{orderedId}</strong> placed successfully! This is a simulated order for demo
                  purposes only.
                </div>
              )}
              <h3>Order History</h3>
              <Orders email={user.email} getOrders={getOrders} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function Orders({ email, getOrders }) {
  const orders = getOrders(email);

  if (orders.length === 0) {
    return (
      <p className="muted">
        No orders yet.{" "}
        <Link to="/products" className="inline-link">
          Start shopping
        </Link>
        .
      </p>
    );
  }

  return (
    <>
      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div className="order-card-head">
            <span>
              Order #{order.id} &middot;{" "}
              {new Date(order.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </span>
            <span className="status-pill">{order.status}</span>
          </div>
          {order.items.map((item, i) => (
            <div className="order-item-row" key={i}>
              <span>
                {item.name} ({item.size}) &times; {item.qty}
              </span>
              <span>{formatINR(item.price * item.qty)}</span>
            </div>
          ))}
          <div className="order-item-row order-total-row">
            <span>Total</span>
            <span>{formatINR(order.total)}</span>
          </div>
        </div>
      ))}
    </>
  );
}
