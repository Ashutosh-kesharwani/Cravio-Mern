import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components/index.js";
const App = () => {
  return (
    <div>
      <div className="app-container">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default App;
