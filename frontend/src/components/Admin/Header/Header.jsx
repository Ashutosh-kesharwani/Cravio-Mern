import { CalendarDays } from "lucide-react";
import { useLocation } from "react-router-dom";

import { ADMIN_ROUTES } from "../../../constants/admin.constants.js";

import { capitalize } from "../../../utils/formatters.js";

import { useAuthStore } from "../../../context/authContext";
import "./Header.css";

const Header = () => {
  const { user } = useAuthStore();
  const { pathname } = useLocation();

  const getPageTitle = () => {
    switch (pathname) {
      case ADMIN_ROUTES.DASHBOARD:
        return "Dashboard";

      case ADMIN_ROUTES.ADD_FOOD:
        return "Add Food";

      case ADMIN_ROUTES.FOOD_LIST:
        return "Food List";

      case ADMIN_ROUTES.ORDERS:
        return "Orders";

      default:
        return "Admin Panel";
    }
  };

  const getPageSubtitle = () => {
    switch (pathname) {
      case ADMIN_ROUTES.DASHBOARD:
        return "Monitor your restaurant performance and business insights.";

      case ADMIN_ROUTES.ADD_FOOD:
        return "Create delicious new menu items for your customers.";

      case ADMIN_ROUTES.FOOD_LIST:
        return "Manage, edit and organize all your food items.";

      case ADMIN_ROUTES.ORDERS:
        return "Track every order placed by your customers.";

      default:
        return "Welcome back to Cravio Admin.";
    }
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="admin-header">
      <div className="admin-header__left">
        <span className="admin-header__badge">Admin Panel</span>

        <h1 className="admin-header__title">{getPageTitle()}</h1>

        <p className="admin-header__subtitle">{getPageSubtitle()}</p>
      </div>

      <div className="admin-header__right">
        <div className="admin-header__date">
          <CalendarDays size={18} />

          <span>{today}</span>
        </div>

        <div className="admin-header__profile">
          <div className="admin-header__avatar">
            {user?.avatar?.url ? (
              <img src={user.avatar} alt={user.firstName} />
            ) : (
              <span>{user?.firstName?.charAt(0).toUpperCase()}</span>
            )}
          </div>

          <div className="admin-header__user">
            <h4>
              {capitalize(user?.firstName)} {capitalize(user?.lastName)}
            </h4>

            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
