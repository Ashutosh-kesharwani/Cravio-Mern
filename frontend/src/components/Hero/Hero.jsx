import { useEffect, useState } from "react";

import "./Hero.css";

import HeroContent from "./HeroContent";
import HeroSlider from "./HeroSlider";

import { heroFoods } from "../../constants/heroData";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Next Slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === heroFoods.length - 1 ? 0 : prev + 1));
  };

  // Previous Slide
  const previousSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroFoods.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Key board Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      }

      if (e.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sliderState = {
    currentFood: heroFoods[currentIndex],
    currentIndex,
    totalSlides: heroFoods.length,
    nextSlide,
    previousSlide,
    goToSlide,
    isPaused,
    setIsPaused,
  };
  return (
    <section className="hero" id="hero">
      <div className="hero__container app">
        <HeroContent currentFood={sliderState.currentFood} />

        <HeroSlider sliderState={sliderState} />
      </div>
    </section>
  );
};

export default Hero;
