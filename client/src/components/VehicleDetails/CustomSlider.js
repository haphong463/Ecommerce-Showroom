// Slider.js
import React, { useState } from "react";
import Slider from "react-slick";

const CustomSlider = ({ vehicleImages, sliderSettings }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Slider {...sliderSettings}>
      {vehicleImages.map((image, index) => (
        <div key={index}>
          {/* Implement slider image component content here */}
          <img
            src={image.imagePath}
            alt={`Product ${index + 1}`}
            style={{ width: "100%", height: "50vh" }}
            className="img-thumbnail"
          />
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
