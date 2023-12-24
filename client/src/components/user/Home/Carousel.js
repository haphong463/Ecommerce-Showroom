import React from "react";
import { Box, Typography, Button } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Carousel from "react-material-ui-carousel";

export const CarouselComponent = ({ images, state, setState }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleImageLoad = (index) => {
    // Đặt state khi hình ảnh được tải
    setState((prev) => {
      const updatedImagesLoaded = [...prev.imagesLoaded];
      updatedImagesLoaded[index] = true;
      return { ...prev, imagesLoaded: updatedImagesLoaded };
    });
  };

  return (
    <Box sx={{}}>
      <Carousel
        animation="slide"
        index={activeStep}
        onChangeIndex={setActiveStep}
        navButtonsAlwaysVisible
        fullHeightHover
      >
        {images.map((step, index) => (
          <div key={step.label} style={{ position: "relative" }}>
            <Box
              component={"img"}
              src={step.imgPath}
              alt={step.label}
              onLoad={() => handleImageLoad(index)}
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                filter: "brightness(40%)",
              }}
            />
            {state.imagesLoaded[index] && (
              <Box
                sx={{
                  position: "absolute",
                  top: ["60%", "60%", "60%", "50%"],
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#fff",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    mb: 2,
                    fontSize: {
                      xs: "1rem",
                      sm: "1.5rem",
                      md: "2rem",
                      lg: "2.5rem",
                    },
                  }}
                  component="div"
                >
                  {step.label}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: {
                      md: "1.5rem",
                      xs: "0.5rem",
                    },
                  }}
                >
                  View More
                </Button>
              </Box>
            )}
          </div>
        ))}
      </Carousel>
    </Box>
  );
};
