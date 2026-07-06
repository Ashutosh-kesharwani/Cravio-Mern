import { useState } from "react";
import {
  AppDownload,
  ExploreMenu,
  FoodDisplay,
  Header,
} from "../../components";
import "./Home.css";
const Home = () => {
  const [category, setCategory] = useState("All");
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
