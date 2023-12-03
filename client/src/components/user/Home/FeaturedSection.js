import React from "react";
import { Box, Card, CardContent, Typography, Container } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedSection = () => {
  // Sample data for cards
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
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    cssEase: "linear",
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
        }}
        component="section"
      >
        <Typography variant="h4" align="center" gutterBottom>
          TYPICAL CAR SERIES
        </Typography>
        <Slider {...sliderSettings}>
          {featuredProducts.map((product) => (
            <Box>
              <Card
                key={product.id}
                sx={{
                  margin: "10px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default FeaturedSection;
