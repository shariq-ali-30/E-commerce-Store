import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UsersContext";

const Signup = () => {
  let { allUsers, setAllUsers, currentUser, setCurrentUser } =
    useContext(UserContext);

  let [form, setForm] = useState({
    name: "",
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

  let signupHandler = (e) => {
    e.preventDefault();

    if (form.password.trim().length < 8) {
      return showError("Password must be 8 characters long.");
    }

    let userExist = allUsers.find(
      (u) => u.email.toLowerCase().trim() == form.email.toLowerCase().trim(),
    );

    if (userExist) {
      return showError("An account with this email already exists.");
    }

    let newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    setAllUsers((prev) => [...prev, newUser]);

    setCurrentUser(newUser);
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
              Sign Up
            </button>
          </form>

          <div className="signup-footer">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
