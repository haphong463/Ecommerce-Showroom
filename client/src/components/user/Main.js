import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../../components/user/Header";
import { VehicleContext } from "../../context/VehicleContext";
const images = [
  {
    imgPath:
      "https://source.unsplash.com/random?wallpapers?auto=format&fit=crop&w=400&h=250&q=60",
  },
  // Add more images as needed
];
export function Main({
  title,
  description,
  labelImg,
  img,
  colorHeader,
  imgDetail,
}) {
  const [state, setState] = useState({
    left: false,
  });
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1, position: "relative" }}>
      {(img && (
        <Box
          component="img"
          sx={{
            height: {
              xs: "40vh", // Đối với breakpoint xs, sử dụng chiều cao tự động
              md: "50vh", // Đối với breakpoint md, sử dụng chiều cao là 300px
              lg: "70vh", // Đối với breakpoint lg, sử dụng chiều cao là 400px
              xl: "90vh", // Đối với breakpoint xl, sử dụng chiều cao là 500px
            },
            display: "block",
            maxWidth: "100%",
            overflow: "hidden",
            width: "100%",
            position: "relative",
            filter: "brightness(50%)",
            objectFit: "cover",
          }}
          src={img}
          alt={labelImg}
          onLoad={handleImageLoad}
        />
      )) ||
        (imgDetail && (
          <Box
            component="img"
            sx={{
              display: "block",
              maxWidth: "100%",
              height: "auto",
              overflow: "hidden",
              width: "100%",
              position: "relative",
              filter: "brightness(50%)",
              objectFit: "cover",
              transform: imageLoaded ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.5s ease-in-out",
            }}
            src={imgDetail.images[0].imagePath}
            alt={labelImg}
            onLoad={handleImageLoad}
          />
        ))}
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
      <Header
        title="AutoCar"
        state={state}
        setState={setState}
        colorHeader={colorHeader}
      />
    </Box>
  );
}
