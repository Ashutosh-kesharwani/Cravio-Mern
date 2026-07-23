import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Hero } from "../../components/index.js";
import "./Home.css";
const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });

        // Clear state so it doesn't scroll again
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location, navigate]);
  return (
    <div>
      <Hero />
    </div>
  );
};

export default Home;
/* 
// Home.jsx

<>
 

   <AppDownload />

   <Testimonials />
</>
*/
