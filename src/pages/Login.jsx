import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UsersContext";
import { auth } from "../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  let { currentUser, setCurrentUser } = useContext(UserContext);

  let [form, setForm] = useState({
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

  let loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let { user } = await signInWithEmailAndPassword(
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

  let showError = (msg) => {
    setError({ message: msg, show: true });

    setTimeout(() => {
      setError({ message: "", show: false });
    }, 5000);
  };

  return (
    <>
      <div className="container login-page">
        <div className="login-container">
          <div className="login-header">
            <h1 className="section-title">
              Welcome Back<span></span>
            </h1>
          </div>

          <p className={`error-msg ${error.show ? "active" : ""}`}>
            {error.message ? error.message : "Message"}
          </p>

          <form className="login-form" onSubmit={loginHandler}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                value={form.password}
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="login-submit-btn">
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
    </>
  );
};

export default Login;
