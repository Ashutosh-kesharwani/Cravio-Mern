import { assets } from "../../assets/assets.js";
import "./AppDownload.css";

const AppDownload = () => {
  return (
    <section className="app-download section app" id="app-download">
      <div className="app-download__container">
        <span className="section-badge">Mobile App</span>

        <h2 className="app-download__title">
          Download the <span>Cravio App</span>
        </h2>

        <p className="app-download__description">
          Order your favourite meals in seconds, enjoy live delivery tracking,
          exclusive discounts, and a seamless food ordering experience wherever
          you are.
        </p>

        <div className="app-download__platforms">
          <a href="/" className="app-download__store">
            <img src={assets.play_store} alt="Google Play" />
          </a>

          <a href="/" className="app-download__store">
            <img src={assets.app_store} alt="App Store" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
