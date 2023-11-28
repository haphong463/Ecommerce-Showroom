import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Typography } from "@mui/material";
import Header from "../../components/user/Header";
import FeaturedSection from "../../components/user/Home/FeaturedSection";
import { Footer } from "../../components/user/Footer";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://source.unsplash.com/random?wallpapers?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

export function Home() {
  const theme = useTheme();
  const [state, setState] = React.useState({
    left: false,
    imagesLoaded: Array(images.length).fill(false), // State để theo dõi hình ảnh đã được tải
  });
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
    <Box>
      <Box
        sx={{
          maxWidth: "100%",
          flexGrow: 1,
          position: "relative",
        }}
      >
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
        <Header title="AutoCar" state={state} setState={setState} />
      </Box>
      <FeaturedSection />
      <Footer />
    </Box>
  );
}
