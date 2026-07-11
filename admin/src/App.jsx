import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "./components/index.js";
function App() {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
