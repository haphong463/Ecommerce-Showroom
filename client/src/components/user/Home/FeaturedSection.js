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
  const featuredProducts = [
    { id: 1, title: "Product 1", description: "Description 1" },
    { id: 2, title: "Product 2", description: "Description 2" },
    { id: 3, title: "Product 3", description: "Description 3" },
    { id: 4, title: "Product 4", description: "Description 4" },
    { id: 5, title: "Product 5", description: "Description 5" },
  ];

  // Settings for react-slick slider
  const sliderSettings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 500,
    autoplay: true,
    centerMode: true, // Enable center mode
    centerPadding: "25%", // Adjust the padding to control the visibility of half items on both sides
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
    getBrandList().then((res) => {
      if (res.data !== null) {
        setBrand(res.data);
      }
    });
  }, []);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
        }}
        component="section"
      >
        <Slider {...sliderSettings}>
          {brand.map((product) => (
            <Box key={product.brandId}>
              <Card
                sx={{
                  margin: "10px",
                  boxShadow: "none",
                }}
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
