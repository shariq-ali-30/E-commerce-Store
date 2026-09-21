import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UsersContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";

const Signup = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [form, setForm] = useState({
    name: "",
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

  const signupHandler = async (e) => {
    e.preventDefault();

    setError({
      message: "",
      show: false,
    });

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password.trim(),
      );

      await setDoc(doc(db, "users", user.uid), {
        name: form.name.trim(),
        email: form.email.trim(),
        cart: [],
      });

      setCurrentUser(user.uid);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        showError("An account with this email already exists.");
      } else if (error.code === "auth/weak-password") {
        showError("Password must be at least 6 characters long.");
      } else if (error.code === "auth/invalid-email") {
        showError("Please enter a valid email address.");
      } else {
        showError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1 className="section-title">
            Create Account<span></span>
          </h1>

          <p className="signup-subtitle">Sign up to create your new account</p>
        </div>

        <form className="signup-form" onSubmit={signupHandler}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              onChange={handleChange}
              value={form.name}
              type="text"
              name="name"
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>

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
                placeholder="Create a password"
                autoComplete="new-password"
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

          <button
            type="submit"
            className="signup-submit-btn"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
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

export default Signup;
