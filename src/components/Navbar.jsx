import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { useContext } from "react";
import { UserContext } from "../context/UsersContext";
import Modal from "./Modal";

const Navbar = ({ isModalOpen, setIsModalOpen }) => {
  let navigate = useNavigate();
  let { currentUser, setCurrentUser, userData } = useContext(UserContext);

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
      return setIsModalOpen(true);
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
                <i className="ph ph-x" onClick={closeMenu}></i>
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

                <div className="divider-x"></div>

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
              {currentUser && <span>{userData?.cart?.length ?? 0}</span>}
              <i className="ph ph-shopping-cart"></i>
            </div>
          </div>

          <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
