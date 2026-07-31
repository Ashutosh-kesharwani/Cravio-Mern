import { UtensilsCrossed } from "lucide-react";

import "./Brand.css";

const Brand = () => {
  return (
    <div className="brand">
      <div className="brand__icon">
        <UtensilsCrossed strokeWidth={2.5} />
      </div>

      <div className="brand__content">
        <h1 className="brand__title">
          CRA<span>VIO</span>
        </h1>

        <p className="brand__tagline">Fueling Every Craving</p>
      </div>
    </div>
  );
};

export default Brand;
