import { useEffect } from "react";
import { FaTrash } from "react-icons/fa6";

import useFood from "../../../hooks/useFood.js";

import "./FoodList.css";

const FoodList = () => {
  const { foods, loading, fetchFoods, handleDeleteFood } = useFood();

  useEffect(() => {
    if (!foods.length) {
      fetchFoods();
    }
  }, [foods.length, fetchFoods]);

  return (
    <section className="food-list">
      <div className="food-table">
        <div className="food-table__head">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {foods.map((food) => (
          <div className="food-table__row" key={food._id}>
            <img src={food.image.url} alt={food.name} />

            <p>{food.name}</p>

            <p>{food.category}</p>

            <p>₹ {food.price}</p>

            <button
              disabled={loading.deleteFood}
              onClick={() => handleDeleteFood(food._id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}

        {!foods.length && !loading.fetchFoods && (
          <div className="food-table__empty">No food items available.</div>
        )}
      </div>
    </section>
  );
};

export default FoodList;
