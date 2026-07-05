import { useState } from "react";
import { assets } from "../../assets/frontend_assets/assets.js";
import "./Navbar.css";
const Navbar = () => {
  const [menu, setMenu] = useState("home");
  return (
    <div className="navbar">
      <img src={assets.logo} alt="logo" />

      {/* Underline Effect on Menu
      > We are going to add conditional underline style , when we click on any menu
      > if curr menu is active then apply active style
      */}
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </li>
        <li
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </li>
        <li
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </li>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search-icon" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="basket-icon" />
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
