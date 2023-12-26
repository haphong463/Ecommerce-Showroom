import React from "react";
import { LayoutUser } from "../../layout/LayoutUser";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { useTitle } from "../../UseTitle";

export const About = () => {
  useTitle("About us");
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

            <Grid item xs={12}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.325247630641!2d106.66372207573617!3d10.78638225900862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed23c80767d%3A0x5a981a5efee9fd7d!2zNTkwIMSQLiBDw6FjaCBN4bqhbmcgVGjDoW5nIDgsIFBoxrDhu51uZyAxMSwgUXXhuq1uIDMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCA3MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1703604445647!5m2!1svi!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LayoutUser>
  );
};
