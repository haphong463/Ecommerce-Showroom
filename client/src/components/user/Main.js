import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../../components/user/Header";
const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://source.unsplash.com/random?wallpapers?auto=format&fit=crop&w=400&h=250&q=60",
  },
  // Add more images as needed
];
export function Main() {
  const [state, setState] = useState({
    left: false,
    imagesLoaded: Array(images.length).fill(false),
  });

  const handleImageLoad = (index) => {
    setState((prev) => {
      const updatedImagesLoaded = [...prev.imagesLoaded];
      updatedImagesLoaded[index] = true;
      return { ...prev, imagesLoaded: updatedImagesLoaded };
    });
  };

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1, position: "relative" }}>
      <Box
        component="img"
        sx={{
          height: "100vh",
          display: "block",
          maxWidth: "100%",
          overflow: "hidden",
          width: "100%",
          position: "relative",
          filter: "brightness(70%)",
        }}
        src={images[0].imgPath} // Assuming always using the first image
        alt={images[0].label}
        onLoad={() => handleImageLoad(0)} // Assuming always loading the first image
      />
      {state.imagesLoaded[0] && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography variant="h1" component="span">
            {images[0].label}
          </Typography>
        </Box>
      )}
      <Header title="AutoCar" state={state} setState={setState} />
    </Box>
  );
}
