import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import React from "react";
import { Link } from "react-router-dom";
function Copyright(props) {
  return (
    <>
      <Divider
        sx={{
          border: "1px solid",
          my: 2,
        }}
      />
      <Typography variant="body1" color="text.light" align="center" {...props}>
        {"© Copyright  " + new Date().getFullYear() + " "}
        <Link>AutoCar</Link>
        {"."}
      </Typography>
    </>
  );
}
const FooterColumn = ({ title, content }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
      }}
    >
      <DiamondIcon
        sx={{
          mr: 1,
        }}
      />
      <Typography variant="h6">{title}</Typography>
    </Box>
    {content}
  </Grid>
);

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative", // Thay đổi từ "absolute" thành "relative"
        width: "100%",
        backgroundColor: "#003580",
        color: "#fff",
        mt: "auto",
        pt: 10,
        pb: 2,
        bottom: "auto", // Thay đổi từ "0" thành "auto"
      }}
    >
      <Container>
        <Grid container spacing={2}>
          {/* Company Column */}
          <FooterColumn
            title="AutoCar"
            content="AutoCar, a diverse automotive showroom exuding confidence and sophistication."
          />

          {/* Contact Column */}
          <FooterColumn
            title="Contact"
            content={
              <Stack spacing={2}>
                <Typography>Email: contact@example.com </Typography>
                <Typography>Phone: +123 456 7890</Typography>
                <Typography>Address: 123 Street, City</Typography>
              </Stack>
            }
          />

          {/* Nav Column */}
          <FooterColumn
            title="Navigation"
            content={
              <Stack spacing={2}>
                <Typography>Home</Typography>
                <Typography>About</Typography>
                <Typography>Contact</Typography>
              </Stack>
            }
          />

          {/* Work Time Column */}
          <FooterColumn
            title="Work Time"
            content={
              <Stack spacing={2}>
                <Typography> Mon-Fri: 9 AM - 5 PM</Typography>
                <Typography>Sat: 10 AM - 2 PM </Typography>
                <Typography>Sun: Closed</Typography>
              </Stack>
            }
          />
        </Grid>
      </Container>

      <Copyright />
    </Box>
  );
};
