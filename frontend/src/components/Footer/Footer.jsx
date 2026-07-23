import "./Footer.css";

import { Mail, MapPin, Phone, UtensilsCrossed } from "lucide-react";

import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__container app">
        {/* Left */}

        <div className="footer__brand">
          <div className="footer__logo">
            <UtensilsCrossed size={26} />

            <span>Cravio</span>
          </div>

          <p>
            Fresh food delivered to your doorstep with premium quality,
            lightning-fast delivery and a delightful ordering experience.
          </p>

          <div className="footer__socials">
            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaXTwitter />
            </a>

            <a
              href="https://www.linkedin.com/in/ashutosh1406/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://github.com/Ashutosh-kesharwani"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Links */}

        <div className="footer__links">
          <div>
            <h4>Company</h4>

            <a href="#">Home</a>
            <a href="#">Menu</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>

          <div>
            <h4>Support</h4>

            <a href="#">Help Center</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">FAQs</a>
          </div>

          <div>
            <h4>Contact</h4>

            <span>
              <Mail size={16} />
              hello@cravio.com
            </span>

            <span>
              <Phone size={16} />
              +91 9XXXXXXXXX
            </span>

            <span>
              <MapPin size={16} />
              Prayagraj, India
            </span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        &#169; {new Date().getFullYear()} Cravio. Crafted with ❤️ by Ashutosh.
      </div>
    </footer>
  );
};

export default Footer;
