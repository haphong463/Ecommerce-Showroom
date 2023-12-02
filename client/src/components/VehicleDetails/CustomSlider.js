// Slider.js
import React from "react";
import Slider from "react-slick";

const CustomSlider = ({ vehicleImages, sliderSettings }) => {
  return (
    <Slider {...sliderSettings}>
      {vehicleImages.map((image, index) => (
        <div key={index}>
          <img
            src={image.imagePath}
            alt={`Product ${index + 1}`}
            style={{ width: "100%", height: "50vh", objectFit: "contain" }}
            className="img-thumbnail"
          />
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
