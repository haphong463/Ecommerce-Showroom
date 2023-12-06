import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  CardMedia,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBrandList } from "../../Brand/BrandLibrary";
import "../../../assets/styles/slick.css";
const RelatedVehicles = () => {
  // Sample data for cards
  const [brand, setBrand] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };
  // Settings for react-slick slider
  const sliderSettings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 500,
    autoplay: true,
    centerMode: true, // Enable center mode
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "20%", // Adjust as needed for different breakpoints
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          centerPadding: "15%", // Adjust as needed for different breakpoints
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "10%", // Adjust as needed for different breakpoints
        },
      },
    ],
    cssEase: "linear",
  };
  useEffect(() => {
    getBrandList().then((data) => {
      if (data !== null) {
        setBrand(data);
      }
    });
  }, []);
  return (
    <>
      <Box sx={{ my: 4 }} component="section">
        <Typography variant="h4" align="center" className="title-specs">
          <span className="title-text">Other Vehicles</span>
        </Typography>
        <Slider {...sliderSettings}>
          {brand.map((product, index) => (
            <Box key={product.brandId}>
              <Card
                className={`brand-card ${
                  hoveredIndex === index ? "hovered" : ""
                }`}
                sx={{
                  margin: "10px",
                  boxShadow: "none",
                }}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={handleMouseLeave}
              >
                <CardMedia
                  height="100px"
                  width="100px"
                  sx={{
                    objectFit: "contain",
                  }}
                  component="img"
                  src={product.imagePath}
                />
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default RelatedVehicles;
