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

const BrandSection = () => {
  // Sample data for cards
  const [brand, setBrand] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };
  const sliderSettings = {
    infinite: true,
    slidesToShow: brand.length > 0 ? (brand.length > 4 ? 4 : brand.length) : 1,
    slidesToScroll: 1,
    autoplaySpeed: 500,
    autoplay: true,
    centerMode: true,
    centerPadding: "10%", // Set a specific center padding value
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            brand.length > 0 ? (brand.length > 3 ? 3 : brand.length) : 1,
          centerPadding: "20%",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          centerPadding: "15%",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "10%",
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

  console.log("re-render");
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }} component="section">
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontSize: ["1.5rem", "2.3rem", "3rem"],
          }}
          gutterBottom
          className="title-specs"
        >
          <span className="title-text">FEATURED BRANDS</span>
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
    </Container>
  );
};

export default BrandSection;
