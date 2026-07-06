import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets.js";
import { useFoodList } from "../../context/storeContext.js";
import "./Navbar.css";
const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useFoodList();

  /* 
  >Whenever we click the menu , this func no matter what route is it , like whether on Home , cart or other
  > This will going to first check curr url location if its '/' , Homepage then just scroll till that section
  > else first navigate to homepage and then scroll to that section
  */
  const handleNavigation = (sectionId, menuName) => {
    setMenu(menuName);

    if (location.pathname === "/") {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      {/* Underline Effect on Menu
      > We are going to add conditional underline style , when we click on any menu
      > if curr menu is active then apply active style
      */}
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        {/* on click for navigation use handleNavigation helper func  */}
        <a
          onClick={() => handleNavigation("explore-menu", "menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>

        <a
          onClick={() => handleNavigation("app-download", "mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>

        <a
          onClick={() => handleNavigation("footer", "contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search-icon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket-icon" />
          </Link>
          {getTotalCartAmount() !== 0 && <div className="dot"></div>}
        </div>
        {/* i.e after click signin for first time from next time user will always be login so show login pop cpmponent */}
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
