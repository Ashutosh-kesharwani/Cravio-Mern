  import { NavLink } from "react-router-dom";
  import { assets } from "../../assets/admin_assets/assets.js";
  import "./Sidebar.css";
  const Sidebar = () => {
    return (
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink to="/add-food" className="sidebar-option">
            <img src={assets.add_icon} alt="Add icon" />
            <p>Add Items</p>
          </NavLink>
          <NavLink to="/list-food" className="sidebar-option">
            <img src={assets.order_icon} alt="Order icon" />
            <p>List Items</p>
          </NavLink>
          <NavLink to="/orders" className="sidebar-option">
            <img src={assets.order_icon} alt="Order icon" />
            <p>Orders</p>
          </NavLink>
        </div>
      </div>
    );
  };

  export default Sidebar;
