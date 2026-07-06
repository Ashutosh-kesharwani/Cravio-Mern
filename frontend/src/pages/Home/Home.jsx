import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AppDownload,
  ExploreMenu,
  FoodDisplay,
  Header,
} from "../../components";
import "./Home.css";
const Home = () => {
  const [category, setCategory] = useState("All");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);

      element?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [location]);
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
