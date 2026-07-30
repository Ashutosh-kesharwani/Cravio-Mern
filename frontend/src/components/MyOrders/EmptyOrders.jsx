import { PackageCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { navigateToSection } from "../../utils/navigation.js";
const EmptyOrders = () => {
  const navigate = useNavigate();
  return (
    <section className="empty-orders">
      <div className="empty-orders__icon">
        <PackageCheck size={70} />
      </div>

      <h2 className="empty-orders__title">No Orders Yet</h2>

      <p className="empty-orders__description">
        You haven't placed any orders yet. Browse our menu and place your first
        order.
      </p>

      <button
        className="empty-orders__button"
        onClick={() => navigateToSection("explore-menu", location, navigate)}
      >
        Browse Menu
      </button>
    </section>
  );
};

export default EmptyOrders;
