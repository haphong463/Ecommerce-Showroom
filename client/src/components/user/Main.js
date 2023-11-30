import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../../components/user/Header";
const images = [
  {
    imgPath:
      "https://source.unsplash.com/random?wallpapers?auto=format&fit=crop&w=400&h=250&q=60",
  },
  // Add more images as needed
];
export function Main({ title, description, labelImg, img }) {
  const [state, setState] = useState({
    left: false,
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
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
          filter: "brightness(50%)",
        }}
        src={img}
        alt={labelImg}
        onLoad={handleImageLoad}
      />
      {imageLoaded && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            textAlign: "center",
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
            {title}
          </Typography>
          <Typography variant="body2" component="div">
            {description}
          </Typography>
        </Box>
      )}
      <Header title="AutoCar" state={state} setState={setState} />
    </Box>
  );
}
