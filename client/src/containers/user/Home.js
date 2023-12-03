import * as React from "react";
import Box from "@mui/material/Box";

import Header from "../../components/user/Header";
import FeaturedSection from "../../components/user/Home/FeaturedSection";
import { Footer } from "../../components/user/Footer";
import { Carousel } from "../../components/user/Carousel";
import { LayoutUser } from "../../layout/LayoutUser";

export function Home() {
  return (
    <LayoutUser home>
      <FeaturedSection />
    </LayoutUser>
  );
}
