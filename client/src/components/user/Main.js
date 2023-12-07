import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../../components/user/Header";
import { Carousel } from "./Home/Carousel";
const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States 1",
    imgPath:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1920&h=940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "San Francisco – Oakland Bay Bridge, United States 2",
    imgPath:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1920&h=940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "San Francisco – Oakland Bay Bridge, United States 3",
    imgPath:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1920&h=940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      {home && <Carousel images={images} state={state} setState={setState} />}
      {img && (
        <Box
          component="img"
          sx={{
            height: {
              xs: "40vh",
              md: "50vh",
              lg: "70vh",
              xl: "90vh",
            },
            display: "block",
            maxWidth: "100%",
            overflow: "hidden",
            width: "100%",
            position: "relative",
            filter: "brightness(35%)",
            objectFit: "cover",
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
            top: ["60%", "45%"],
            left: "70%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            textAlign: "right",
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
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            <span className="title-banner">{title}</span>
          </Typography>
          <Typography variant="body1" component="div">
            {description}
          </Typography>
        </Box>
      )}
      <Header title="AutoCar" state={state} setState={setState} />
    </Box>
  );
}
