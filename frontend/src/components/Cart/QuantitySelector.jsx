import { Minus, Plus } from "lucide-react";
import "./QuantitySelector.css";
const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  loading = false,
}) => {
  return (
    <div className="quantity-selector">
      <button
        type="button"
        className="quantity-selector__btn"
        onClick={onDecrease}
        disabled={loading}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>

      <span className="quantity-selector__value">{quantity}</span>

      <button
        type="button"
        className="quantity-selector__btn"
        onClick={onIncrease}
        disabled={loading}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;
