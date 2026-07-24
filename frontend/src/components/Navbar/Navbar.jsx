import "./Navbar.css";

import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../Auth/AuthModal/AuthModal";

/* 
Home : link
explore-menu
app-download
footer
*/
const Navbar = () => {
  const [menu, setMenu] = useState("home");

  const [showAuthModal, setShowAuthModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle Navigation
  const handleNavigation = (sectionId, menu) => {
    setMenu(menu);

    // Already at home -> scroll to given section
    if (location.pathname === "/") {
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    }
    // Else first navigate to Home -> scroll to section
    else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar__container app">
          {/* Logo */}

          <Link to="/" className="navbar__logo logo-font">
            Cra<span>vio</span>
          </Link>

          {/* Navigation */}

          <nav className="navbar__nav">
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={`${menu === "home" ? "navbar__link--active" : ""} navbar__link`}
            >
              Home
            </Link>

            <a
              onClick={() => handleNavigation("explore-menu", "menu")}
              className={`${menu === "menu" ? "navbar__link--active" : ""} navbar__link`}
            >
              Menu
            </a>

            <a
              onClick={() => handleNavigation("app-download", "mobile-app")}
              className={`${menu === "mobile-app" ? "navbar__link--active" : ""} navbar__link`}
            >
              Mobile App
            </a>

            <a
              onClick={() => handleNavigation("footer", "contact-us")}
              className={`${menu === "contact-us" ? "navbar__link--active" : ""} navbar__link`}
            >
              Contact
            </a>
          </nav>

          {/* Right Section */}

          <div className="navbar__actions">
            <button className="navbar__icon-btn" aria-label="Search">
              <Search size={22} strokeWidth={2.2} />
            </button>

            <Link
              to="/cart"
              className="navbar__icon-btn navbar__cart"
              aria-label="Cart"
            >
              <ShoppingCart size={22} strokeWidth={2.2} />

              <span className="navbar__cart-badge"></span>
            </Link>

            <button
              className="navbar__signin-btn"
              onClick={() => setShowAuthModal(true)}
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Place Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default Navbar;
