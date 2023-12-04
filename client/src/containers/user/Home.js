import * as React from "react";
import { LayoutUser } from "../../layout/LayoutUser";
import BrandSection from "../../components/user/Home/FeaturedSection";

export function Home() {
  return (
    <LayoutUser home>
      <BrandSection />
    </LayoutUser>
  );
}
