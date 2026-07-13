import { useStore } from "../../context/storeContext.js";
import FoodItem from "../FoodItem/FoodItem.jsx";
import "./FoodDisplay.css";
const FoodDisplay = ({ category }) => {
  const { food_list } = useStore();

  return (
    <div>
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {food_list.map((item) => {
            /* Filter food-item display on basis of category menu given */
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
