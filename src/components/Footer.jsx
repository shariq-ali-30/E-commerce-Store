import Logo from "../images/logo.png";

const Footer = () => {
  return (
    <div className="container" id="footer">
      <div className="footer">
        <div className="top">
          <div className="left">
            <img src={Logo} width={150} />
            <span>
              Your one-stop destination for trendy fashionn and lifestyle
              products. Shop smart, look awsome
            </span>
            <div className="social-icons">
              <div>
                <i className="fa-brands fa-facebook-f"></i>
              </div>
              <div>
                <i className="fa-brands fa-instagram"></i>
              </div>
              <div>
                <i className="fa-brands fa-twitter"></i>
              </div>
              <div>
                <i className="fa-brands fa-pinterest-p"></i>
              </div>
            </div>
          </div>
          <div>
            <p>Shop</p>
            <span>All Products</span>
            <span>Men</span>
            <span>Women</span>
            <span>Shoes</span>
            <span>Accessories</span>
            <span>Sale</span>
          </div>
          <div>
            <p>Customer Service</p>
            <span>Contact Us</span>
            <span>Shopping & Delivery</span>
            <span>Returns & Exchange</span>
            <span>Size Guide</span>
            <span>FAQs</span>
            <span>Track Order</span>
          </div>
          <div>
            <p>Information</p>
            <span>About Us</span>
            <span>Privacy Policy</span>
            <span>Terms & Condition</span>
            <span>Refund Policy</span>
            <span>Careers</span>
            <span>Blog</span>
          </div>
          <div>
            <p>Contact Us</p>
            <span>
              <i className="ph ph-phone"></i> +92 307 06831994
            </span>
            <span>
              <i className="ph ph-envelope"></i> support@stylestore.com
            </span>
            <span>
              <i className="ph ph-map-pin"></i> Shop 7, Dolmen Mall Area,
              Clifton, Karachi, Sindh, Pakistan
            </span>
          </div>
        </div>
        <div className="bottom">
          <p>© 2026 StyleStore. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
