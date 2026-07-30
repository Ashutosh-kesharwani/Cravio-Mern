import { Heart, LogOut, Package, ShoppingCart, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AUTH_MODE } from "../../constants/auth.constants.js";
import { useAuthStore } from "../../context/authContext.js";
import useCart from "../../hooks/cart/useCart.js";
import useWishlist from "../../hooks/wishlist/useWishlist";
import { navigateToSection } from "../../utils/navigation.js";
import AuthModal from "../Auth/AuthModal/AuthModal";
import Brand from "../Shared/Brand/Brand.jsx";
import ThemeToggle from "../Shared/ThemeToggle/ThemeToggle.jsx";
import "./Navbar.css";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { user, isAuthenticated, authLoading, openAuth, logout } =
    useAuthStore();

  const { fetchCart, totalItems, resetCart } = useCart();
  const { fetchWishlist, wishlist, resetWishlist } = useWishlist();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const profileRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId, menu) => {
    setMenu(menu);

    navigateToSection(sectionId, location, navigate);
  };

  useEffect(() => {
    setIsProfileOpen(false);
  }, [isAuthenticated]);

  useEffect(() => {
    setAvatarError(false);
  }, [user?.avatar?.url]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      fetchWishlist();
    }
  }, [isAuthenticated, fetchWishlist, fetchCart]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    resetCart();
    resetWishlist();
    await logout();
  };
  const handleCartClick = () => {
    if (!isAuthenticated) {
      openAuth(AUTH_MODE.LOGIN);

      return;
    }

    navigate("/cart");
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      openAuth(AUTH_MODE.LOGIN);
      return;
    }

    navigate("/wishlist");
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar__container app">
          <Link to="/" className="navbar__logo logo-font">
            <Brand size="md" />
          </Link>

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

          <div className="navbar__actions">
            <ThemeToggle />
            <button
              className="navbar__icon-btn navbar__wishlist"
              aria-label="Wishlist"
              onClick={handleWishlistClick}
            >
              <Heart size={22} strokeWidth={2.2} />

              {wishlist.length > 0 && (
                <span className="navbar__badge">{wishlist.length}</span>
              )}
            </button>
            <button
              className="navbar__icon-btn navbar__cart"
              aria-label="Cart"
              onClick={handleCartClick}
            >
              <ShoppingCart size={22} strokeWidth={2.2} />
              {totalItems > 0 && (
                <span className="navbar__badge">{totalItems}</span>
              )}
            </button>

            {!authLoading &&
              (!isAuthenticated ? (
                <button
                  className="navbar__signin-btn"
                  onClick={() => openAuth(AUTH_MODE.LOGIN)}
                >
                  Sign In
                </button>
              ) : (
                <div className="navbar__profile" ref={profileRef}>
                  <button
                    type="button"
                    className="navbar__profile-btn"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    aria-label="Profile menu"
                  >
                    {user?.avatar?.url && !avatarError ? (
                      <img
                        src={user.avatar.url}
                        alt={user.firstName}
                        className="navbar__avatar"
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      <div className="navbar__avatar-fallback">
                        <User size={22} />
                      </div>
                    )}
                  </button>

                  <div
                    className={`navbar__dropdown ${
                      isProfileOpen ? "navbar__dropdown--open" : ""
                    }`}
                  >
                    <Link
                      to="/me"
                      className="navbar__dropdown-item"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User size={18} />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/my-orders"
                      className="navbar__dropdown-item"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Package size={18} />
                      <span>My Orders</span>
                    </Link>
                    <hr />

                    <Link
                      to="/wishlist"
                      className="navbar__dropdown-item"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Heart size={18} />
                      <span>My Wishlist</span>
                    </Link>
                    <hr />
                    <button
                      type="button"
                      className="navbar__dropdown-item navbar__dropdown-item--danger"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </header>

      <AuthModal />
    </>
  );
};

export default Navbar;
