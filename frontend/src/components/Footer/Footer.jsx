import { assets } from "../../assets/frontend_assets/assets.js";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            quisquam sint ad molestias quibusdam iure necessitatibus provident
            voluptas odit laboriosam ratione pariatur enim illo, tenetur
            exercitationem, consequatur impedit adipisci facilis.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook-icon" />
            <img src={assets.twitter_icon} alt="twitter-icon" />
            <img src={assets.linkedin_icon} alt="linkedin-icon" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@cravio.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        CopyRight 2024 &copy; Cravio.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
