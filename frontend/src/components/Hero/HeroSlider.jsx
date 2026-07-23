import { useRef } from "react";
import "./HeroSlider.css";

import {
  BadgePercent,
  ChevronLeft,
  ChevronRight,
  Clock3,
  IndianRupee,
  Star,
} from "lucide-react";

import FloatingCard from "./FloatingCard";

const HeroSlider = ({ sliderState }) => {
  const {
    currentFood,
    currentIndex,
    totalSlides,
    nextSlide,
    previousSlide,
    goToSlide,
    setIsPaused,
  } = sliderState;

  const touchStartX = useRef(0);

  return (
    <div
      className="hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const touchEnd = e.changedTouches[0].clientX;

        const distance = touchStartX.current - touchEnd;

        if (distance > 50) {
          nextSlide();
        }

        if (distance < -50) {
          previousSlide();
        }
      }}
    >
      {/* Background Glow */}
      <div className="hero-slider__blob"></div>

      {/* Floating Cards */}

      <FloatingCard
        className="hero-slider__rating"
        icon={<Star fill="#FDBA12" color="#FDBA12" size={22} />}
        value={currentFood.rating}
        title="Customer Rating"
      />

      <FloatingCard
        className="hero-slider__delivery"
        icon={<Clock3 size={22} />}
        value={currentFood.delivery}
        title="Fast Delivery"
      />

      <FloatingCard
        className="hero-slider__price"
        icon={<IndianRupee size={22} />}
        value={`₹${currentFood.price}`}
        title="Starting From"
      />

      <FloatingCard
        className="hero-slider__discount"
        icon={<BadgePercent size={22} />}
        value={currentFood.discount}
        title="Limited Offer"
      />

      {/* Image */}

      <div className="hero-slider__image-wrapper">
        <img
          key={currentFood.id}
          src={currentFood.image}
          alt={currentFood.title}
          className="hero-slider__image"
        />
      </div>

      {/* Navigation */}

      <div className="hero-slider__navigation">
        <button
          className="hero-slider__button"
          onClick={previousSlide}
          aria-label="Previous Food"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Pagination */}

        <div className="hero-slider__pagination">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`hero-slider__dot ${
                currentIndex === index ? "hero-slider__dot--active" : ""
              }`}
            />
          ))}
        </div>

        <button
          className="hero-slider__button"
          onClick={nextSlide}
          aria-label="Next Food"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
