import React, { useState } from 'react';
import './CategorySlider.css'; // Import the updated CSS

interface CategorySliderProps {
  categories: { id: number; name: string; image: string }[];
  onCategoryClick: (categoryId: number | string) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ categories, onCategoryClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSlides = 7; // Number of slides visible at a time

  const handleNext = () => {
    // Move forward, but stop if we reach the end
    if (currentIndex < categories.length - visibleSlides) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    // Move back, but stop if we reach the beginning
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="slider-container">
      <button className="slider-button left" onClick={handlePrev}>&lt;</button>
      <div className="slider">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}
        >
          {categories.map((category) => (
            <div key={category.id} className="slide" onClick={() => onCategoryClick(category.id)}>
              <img src={category.image} alt={category.name} className="category-image" />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="slider-button right" onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default CategorySlider;
