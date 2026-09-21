import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UsersContext";
import { auth } from "../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    message: "",
    show: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const showError = (msg) => {
    setError({
      message: msg,
      show: true,
    });

    setTimeout(() => {
      setError({
        message: "",
        show: false,
      });
    }, 5000);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );

      setCurrentUser(user.uid);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        showError("No account found with this email.");
      } else if (error.code === "auth/invalid-credential") {
        showError("Email or password is incorrect.");
      } else if (error.code === "auth/user-disabled") {
        showError("This account has been disabled.");
      } else if (error.code === "auth/too-many-requests") {
        showError("Too many login attempts. Please try again later.");
      } else {
        showError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="section-title">
            Welcome Back<span></span>
          </h1>

          <p className="login-subtitle">Log in to continue to your account</p>
        </div>

        <form className="login-form" onSubmit={loginHandler}>
          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              onChange={handleChange}
              value={form.email}
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <div className="password-input">
              <input
                id="password"
                onChange={handleChange}
                value={form.password}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i
                  className={showPassword ? "ph ph-eye-slash" : "ph ph-eye"}
                ></i>
              </button>
            </div>
          </div>

          <div className={`error-msg ${error.show ? "active" : ""}`}>
              <i className="ph ph-warning-circle error-icon"></i>
              <span>{error.message}</span>
            </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>

      {loading && (
        <div className="loading-screen">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};

export default Login;
