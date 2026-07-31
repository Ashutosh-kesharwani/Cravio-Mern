import { useEffect } from "react";

import useFood from "../../hooks/useFood.js";

import FoodCard from "../FoodCard/FoodCard.jsx";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { foods, loading, fetchFoods } = useFood();

  useEffect(() => {
    if (!foods.length) {
      fetchFoods();
    }
  }, [foods.length, fetchFoods]);

  const filteredFoods =
    category === "All"
      ? foods
      : foods.filter((food) => food.category === category);

  if (loading.fetchFoods) {
    return (
      <section className="food-display section app">
        <div className="food-display__header">
          <h2 className="section-title">Crafted Just For You</h2>
        </div>

        <p>Loading food...</p>
      </section>
    );
  }

  return (
    <section className="food-display section app">
      <div className="food-display__header">
        <h2 className="section-title">Crafted Just For You</h2>
      </div>

      <div className="food-display__grid">
        {filteredFoods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </section>
  );
};

export default FoodDisplay;
