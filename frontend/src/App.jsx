import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer, LoginPopup, Navbar } from "./components/index.js";
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {/* 
    Conditional rendering if LoginComponent
    */}
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
