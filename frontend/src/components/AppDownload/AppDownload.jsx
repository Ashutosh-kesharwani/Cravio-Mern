import { assets } from "../../assets/frontend_assets/assets.js";
import "./AppDownload.css";
const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download <br /> Cravio App
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="playstore-icon" />
        <img src={assets.app_store} alt="appstore-icon" />
      </div>
    </div>
  );
};

export default AppDownload;
