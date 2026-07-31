import { BsBagCheckFill } from "react-icons/bs";
import { FaHamburger } from "react-icons/fa";
import { FiList } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

import useAdmin from "../../../hooks/admin/useAdmin.js";
import Brand from "../../Shared/Brand/Brand.jsx";

import ThemeToggle from "../../Shared/ThemeToggle/ThemeToggle.jsx";
import "./Sidebar.css";

const Sidebar = () => {
  const { handleAdminLogout } = useAdmin();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__top">
        <div className="admin-sidebar__logo">
          <Brand />
        </div>

        <div className="admin-sidebar__theme_toggle">
          <ThemeToggle />
        </div>

        <nav className="admin-sidebar__menu">
          <NavLink to="/admin" end>
            <MdDashboard />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/add-food">
            <FaHamburger />
            <span>Add Food</span>
          </NavLink>

          <NavLink to="/admin/foods">
            <FiList />
            <span>Food List</span>
          </NavLink>

          <NavLink to="/admin/orders">
            <BsBagCheckFill />
            <span>Orders</span>
          </NavLink>
        </nav>
      </div>

      <div className="admin-sidebar__bottom">
        <button
          type="button"
          className="admin-sidebar__logout"
          onClick={handleAdminLogout}
        >
          <IoLogOutOutline />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
