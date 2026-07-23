import { Outlet } from "react-router-dom";
import { Navbar } from "./components/index.js";
const App = () => {
  return (
    <div>
      <div className="app-container">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
