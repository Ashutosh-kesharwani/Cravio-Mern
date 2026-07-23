import { food_list } from "../../assets/assets";
import FoodCard from "../FoodCard/FoodCard";
import "./FoodDisplay.css";
const FoodDisplay = ({ category }) => {
  const filteredFoods =
    category === "All"
      ? food_list
      : food_list.filter((food) => food.category === category);

  return (
    <section className="food-display section app">
      <div className="food-display__header">
        <span className="section-badge">Popular Dishes</span>

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
