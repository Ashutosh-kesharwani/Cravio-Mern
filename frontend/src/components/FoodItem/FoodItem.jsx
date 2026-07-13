import { assets } from "../../assets/frontend_assets/assets.js";
import { useStore } from "../../context/storeContext.js";
import "./FoodItem.css";

/* 
FoodItem Components
> This is a generic component which we are going to use for creating each Food item card
> So here we are going to capture the props passed by FoodDisplay Component
> Like id,name,price,desc,image
*/
const FoodItem = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart } = useStore();

  return (
    <div className="food-item">
      <div id={id} className="food-item-image-container">
        <img src={image?.url} alt={name} className="food-item-image" />
        {/* 
         Conditional Add Btn render
         if count of item is 0
         > then show white btn , of add only
         > if >1 then show remove . count . add green btn
         > !cartItems?.[id] this is used to prevent the crash until data gets loaded
        */}

        {!cartItems?.[id] ? (
          <img
            src={assets.add_icon_white}
            onClick={() => addToCart(id)}
            alt="add-white-btn"
            className="add-btn"
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
              alt="remove-btn"
              className="remove-btn"
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={() => addToCart(id)}
              alt="add-green-btn"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating-stars-icon" />
        </div>

        <p className="food-item-description">{description}</p>
        <p className="food-item-price">&#36;{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
