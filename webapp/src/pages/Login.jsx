import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const [mode, setMode] = useState("login");

  const [loginEmail, setLoginEmail] = useState("demo@nothface.com");
  const [loginPassword, setLoginPassword] = useState("Demo@123");
  const [loginError, setLoginError] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    const result = login(loginEmail.trim(), loginPassword);
    if (!result.ok) {
      setLoginError(result.error);
      return;
    }
    navigate(redirect);
  }

  function handleSignup(e) {
    e.preventDefault();
    const result = signup(signupName.trim(), signupEmail.trim(), signupPassword);
    if (!result.ok) {
      setSignupError(result.error);
      return;
    }
    navigate(redirect);
  }

  return (
    <div className="auth-wrapper">
      {mode === "login" ? (
        <div>
          <h2>Sign In</h2>
          <div className="demo-hint">
            <strong>Dummy demo account</strong>
            <br />
            Email: demo@nothface.com
            <br />
            Password: Demo@123
          </div>
          {loginError && <div className="error-box shown">{loginError}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-dark btn-full">
              Sign In
            </button>
          </form>
          <p className="form-note">
            Don't have an account?{" "}
            <button type="button" className="link-btn" onClick={() => setMode("signup")}>
              Create one
            </button>
          </p>
        </div>
      ) : (
        <div>
          <h2>Create Account</h2>
          {signupError && <div className="error-box shown">{signupError}</div>}
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" required value={signupName} onChange={(e) => setSignupName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                required
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                minLength={4}
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-dark btn-full">
              Create Account
            </button>
          </form>
          <p className="form-note">
            Already have an account?{" "}
            <button type="button" className="link-btn" onClick={() => setMode("login")}>
              Sign in
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
