import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { deepOrange } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { getFeaturedCar } from "../../Vehicle/VehicleLibrary";
import { FeaturedCard } from "./FeaturedCard";
export function VehicleSection() {
  const [loading, setLoading] = useState(false);
  const [featuredCar, setFeaturedCar] = useState([]);
  useEffect(() => {
    setLoading(true);
    getFeaturedCar().then((data) => {
      console.log(data);
      if (data) {
        setFeaturedCar(data);
        setLoading(false);
      }
    });
  }, []);
  return (
    <>
      <Typography
        variant="h4"
        align="center"
        className="title-specs"
        gutterBottom
        sx={{
          fontSize: ["1.5rem", "2.3rem", "3rem"],
        }}
      >
        <span className="title-text">#Typical types of vehicles</span>
      </Typography>
      <Box
        component="section"
        sx={{
          backgroundColor: "#f3f3f3",
          p: [5, 15],
        }}
      >
        <Grid
          container
          spacing={{
            xs: 2,
            sm: 4,
          }}
        >
          {!loading
            ? featuredCar.map((item, index) => {
                return (
                  <Grid key={index} item sm={6} xs={12} lg={3}>
                    <FeaturedCard vehicle={item} />
                  </Grid>
                );
              })
            : Array.from({ length: 4 }).map((_, index) => {
                return (
                  <Grid key={index} item xs={3}>
                    <Paper elevation={0}>
                      <Card
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          p: 3,
                          mt: 2,
                          borderRadius: "12px",
                          border: "1px solid #333",
                        }}
                        elevation={0}
                      >
                        <Skeleton variant="circular" width={40} height={40} />

                        <CardContent>
                          <Skeleton variant="text" width={100} />
                        </CardContent>
                      </Card>
                    </Paper>
                  </Grid>
                );
              })}
        </Grid>
      </Box>
    </>
  );
}
