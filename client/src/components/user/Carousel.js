import React from "react";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, Typography } from "@mui/material";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export const Carousel = ({ images, state, setState }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleImageLoad = (index) => {
    // Đặt state khi hình ảnh được tải
    setState((prev) => {
      const updatedImagesLoaded = [...prev.imagesLoaded];
      updatedImagesLoaded[index] = true;
      return { ...prev, imagesLoaded: updatedImagesLoaded };
    });
  };
  return (
    <>
      <AutoPlaySwipeableViews
        interval={3000}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label} style={{ position: "relative" }}>
            {Math.abs(activeStep - index) <= 2 ? (
              <>
                <Box
                  component="img"
                  sx={{
                    height: "100vh",
                    display: "block",
                    maxWidth: "100%",
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    filter: "brightness(40%)", // Giảm độ sáng
                  }}
                  src={step.imgPath}
                  alt={step.label}
                  onLoad={() => handleImageLoad(index)}
                />
                {state.imagesLoaded[index] && (
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
                    <Typography
                      variant="h1"
                      sx={{
                        mb: 2,
                        fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                      }}
                      component="div"
                    >
                      {step.label}
                    </Typography>
                    <Button variant="contained" size="large">
                      View More
                    </Button>
                  </Box>
                )}
              </>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      {state.imagesLoaded[activeStep] && ( // Hiển thị button khi hình ảnh tại activeStep đã tải
        <MobileStepper
          style={{ background: "transparent" }}
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            background: "transparent",
            "& .MuiMobileStepper-progress": {
              backgroundColor: "#888585",
            },
            "& .css-5xe99f-MuiLinearProgress-bar1": {
              backgroundColor: theme.palette.common.white,
            },
          }}
          variant="progress"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              sx={{
                color: "white",
              }}
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              sx={{
                color: "white",
              }}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      )}
    </>
  );
};
