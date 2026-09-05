import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UsersContext";

const Login = () => {
  let { allUsers, currentUser, setCurrentUser } = useContext(UserContext);

  let [form, setForm] = useState({
    email: "",
    password: "",
  });

  let [error, setError] = useState({
    message: "",
    show: false,
  });

  if (currentUser) {
    return <Navigate to={"/"} />;
  }

  let handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  let loginHandler = (e) => {
    e.preventDefault();

    let user = allUsers.find(
      (u) =>
        u.email.toLowerCase().trim() == form.email.toLowerCase().trim() &&
        u.password.trim() == form.password.trim(),
    );

    if (user) {
      setCurrentUser(user);
    } else {
      return showError("Invalid email or password.")
    }
  };

  let errorTimeOut;
  let showError = (msg) => {
    clearTimeout(errorTimeOut);
    setError({ message: msg, show: true });

    errorTimeOut = setTimeout(() => {
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
            {error.message}
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
              Log In
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
