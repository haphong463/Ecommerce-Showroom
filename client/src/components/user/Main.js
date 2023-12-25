import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../../components/user/Header";
import { CarouselComponent } from "./Home/Carousel";
const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States 1",
    imgPath:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1920&h=940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "San Francisco – Oakland Bay Bridge, United States 2",
    imgPath:
      "https://images.unsplash.com/photo-1643142314913-0cf633d9bbb5?q=80&w=1920&h=940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
export function Main({ title, description, labelImg, img, home }) {
  const [state, setState] = useState({
    left: false,
    imagesLoaded: Array(images.length).fill(false),
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1, position: "relative" }}>
      <Header title="AutoCar" state={state} setState={setState} />

      {home && (
        <CarouselComponent images={images} state={state} setState={setState} />
      )}
      {img && (
        <Box
          component="img"
          sx={{
            height: ["20vh", "30vh"],
            display: "block",
            maxWidth: "100%",
            overflow: "hidden",
            width: "100%",
            position: "relative",
            filter: imageLoaded ? "brightness(50%)" : "brightness(100%)", // Thêm filter brightness
            objectFit: "cover",
            transition: "filter 0.5s ease-in-out", // Thêm transitiontion
          }}
          src={img}
          alt={labelImg}
          onLoad={handleImageLoad}
        />
      )}
      {imageLoaded && (
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            textAlign: "left",
            width: "50%",
          }}
        >
          <Typography
            variant="h1"
            component="span"
            sx={{
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "4rem" },
              fontWeight: "700",
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
