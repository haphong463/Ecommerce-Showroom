import React, { useContext, useEffect, useState } from "react";
import { LayoutUser } from "../../layout/LayoutUser";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getVehicleById } from "../../components/Vehicle/VehicleLibrary";
import { VehicleContext } from "../../context/VehicleContext";
import {
  DriveEta as DriveEtaIcon,
  Category as CategoryIcon,
  LocalGasStation as LocalGasStationIcon,
  CalendarToday as CalendarTodayIcon,
  ColorLens as ColorLensIcon,
  Speed as SpeedIcon,
  Commute as CommuteIcon,
  EmojiTransportation as EmojiTransportationIcon,
  SettingsInputComponent as SettingsInputComponentIcon,
  PeopleAlt as PeopleAltIcon,
  CheckCircle as CheckCircleIcon,
  Phone,
} from "@mui/icons-material";

import RelatedVehicles from "../../components/user/Vehicles/RelatedVehicles";
import { VehicleSpec } from "../../components/user/Vehicles/VehicleSpec";
import { DataContext } from "../../context/DataContext";
import CustomSlider from "../../components/admin/VehicleDetails/ImageList";
import { useTitle } from "../../UseTitle";
import { postAppointment } from "../../components/Appointment/AppointmentLibrary";
import styled from "@emotion/styled";
const StyledImageListItem = styled(ImageListItem)({
  position: "relative",
  overflow: "hidden",
  "&:hover img": {
    filter: "brightness(1.2)",
  },
  transition: "filter 0.3s ease-in-out",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "brightness(0.8)",
  transition: "filter 0.3s ease-in-out",
});
export const VehicleDetails = () => {
  const { id } = useParams();
  const { vehicle, setVehicle } = useContext(VehicleContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const infoArray = [
    {
      icon: <CategoryIcon />,
      title: "Model ID",
      value: vehicle.modelId,
    },
    {
      icon: <LocalGasStationIcon />,
      title: "Fuel Type",
      value: vehicle.fuelType,
    },
    {
      icon: <CalendarTodayIcon />,
      title: "Manufacturing Year",
      value: vehicle.manufacturingYear,
    },
    { icon: <ColorLensIcon />, title: "Color", value: vehicle.color },
    {
      icon: <SpeedIcon />,
      title: "Mileage",
      value: `${vehicle.mileage.toLocaleString("en-US")} km`,
    },
    {
      icon: <CommuteIcon />,
      title: "Transmission Type",
      value: vehicle.transmissionType,
    },
    {
      icon: <EmojiTransportationIcon />,
      title: "Engine Type",
      value: vehicle.engineType,
    },
    {
      icon: <SettingsInputComponentIcon />,
      title: "Number of Seats",
      value: vehicle.numberOfSeats,
    },
    {
      icon: <PeopleAltIcon />,
      title: "Condition",
      value: vehicle.isUsed ? "Used" : "New",
    },
    {
      icon: <CheckCircleIcon />,
      title: "Status",
      value:
        vehicle.status === 0
          ? "Available"
          : vehicle.status === 1
          ? "Unavailable"
          : "",
    },
  ];

  const refreshVehicleData = () => {
    getVehicleById(id).then((data) => {
      if (data !== null) {
        setVehicle(data);
        setLoading(true);
      } else {
        navigate("/vehicles");
      }
    });
  };
  useEffect(() => {
    refreshVehicleData();
  }, [id]);
  useTitle(vehicle.name);
  return (
    loading && (
      <LayoutUser img="">
        <Box
          component="section"
          sx={{
            mb: 30,
          }}
        >
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7} lg={6}>
                <CustomSlider vehicleImages={vehicle.images} />
              </Grid>
              <Grid item xs={12} md={5} lg={6}>
                <Stack
                  flexDirection="column"
                  justifyContent="space-between"
                  height="100%"
                >
                  {/* Stack ở trên cùng */}
                  <Stack>
                    <Typography
                      variant="body1"
                      sx={{
                        userSelect: "none",
                        color: "#b9b1b1",
                      }}
                    >
                      AutoCar
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                      <span className="title-text">
                        {vehicle.brand.name + " " + vehicle.name}
                      </span>
                    </Typography>
                    <Breadcrumbs separator="-">
                      <Typography>
                        {vehicle.mileage.toLocaleString("en-US")}km
                      </Typography>
                      <Typography>{vehicle.fuelType}</Typography>
                      <Typography>
                        {vehicle.transmissionType + " Transmission"}
                      </Typography>
                    </Breadcrumbs>
                    <Typography variant="h5">
                      <span className="price-text">
                        {vehicle.price > 0
                          ? vehicle.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })
                          : "Updating..."}
                      </span>
                    </Typography>
                  </Stack>

                  {/* Stack ở dưới cùng */}
                  <Stack mt={2} spacing={1}>
                    <Link to="tel:+123456789" underline="none">
                      <Button
                        startIcon={<Phone />}
                        variant="contained"
                        color="success"
                        fullWidth
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        Call now 094-214-4124
                      </Button>
                    </Link>
                  </Stack>
                </Stack>
              </Grid>

              {/* Information Grid */}
              <Grid item xs={12}>
                <VehicleSpec infoArray={infoArray} />
              </Grid>
              <Grid item xs={12}>
                <ImageList
                  variant="quilted"
                  cols={vehicle.images.length > 5 ? 3 : 2}
                  gap={8}
                >
                  {vehicle.images.map((item) => (
                    <StyledImageListItem key={item.imagePath}>
                      <StyledImage
                        srcSet={`${item.imagePath}?w=248&fit=crop&auto=format&dpr=1 1x, ${item.imagePath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.imagePath}?w=248&fit=crop&auto=format`}
                        alt={item.imagePath}
                        loading="lazy"
                      />
                    </StyledImageListItem>
                  ))}
                </ImageList>
              </Grid>
              <Grid item xs={12}>
                <RelatedVehicles brandId={vehicle.brand.brandId} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </LayoutUser>
    )
  );
};
