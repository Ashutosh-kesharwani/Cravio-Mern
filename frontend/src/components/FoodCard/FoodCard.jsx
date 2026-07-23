import { useState } from "react";
import "./FoodCard.css";

import { Clock3, Heart, Minus, Plus, Star } from "lucide-react";
const FoodCard = ({ food }) => {
  const [quantity, setQuantity] = useState(0);
  return (
    <article className="food-card">
      <div className="food-card__image-wrapper">
        <img src={food.image} alt={food.name} className="food-card__image" />

        <button className="food-card__wishlist">
          <Heart size={20} />
        </button>

        <div className="food-card__rating">
          <Star size={14} fill="currentColor" />
          4.8
        </div>
      </div>

      <div className="food-card__body">
        <div className="food-card__top">
          <h3>{food.name}</h3>

          <span>${food.price}</span>
        </div>

        <p>{food.description}</p>

        <div className="food-card__meta">
          <span>{food.category}</span>

          <span>
            <Clock3 size={15} />
            15 min
          </span>
        </div>

        {quantity === 0 ? (
          <button className="food-card__button" onClick={() => setQuantity(1)}>
            <Plus size={18} />
            Add to Cart
          </button>
        ) : (
          <div className="food-card__quantity">
            <button
              className="food-card__quantity-btn"
              onClick={() => {
                if (quantity === 1) {
                  setQuantity(0);
                } else {
                  setQuantity((prev) => prev - 1);
                }
              }}
            >
              <Minus size={18} />
            </button>

            <span className="food-card__quantity-value">{quantity}</span>

            <button
              className="food-card__quantity-btn food-card__quantity-btn--plus"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              <Plus size={18} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default FoodCard;
