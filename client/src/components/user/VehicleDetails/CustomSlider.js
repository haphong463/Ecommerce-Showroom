// Slider.js
import React from "react";
import Slider from "react-slick";

const CustomSlider = ({ vehicleImages }) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...sliderSettings}>
      {vehicleImages.map((image, index) => (
        <div key={index}>
          <img
            src={image.imagePath}
            alt={`Product ${index + 1}`}
            style={{
              width: "100%",
              height: "50vh",
              objectFit: "cover",
              border: "1px solid #cbcbcb",
            }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
