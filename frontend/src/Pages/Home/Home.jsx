import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import {
  AppDownload,
  ExploreMenu,
  FoodDisplay,
  Hero,
} from "../../components/index.js";
import "./Home.css";
const Home = () => {
  const [category, setCategory] = useState("All");

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
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
