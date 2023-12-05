import * as React from "react";
import { LayoutUser } from "../../layout/LayoutUser";
import BrandSection from "../../components/user/Home/BrandSection";

export function Home() {
  return (
    <LayoutUser home>
      <BrandSection />
    </LayoutUser>
  );
}
