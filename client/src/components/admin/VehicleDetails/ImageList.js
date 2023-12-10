import React, { useRef } from "react";
import Carousel from "react-material-ui-carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

const CustomSlider = ({ vehicleImages }) => {
  const [materialUiIndex, setMaterialUiIndex] = React.useState(0);
  const slickRef = useRef(null);

  const handleMaterialUiChange = (index) => {
    setMaterialUiIndex(index);
    slickRef.current.slickGoTo(index);
  };
  const handleSlickChange = (index) => {
    setMaterialUiIndex(index);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:
      vehicleImages.length > 0
        ? vehicleImages.length > 5
          ? 5
          : vehicleImages.length
        : 0,
    slidesToScroll: 1,
    autoplaySpeed: 1000,
    centerMode: true,
    centerPadding: "10%",
    beforeChange: (_, nextIndex) => handleSlickChange(nextIndex),
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box component="div">
      <Carousel
        autoPlay={false}
        // interval={1000}
        animation="slide"
        indicators={false}
        index={materialUiIndex}
        onChange={handleMaterialUiChange}
      >
        {vehicleImages.map((image, index) => (
          <Box key={image.imagePath}>
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
          </Box>
        ))}
      </Carousel>

      <Slider ref={slickRef} {...settings}>
        {vehicleImages.map((image, index) => (
          <Box key={image.imagePath}>
            <img
              src={image.imagePath}
              alt={`Product ${index + 1}`}
              style={{
                width: "100%",
                height: "50px",
                objectFit: "contain",
                border: "1px solid #cbcbcb",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CustomSlider;
