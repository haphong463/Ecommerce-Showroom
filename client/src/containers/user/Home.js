import * as React from "react";
import Box from "@mui/material/Box";

import Header from "../../components/user/Header";
import FeaturedSection from "../../components/user/Home/FeaturedSection";
import { Footer } from "../../components/user/Footer";
import { Carousel } from "../../components/user/Carousel";
import { LayoutUser } from "../../layout/LayoutUser";

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

export function Home() {
  const [state, setState] = React.useState({
    left: false,
    imagesLoaded: Array(images.length).fill(false), // State để theo dõi hình ảnh đã được tải
  });

  return (
    <LayoutUser>
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
    </LayoutUser>
  );
}
