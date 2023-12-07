import * as React from "react";
import { LayoutUser } from "../../layout/LayoutUser";
import BrandSection from "../../components/user/Home/BrandSection";
import { FAQ } from "../../components/sub_components/FAQ";
import { Container } from "@mui/material";

export function Home() {
  return (
    <LayoutUser home>
      <Container>
        <BrandSection />
        <FAQ />
      </Container>
    </LayoutUser>
  );
}
