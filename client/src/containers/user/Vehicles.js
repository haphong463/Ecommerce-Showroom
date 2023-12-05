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
  Skeleton,
  useMediaQuery,
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
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

export function Vehicles() {
  const { vehicleData, setVehicleData } = useContext(VehicleContext);
  const { searchData, setSearchData } = useContext(DataContext);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // New loading state
  const vehiclesPerPage = 9; // Số lượng phương tiện trên mỗi trang
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    getVehicles().then((data) => {
      if (data && data.length > 0) {
        let checkIsUsed;
        if (location.pathname === "/vehicles") {
          checkIsUsed = true;
        } else if (location.pathname === "/vehiclesUsed") {
          checkIsUsed = false;
        }
        const newCar = data.filter((vehicle) => vehicle.isUsed === checkIsUsed);
        setSearchData(newCar);
        setVehicleData(newCar);
        setLoading(false); // Set loading to false when data is loaded
      }
    });
  }, [setVehicleData, setSearchData, location]);

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
  const currentVehicles = searchData.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );

  return (
    <LayoutUser>
      <Box
        component="section"
        sx={{
          m: 10,
          height: searchData.length > 0 ? "100%" : "90vh",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Filter vehicles={vehicleData} />
            </Grid>
            <Grid item xs={12}>
              {loading ? (
                // Render skeleton when loading
                <Grid container spacing={2}>
                  {[...Array(vehiclesPerPage)].map((_, index) => (
                    <Grid item xs={12} sm={6} lg={4} key={index}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                        sx={{
                          borderRadius: "12px",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                // Render actual data when not loading
                <Grid container spacing={2}>
                  {currentVehicles.map((vehicle) => (
                    <Grid item xs={12} sm={6} lg={4} key={vehicle.vehicleID}>
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
                              <SpeedIcon /> {vehicle.mileage} km
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
                  ))}
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <Pagination
                  count={Math.ceil(searchData.length / vehiclesPerPage)}
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
