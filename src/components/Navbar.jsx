import logo from "../images/logo.png";

const Navbar = () => {
  let activeLinkHandler = (clickedLink) => {
    let links = document.querySelectorAll(".nav-links a");

    links.forEach((link) => link.classList.remove("active"));
    clickedLink.classList.add("active");
  };

  let openMenu = () =>
    document.querySelector(".overlay").classList.add("active");

  let closeMenu = () => document.querySelector(".overlay").classList.remove("active")

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
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign Up</button>
          </div>

          <div className="icons">
            <div className="icon">
              <span>2</span>
              <i className="ph ph-shopping-cart"></i>
            </div>

            <div className="icon">
              <span>3</span>
              <i className="ph ph-heart"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
