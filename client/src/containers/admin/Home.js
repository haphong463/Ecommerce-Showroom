import React from "react";
import { Sidebar } from "../../components/admin/Sidebar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Navbar from "../../components/admin/Navbar";
import "../../assets/styles/Dashboard.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Analystic } from "../../components/admin/Analystic";
import CountUp from "react-countup";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
export const Home = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="bg-gray">
      <Navbar />
      <Box height={70} />

      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Paper>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Stack spacing={2} direction="row">
                  <Card
                    sx={{ minWidth: 49 + "%", height: 150 }}
                    className="gradient"
                  >
                    <CardContent>
                      <div style={{ color: "#ffffff", marginTop: "10px" }}>
                        <CreditCardIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#ffffff" }}
                      >
                        <CountUp start={-500} end={500} duration={5} />
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total Earnings
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ minWidth: 49 + "%", height: 150 }}
                    className="gradientlight"
                  >
                    <CardContent>
                      <div style={{ color: "#ffffff", marginTop: "10px" }}>
                        <ShoppingBagIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#ffffff" }}
                      >
                        $900.00
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total Orders
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card>
                    <Stack spacing={2} direction="row">
                      <Box>
                        <StorefrontRoundedIcon
                          sx={{
                            ml: "20px",
                            mt: "20px",
                          }}
                        />
                      </Box>
                      <div className="paddingall">
                        <span className="priceTitle">$203K</span>
                        <br />
                        <span className="priceSubTitle">Total Income</span>
                      </div>
                    </Stack>
                  </Card>
                  <Card>
                    <Stack spacing={2} direction="row">
                      <div className="iconstyleblack">
                        <StorefrontIcon />
                      </div>
                      <div className="paddingall">
                        <span className="priceTitle">$203K</span>
                        <br />
                        <span className="priceSubTitle">Total Income</span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={4} sm={6} xl={8}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    <Analystic />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8} sm={6} xl={4}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    <span className="priceTitle">Notification</span>
                    <Accordion
                      expanded={expanded === "panel1"}
                      onChange={handleChange("panel1")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography sx={{ color: "text.secondary" }}>
                          I am an accordion
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Nulla facilisi. Phasellus sollicitudin nulla et quam
                          mattis feugiat. Aliquam eget maximus est, id dignissim
                          quam.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel2"}
                      onChange={handleChange("panel2")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                      >
                        <Typography sx={{ color: "text.secondary" }}>
                          You are currently not an owner
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Donec placerat, lectus sed mattis semper, neque lectus
                          feugiat lectus, varius pulvinar diam eros in elit.
                          Pellentesque convallis laoreet laoreet.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel3"}
                      onChange={handleChange("panel3")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                      >
                        <Typography sx={{ color: "text.secondary" }}>
                          Filtering has been entirely disabled for whole web
                          server
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Nunc vitae orci ultricies, auctor nunc in, volutpat
                          nisl. Integer sit amet egestas eros, vitae egestas
                          augue. Duis vel est augue.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel4"}
                      onChange={handleChange("panel4")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                      >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                          Personal data
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Nunc vitae orci ultricies, auctor nunc in, volutpat
                          nisl. Integer sit amet egestas eros, vitae egestas
                          augue. Duis vel est augue.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};
