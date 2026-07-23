import "./HeroContent.css";

import { ArrowRight, Play, Star } from "lucide-react";

import HeroStats from "./HeroStats";

const HeroContent = ({ currentFood }) => {
  return (
    <div className="hero-content">
      {/* Badge */}

      <div className="hero-content__badge">
        <span className="hero-content__badge-dot"></span>

        <span>Fast Delivery • Fresh Everyday</span>
      </div>

      {/* Heading */}

      <h1
        key={currentFood.id}
        className="hero-content__title hero-content__title--animate"
      >
        Enjoy the Best
        <span className="hero-content__highlight">{currentFood.title}</span>
      </h1>

      {/* Description */}

      <p
        key={currentFood.id + "-desc"}
        className="hero-content__description hero-content__description--animate"
      >
        {currentFood.subtitle}
      </p>

      {/* Buttons */}

      <div className="hero-content__actions">
        <button className="btn btn--primary">
          Order Now
          <ArrowRight size={18} />
        </button>

        <button className="btn btn--secondary">
          <Play size={18} />
          Watch Video
        </button>
      </div>

      {/* Trust */}

      <div className="hero-content__trust">
        <div className="hero-content__stars">
          <Star fill="#FDBA12" color="#FDBA12" size={18} />
          <Star fill="#FDBA12" color="#FDBA12" size={18} />
          <Star fill="#FDBA12" color="#FDBA12" size={18} />
          <Star fill="#FDBA12" color="#FDBA12" size={18} />
          <Star fill="#FDBA12" color="#FDBA12" size={18} />
        </div>

        <p>
          Trusted by <strong>50,000+</strong> happy customers
        </p>
      </div>

      {/* Stats */}

      <HeroStats />
    </div>
  );
};

export default HeroContent;
