import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UsersContext";

const Login = () => {
  let {allUsers, setAlUsers, currentUser} = useContext(UserContext)

  if (currentUser) {
    return <Navigate to={"/"}/>
  }


  let [form, setForm] = useState({
    email: "",
    password: ""
  });

  let handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  let loginHandler = (e) => {
    e.preventDefault();


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
