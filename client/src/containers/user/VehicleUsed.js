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
  Container,
  Pagination,
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
import { DataContext } from "../../context/DataContext";

export function VehicleUsed() {
  const { vehicleData, setVehicleData } = useContext(VehicleContext);
  const { searchData } = useContext(DataContext);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usedCar, setUsedCar] = useState([]);
  const vehiclesPerPage = 4; // Số lượng phương tiện trên mỗi trang

  useEffect(() => {
    getVehicles().then((res) => {
      if (res.data && res.data.length > 0) {
        // Lọc phương tiện đã qua sử dụng
        const usedCars = res.data.filter((vehicle) => vehicle.isUsed === false);
        setUsedCar(usedCars);

        // Set dữ liệu phương tiện vào context
        setVehicleData(res.data);
      }
    });
  }, [setVehicleData]);

  const openImageDialog = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const closeImageDialog = () => {
    setSelectedImage(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = (searchData.length > 0 ? searchData : usedCar).slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );

  const totalPages = Math.ceil(
    (searchData.length > 0 ? searchData : usedCar).length / vehiclesPerPage
  );
  return (
    <LayoutUser>
      <Box
        component="section"
        sx={{
          m: 10,
          height: usedCar.length > 0 || searchData.length > 0 ? "100%" : "90vh",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Filter usedVehicle={usedCar} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {currentVehicles.map((vehicle) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={vehicle.vehicleID}
                    >
                      <Card elevation={3}>
                        {vehicle.images && vehicle.images.length > 0 && (
                          <CardMedia
                            component="img"
                            src={vehicle.images[0].imagePath}
                            alt={vehicle.name}
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                            onClick={() =>
                              openImageDialog(vehicle.images[0].imagePath)
                            }
                          />
                        )}
                        <CardContent>
                          <Stack>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Typography variant="body2" color="error">
                                ${vehicle.price}
                              </Typography>
                              <Typography variant="body2">Used</Typography>
                            </Stack>
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
                            variant="contained"
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
            <Grid item xs={12}>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="secondary"
                  showFirstButton
                  showLastButton
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
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
