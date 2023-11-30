import React, { useContext, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import { Footer } from "../../components/user/Footer";
import { Main } from "../../components/user/Main";
import { DataContext } from "../../context/DataContext";
import { getVehicles } from "../../components/Vehicle/VehicleLibrary";
import { LayoutUser } from "../../layout/LayoutUser";

export function Vehicles() {
  const { vehicleData, setVehicleData } = useContext(DataContext);
  useEffect(() => {
    getVehicles().then((res) => {
      if (res.data.length > 0) {
        setVehicleData(res.data);
      }
    });
  }, []);
  return (
    <LayoutUser
      title="Vehicles"
      description="Discover elegance at AutoCar, where a diverse range of top-quality vehicles awaits. From stylish sedans to powerful SUVs, find your perfect companion for every journey. Step into our showroom and experience unmatched service, ensuring your satisfaction at every turn."
      img="https://images.unsplash.com/photo-1608369010965-2a946b0130f4?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      labelImg="Vehicle Banner"
    >
      <Box component="section" sx={{ mt: 10, height: "100vh" }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {/* Filter Section (Left Column) */}
            <Grid item xs={12} md={2}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    textAlign: "center",
                    letterSpacing: 3,
                    textTransform: "uppercase",
                  }}
                >
                  Filter
                </Typography>
                <Stack spacing={2}>
                  <TextField fullWidth label="Name" variant="outlined" />
                  <TextField fullWidth label="Model ID" variant="outlined" />
                  <TextField fullWidth label="Color" variant="outlined" />
                  <TextField
                    fullWidth
                    label="Mileage"
                    variant="outlined"
                    type="number"
                  />
                  <TextField fullWidth label="Engine Type" variant="outlined" />
                  <TextField
                    fullWidth
                    label="Transmission Type"
                    variant="outlined"
                  />
                  <TextField fullWidth label="Fuel Type" variant="outlined" />
                  <TextField
                    fullWidth
                    label="Number of Seats"
                    variant="outlined"
                    type="number"
                  />
                  <Select
                    fullWidth
                    label="Brand"
                    defaultValue="1"
                    variant="outlined"
                  >
                    <MenuItem value={"1"}>Brand 1</MenuItem>
                    <MenuItem value={"2"}>Brand 2</MenuItem>
                    {/* Add more brands as needed */}
                  </Select>
                </Stack>
                {/* Add components for other filter fields (e.g., checkboxes, radio buttons) */}
              </Paper>
            </Grid>

            {/* Vehicle List Section (Right Column) */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {vehicleData.map((vehicle) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={vehicle.vehicleID}>
                      <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                        {vehicle.images && vehicle.images.length > 0 && (
                          <img
                            src={vehicle.images[0].imagePath}
                            alt={vehicle.name}
                            style={{
                              width: "100%",
                              height: "20vh",
                              objectFit: "contain",
                            }}
                          />
                        )}
                        <Typography variant="h6" sx={{ mt: 2 }}>
                          {vehicle.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Price: ${vehicle.price}
                        </Typography>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LayoutUser>
  );
}
