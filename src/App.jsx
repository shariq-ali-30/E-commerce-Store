import { useState } from "react";
import "./App.css";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { UsersProvider } from "./context/UsersContext.jsx";
import Cart from "./pages/Cart.jsx";

function App() {
  return (
    <>
      <UsersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="details" element={<ProductDetails />} />
            <Route path="details/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </UsersProvider>
    </>
  );
}

export default App;
