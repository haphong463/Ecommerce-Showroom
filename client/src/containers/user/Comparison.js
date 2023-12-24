// Comparison.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { LayoutUser } from "../../layout/LayoutUser";
import { useTitle } from "../../UseTitle";
import { useNavigate } from "react-router-dom";
import { VehicleInformation } from "../../components/Comparison/VehicleInformation";
import { VehicleCard } from "../../components/Comparison/VehicleCard";

const compareField = (field, vehicle1, vehicle2) => {
  return vehicle1[field] !== vehicle2[field];
};

export const Comparison = () => {
  const [comparedVehicles, setComparedVehicles] = useState([]);

  useEffect(() => {
    const storedComparison = localStorage.getItem("comparisonList");
    if (storedComparison) {
      setComparedVehicles(JSON.parse(storedComparison));
    }
  }, []);

  useTitle("Comparison");

  return (
    <LayoutUser>
      <Box
        sx={{ my: 10, height: comparedVehicles.length > 0 ? "auto" : "90vh" }}
      >
        <Typography
          sx={{ fontSize: ["2rem", "2.5rem"] }}
          gutterBottom
          variant="h6"
          align="center"
          className="title-specs"
        >
          <span className="title-text">Compare Cars</span>
        </Typography>
        <Container maxWidth="lg">
          <Grid container spacing={2} my={4}>
            {comparedVehicles.map((vehicle, index) => (
              <Grid key={index} item xs={6}>
                <VehicleCard vehicle={vehicle} />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2}>
            {comparedVehicles.map((vehicle, index) => (
              <React.Fragment key={vehicle.vehicleID}>
                <Grid item xs={6}>
                  <Stack spacing={2}>
                    <VehicleInformation
                      label="Brand"
                      value={vehicle.brand.name}
                      highlight={
                        index === 1 &&
                        compareField(
                          "brand",
                          comparedVehicles[0],
                          comparedVehicles[1]
                        )
                      }
                    />
                    <VehicleInformation
                      label="Mileage"
                      value={`${vehicle.mileage} km`}
                      highlight={
                        index === 1 &&
                        compareField(
                          "mileage",
                          comparedVehicles[0],
                          comparedVehicles[1]
                        )
                      }
                    />
                    <VehicleInformation
                      label="Transmission Type"
                      value={`${vehicle.transmissionType}`}
                      highlight={
                        index === 1 &&
                        compareField(
                          "transmissionType",
                          comparedVehicles[0],
                          comparedVehicles[1]
                        )
                      }
                    />
                    <VehicleInformation
                      label="Fuel Type"
                      value={`${vehicle.fuelType}`}
                      highlight={
                        index === 1 &&
                        compareField(
                          "fuelType",
                          comparedVehicles[0],
                          comparedVehicles[1]
                        )
                      }
                    />
                    <VehicleInformation
                      label="Number of Seats"
                      value={`${vehicle.numberOfSeats}`}
                      highlight={
                        index === 1 &&
                        compareField(
                          "numberOfSeats",
                          comparedVehicles[0],
                          comparedVehicles[1]
                        )
                      }
                    />
                    <VehicleInformation
                      label="Condition"
                      value={`${vehicle.isUsed ? "Used" : "New"}`}
                      highlight={
                        index === 1 &&
                        compareField(
                          "isUsed",
                          comparedVehicles[0],
                          comparedVehicles[1]
                        )
                      }
                    />
                    <VehicleInformation
                      label="Engine Type"
                      value={`${vehicle.engineType}`}
                      highlight={
                        index === 1 &&
                        compareField(
                          "engineType",
                          comparedVehicles[0],
                          comparedVehicles[1]
                        )
                      }
                    />
                    <VehicleInformation
                      label="Manufacturing Year"
                      value={`${vehicle.manufacturingYear}`}
                      highlight={
                        index === 1 &&
                        compareField(
                          "manufacturingYear",
                          comparedVehicles[0],
                          comparedVehicles[1]
                        )
                      }
                    />
                    <VehicleInformation
                      label="Color"
                      value={`${vehicle.color}`}
                      highlight={
                        index === 1 &&
                        compareField(
                          "color",
                          comparedVehicles[0],
                          comparedVehicles[1]
                        )
                      }
                    />
                  </Stack>
                  {/* ... (repeat for other vehicle information) */}
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          {comparedVehicles.length === 0 && (
            <Typography align="center" paddingTop={25} variant="h4">
              There are no cars to compare.
            </Typography>
          )}
        </Container>
      </Box>
    </LayoutUser>
  );
};
