import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import React from "react";

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
      sx={{ backgroundColor: "#333", color: "#fff", padding: 10 }}
    >
      <Container>
        <Grid container spacing={2}>
          {/* Company Column */}
          <FooterColumn
            title="Company"
            content="AutoCar, a diverse automotive showroom exuding confidence and sophistication. We offer customers a perfect car shopping experience with a wide selection from leading global brands."
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
    </Box>
  );
};
