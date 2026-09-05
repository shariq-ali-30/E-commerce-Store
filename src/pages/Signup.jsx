import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UsersContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const Signup = () => {
  let { currentUser, setCurrentUser } = useContext(UserContext);

  let [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  let [error, setError] = useState({
    message: "",
    show: false,
  });

  let [loading, setLoading] = useState(false);

  if (currentUser) {
    return <Navigate to={"/"} />;
  }

  let handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  let signupHandler = async (e) => {
    e.preventDefault();
    setError((prev) => ({ ...prev, show: false }));
    setLoading(true);

    try {
      let { user } = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password.trim(),
      );

      setCurrentUser(user.uid);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        showError("An account with this email already exists.");
      } else if (error.code === "auth/weak-password") {
        showError("Password must be at least 6 characters long.");
      } else {
        showError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  let showError = (msg) => {
    setError({ message: msg, show: true });

    setTimeout(() => {
      setError({ message: "", show: false });
    }, 5000);
  };

  return (
    <>
      <div className="container signup-page">
        <div className="signup-container">
          <div className="signup-header">
            <h1 className="section-title">
              Create Account<span></span>
            </h1>
          </div>

          <p className={`error-msg ${error.show ? "active" : ""}`}>
            {error.message}
          </p>

          <form className="signup-form" onSubmit={signupHandler}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                onChange={handleChange}
                value={form.name}
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                onChange={handleChange}
                value={form.email}
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                onChange={handleChange}
                value={form.password}
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="signup-submit-btn">
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className="signup-footer">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
        {loading && <div className="loading-screen"></div>}
      </div>
    </>
  );
};

export default Signup;
