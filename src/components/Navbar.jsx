import logo from "../images/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>

          <div className="menu">
            <i className="ph ph-list"></i>

            <div className="nav-links">
              <div className="link active">
                <a href="#">
                  Home <span></span>
                </a>
              </div>

              <div className="link">
                <a href="#men">
                  Men <span></span>
                </a>
              </div>

              <div className="link">
                <a href="#women">
                  Women <span></span>
                </a>
              </div>

              <div className="link">
                <a href="#kids">
                  Kids <span></span>
                </a>
              </div>

              <div className="link">
                <a href="#">
                  Contact <span></span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="search-bar">
            <i className="ph ph-magnifying-glass"></i>
            <input type="text" placeholder="Search products..." />
          </div>

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
