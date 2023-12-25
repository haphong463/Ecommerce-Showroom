import * as React from "react";
import { LayoutUser } from "../../layout/LayoutUser";
import BrandSection from "../../components/user/Home/BrandSection";
import { FAQ } from "../../components/sub_components/FAQ";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  makeStyles,
} from "@mui/material";
import { useTitle } from "../../UseTitle";
import { FeaturedCard } from "../../components/user/Home/FeaturedCard";
import { VehicleSection } from "../../components/user/Home/VehicleSection";
import ReactPlayer from "react-player";
import { DataContext } from "../../context/DataContext";
import Gallery from "../../components/user/Home/Gallery";

export function Home() {
  const { isMobile } = React.useContext(DataContext);
  useTitle("Home");
  return (
    <LayoutUser home>
      <Container
        sx={{
          paddingBottom: 30,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" align="center">
              <span className="title-text">AutoCar</span>
            </Typography>
            <ReactPlayer
              url="http://youtu.be/7pV7tLIr8XM?si=Z3_XQvoEQDlz38-h"
              controls={true}
              width="100%"
              height="90vh"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {isMobile && (
              <Divider
                sx={{
                  border: "1px solid #333",
                }}
              />
            )}
            <Typography variant="h4" align="center">
              <span className="title-text">Hand over the car</span>
            </Typography>
            <ReactPlayer
              url="http://youtube.com/shorts/H14YU68NKHo?si=AjT1kiOjfNpQQdZv"
              controls={true}
              width="100%"
              height="90vh"
            />
          </Grid>
        </Grid>
      </Container>
      <VehicleSection />
      <BrandSection />
      <FAQ />
      <Gallery />
    </LayoutUser>
  );
}
