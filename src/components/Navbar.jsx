import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { useContext, useState } from "react";
import { UserContext } from "../context/UsersContext";

const Navbar = () => {
  let navigate = useNavigate();
  let { currentUser, setCurrentUser } = useContext(UserContext);
  let [isModalOpen, setIsModalOpen] = useState(false);

  let activeLinkHandler = (clickedLink) => {
    let links = document.querySelectorAll(".nav-links a");

    links.forEach((link) => link.classList.remove("active"));
    clickedLink.classList.add("active");
  };

  let openMenu = () =>
    document.querySelector(".overlay").classList.add("active");

  let closeMenu = () =>
    document.querySelector(".overlay").classList.remove("active");

  let handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  let goToCart = () => {
    if (!currentUser) {
      return setIsModalOpen(true)
    }

    navigate("/cart");
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>

          <div className="menu">
            <i className="ph ph-list" onClick={openMenu}></i>

            <div className="overlay">
              <div className="nav-links">
                <i className="ph-bold ph-x" onClick={closeMenu}></i>
                <a
                  href="#"
                  className="active"
                  onClick={(e) => activeLinkHandler(e.target)}
                >
                  Home <span></span>
                </a>

                <a href="#men" onClick={(e) => activeLinkHandler(e.target)}>
                  Men <span></span>
                </a>

                <a href="#women" onClick={(e) => activeLinkHandler(e.target)}>
                  Women <span></span>
                </a>

                <a href="#contact" onClick={(e) => activeLinkHandler(e.target)}>
                  Contact <span></span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="btns">
            {!currentUser ? (
              <>
                <Link to={"/login"}>
                  <button className="login-btn">Login</button>
                </Link>
                <Link to={"/signup"}>
                  <button className="signup-btn">Signup</button>
                </Link>
              </>
            ) : (
              <button className="logout-btn" onClick={handleLogout}>
                <i className="ph-bold ph-sign-out"></i>
                Logout
              </button>
            )}
          </div>

          <div className="icons">
            <div className="icon" onClick={goToCart}>
              {currentUser && <span>2</span>}
              <i className="ph ph-shopping-cart"></i>
            </div>
          </div>

          <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </div>
      </div>
    </div>
  );
};

let Modal = ({setIsModalOpen, isModalOpen}) => {
  return (
    <div className={`cart-modal-overlay ${isModalOpen ? "active" : ""}`}>
      <div className="cart-modal">
        <h2>Login Required</h2>
        <p>Please log in first to access the cart.</p>

        <div className="cart-modal-btns">
          <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>

          <Link to="/login" onClick={() => setIsModalOpen(false)}>
            <button className="login-btn">Go to Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
