import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Dialog,
  DialogContent,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  LocalGasStation as LocalGasStationIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { VehicleContext } from "../../context/VehicleContext";
import { getVehicles } from "../../components/Vehicle/VehicleLibrary";
import { LayoutUser } from "../../layout/LayoutUser";
import { Filter } from "../../components/user/Vehicles/Filter";
import { useNavigate } from "react-router-dom";

export function Vehicles() {
  const { vehicleData, setVehicleData } = useContext(VehicleContext);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getVehicles().then((res) => {
      if (res.data && res.data.length > 0) {
        setVehicleData(res.data);
      }
    });
  }, []);
  const openImageDialog = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const closeImageDialog = () => {
    setSelectedImage(null);
  };
  return (
    <LayoutUser
      title="Vehicles"
      img="https://images.unsplash.com/photo-1608369010965-2a946b0130f4?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      labelImg="Vehicle Banner"
    >
      <Box component="section" sx={{ m: 10 }}>
        {/* <Container maxWidth="xl"> */}
        <Grid container spacing={2}>
          <Filter />
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {vehicleData.map((vehicle) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={vehicle.vehicleID}>
                    <Card elevation={3}>
                      {vehicle.images && vehicle.images.length > 0 && (
                        <CardMedia
                          component="img"
                          src={vehicle.images[0].imagePath}
                          alt={vehicle.name}
                          style={{
                            width: "100%",
                            height: "200px", // Thay đổi kích thước theo ý muốn
                            objectFit: "contain", // Sử dụng cover để bóp hình
                          }}
                          onClick={() =>
                            openImageDialog(vehicle.images[0].imagePath)
                          }
                        />
                      )}
                      <CardContent>
                        <Stack>
                          <Typography variant="body2" color="error">
                            ${vehicle.price}
                          </Typography>
                          <Typography variant="h6" sx={{ mt: 0 }}>
                            {vehicle.name}
                          </Typography>
                        </Stack>
                        <Stack sx={{ mt: 1 }} direction="row" spacing={2}>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            <SpeedIcon /> {vehicle.mileage}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            <SettingsIcon />
                            {vehicle.transmissionType}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            <LocalGasStationIcon /> {vehicle.fuelType}
                          </Typography>
                        </Stack>
                      </CardContent>
                      <CardActions>
                        <Button
                          startIcon={<RemoveRedEyeIcon />}
                          varirant="contained"
                          fullWidth
                          onClick={() =>
                            navigate(`/vehicle/${vehicle.vehicleID}`)
                          }
                        >
                          View
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        {/* </Container> */}
      </Box>
      <Dialog open={selectedImage !== null} onClose={closeImageDialog}>
        <DialogContent sx={{ padding: 0 }}>
          <img
            src={selectedImage}
            alt="Full Size"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </LayoutUser>
  );
}
