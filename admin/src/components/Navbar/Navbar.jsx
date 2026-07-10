import { assets } from "../../assets/admin_assets/assets.js";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="logo" className="logo" />
      <img src={assets.profile_image} alt="profile-image" />
    </div>
  );
};

export default Navbar;
