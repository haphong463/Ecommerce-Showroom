import React from "react";
import { LayoutUser } from "../../layout/LayoutUser";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";

export const About = () => {
  return (
    <LayoutUser
      img="https://wallpapercave.com/wp/wp3368288.jpg"
      title="About us"
    >
      <Box sx={{ mb: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid
              item
              xs={6}
              component="img"
              src="https://plus.unsplash.com/premium_photo-1661274053070-5db388804ccb?q=80&w=800&h=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Grid item xs={6}>
              <Typography variant="h5">
                <span className="title-text">
                  AutoCar - THE NUMBER 1 CHOICE FOR CAR ENTHUSIASTS
                </span>
              </Typography>
              <Divider
                sx={{
                  border: "1px solid #333",
                }}
              />
              <Typography variant="h6" textAlign="justify" mt={3}>
                Welcome to AutoCar, where passion meets performance. As the
                leading destination for car enthusiasts, we take pride in
                delivering a curated experience for those who share a deep love
                for automobiles. Our commitment to excellence is reflected in
                every aspect of AutoCar, making us the number one choice for
                individuals who appreciate the finer details of automotive
                culture.
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={5}>
            <Grid item xs={6}>
              <Typography variant="h5">
                <span className="title-text">
                  IGNITING THE DRIVE FOR CAR ENTHUSIASTS
                </span>
              </Typography>
              <Divider
                sx={{
                  border: "1px solid #333",
                }}
              />
              <Typography variant="h6" textAlign="justify" mt={3}>
                Embark on a journey with AutoCar, the ultimate destination where
                passion and performance converge. We stand as the forefront for
                car enthusiasts, presenting a meticulously curated experience
                for those who harbor a profound love for automobiles. Our
                unwavering commitment to excellence resonates in every facet of
                AutoCar, solidifying our position as the premier choice for
                individuals who discern and cherish the finer details of
                automotive culture.
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              component="img"
              src="https://images.unsplash.com/photo-1462727631764-e248a903e9dc?q=80&w=800&h=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Grid>
        </Container>
      </Box>
    </LayoutUser>
  );
};
