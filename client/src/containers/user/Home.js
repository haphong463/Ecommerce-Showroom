import * as React from "react";
import { LayoutUser } from "../../layout/LayoutUser";
import BrandSection from "../../components/user/Home/BrandSection";
import { FAQ } from "../../components/sub_components/FAQ";
import { Card, Container } from "@mui/material";
import { useTitle } from "../../UseTitle";
import { FeaturedCard } from "../../components/user/Home/FeaturedCard";
import { VehicleSection } from "../../components/user/Home/VehicleSection";

export function Home() {
  useTitle("Home");
  return (
    <LayoutUser home>
      <VehicleSection />
      <BrandSection />
      <FAQ />
    </LayoutUser>
  );
}
