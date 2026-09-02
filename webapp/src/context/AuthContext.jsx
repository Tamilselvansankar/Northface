import { createContext, useContext, useState } from "react";

// Dummy authentication for demo purposes only. No real backend/security.
const DEMO_ACCOUNT = {
  name: "Demo User",
  email: "demo@nothface.com",
  password: "Demo@123",
  address: "221B Trail View Road, Manali, Himachal Pradesh, 175131",
  phone: "+91 98765 43210"
};

const USERS_KEY = "nf_users";
const SESSION_KEY = "nf_session";

function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  const users = raw ? JSON.parse(raw) : {};
  if (!users[DEMO_ACCOUNT.email]) users[DEMO_ACCOUNT.email] = DEMO_ACCOUNT;
  return users;
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function ordersKey(email) {
  return `nf_orders_${email}`;
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    return loadUsers()[email] || null;
  });

  function login(email, password) {
    const users = loadUsers();
    const account = users[email.toLowerCase()];
    if (!account || account.password !== password) {
      return { ok: false, error: "Invalid email or password." };
    }
    localStorage.setItem(SESSION_KEY, account.email);
    setUser(account);
    return { ok: true };
  }

  function signup(name, email, password) {
    const users = loadUsers();
    const key = email.toLowerCase();
    if (users[key]) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const account = { name, email: key, password, address: "", phone: "" };
    users[key] = account;
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, key);
    setUser(account);
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  function updateProfile(patch) {
    if (!user) return;
    const users = loadUsers();
    users[user.email] = { ...users[user.email], ...patch };
    saveUsers(users);
    setUser(users[user.email]);
  }

  function getOrders(email) {
    const raw = localStorage.getItem(ordersKey(email));
    return raw ? JSON.parse(raw) : [];
  }

  function addOrder(email, order) {
    const orders = getOrders(email);
    orders.unshift(order);
    localStorage.setItem(ordersKey(email), JSON.stringify(orders));
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateProfile, getOrders, addOrder, DEMO_ACCOUNT }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
