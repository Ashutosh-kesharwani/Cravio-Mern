import { LogOut, Package, Search, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AUTH_MODE } from "../../constants/auth.constants.js";
import { useAuthStore } from "../../context/authContext.js";
import AuthModal from "../Auth/AuthModal/AuthModal";
import "./Navbar.css";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { user, isAuthenticated, authLoading, openAuth, logout } =
    useAuthStore();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  useEffect(() => {
    setIsProfileOpen(false);
  }, [isAuthenticated]);

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

            {!authLoading &&
              (!isAuthenticated ? (
                <button
                  className="navbar__signin-btn"
                  onClick={() => openAuth(AUTH_MODE.LOGIN)}
                >
                  Sign In
                </button>
              ) : (
                <div className="navbar__profile">
                  <button
                    className="navbar__profile-btn"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                  >
                    {user?.avatar?.url ? (
                      <img
                        src={user.avatar.url}
                        alt={user.firstName}
                        className="navbar__avatar"
                      />
                    ) : (
                      <div className="navbar__avatar-fallback">
                        <User size={22} strokeWidth={2} />
                      </div>
                    )}
                  </button>
                  {isProfileOpen && (
                    <div className="navbar__dropdown">
                      <button className="navbar__dropdown-item">
                        <Package size={18} />

                        <span>Orders</span>
                      </button>

                      <button
                        className="navbar__dropdown-item"
                        onClick={logout}
                      >
                        <LogOut size={18} />

                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </header>

      {/* Place Auth Modal */}
      <AuthModal />
    </>
  );
};

export default Navbar;
