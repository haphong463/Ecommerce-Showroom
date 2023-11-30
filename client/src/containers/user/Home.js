import * as React from "react";
import Box from "@mui/material/Box";

import Header from "../../components/user/Header";
import FeaturedSection from "../../components/user/Home/FeaturedSection";
import { Footer } from "../../components/user/Footer";
import { Carousel } from "../../components/user/Carousel";

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
  const [state, setState] = React.useState({
    left: false,
    imagesLoaded: Array(images.length).fill(false), // State để theo dõi hình ảnh đã được tải
  });

  return (
    <Box>
      <Box
        sx={{
          maxWidth: "100%",
          flexGrow: 1,
          position: "relative",
        }}
      >
        <Carousel images={images} state={state} setState={setState} />
        <Header title="AutoCar" state={state} setState={setState} />
      </Box>
      <FeaturedSection />
      <Footer />
    </Box>
  );
}
