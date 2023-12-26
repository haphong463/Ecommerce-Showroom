import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
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
        sx={{
          height: ["40vh", "auto"],
        }}
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
                height: ["40vh", "auto"],
                objectFit: "cover",
                filter: "brightness(40%)",
              }}
            />
            {state.imagesLoaded[index] && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "10%", // Điều chỉnh giá trị left theo mong muốn
                  transform: "translateY(-50%)", // Giữ tiêu đề ở giữa theo chiều dọc
                  color: "#fff",
                  textAlign: ["left", "left", "left", "left"],
                  width: "60%",
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
                    fontWeight: 700,
                    letterSpacing: 5,
                    textTransform: "uppercase",
                    color: "#fa921f",
                  }}
                  component="div"
                >
                  {step.label}
                </Typography>
                <Divider
                  sx={{
                    border: "4px solid yellow",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      md: "1.4rem",
                      lg: "1.8rem",
                    },
                  }}
                  component="div"
                >
                  {step.desc}
                </Typography>
              </Box>
            )}
          </div>
        ))}
      </Carousel>
    </Box>
  );
};
