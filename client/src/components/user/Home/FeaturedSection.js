import React, { useState } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { FeaturedCard } from "./FeaturedCard";

const FeaturedSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Box
      sx={{
        my: 20,
      }}
      component="section"
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mt: 2,
        }}
      >
        Featured Cars
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          mx: 3,
          mb: 3,
          color: "text.secondary",
        }}
      >
        Explore our collection of featured cars, each with unique styles and
        advanced features.
      </Typography>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FeaturedCard
              handleImageLoad={handleImageLoad}
              imageLoaded={imageLoaded}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedSection;
