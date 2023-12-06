import React, { useContext, useEffect, useState } from "react";
import { LayoutUser } from "../../layout/LayoutUser";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomSlider from "../../components/VehicleDetails/CustomSlider";
import { useNavigate, useParams } from "react-router-dom";
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
  EventAvailable as EventAvailableIcon,
  MonetizationOn as MonetizationOnIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";

import dayjs from "dayjs";
import RelatedVehicles from "../../components/user/Vehicles/RelatedVehicles";
import { VehicleSpec } from "../../components/user/Vehicles/VehicleSpec";
export const VehicleDetails = () => {
  const { id } = useParams();
  const { vehicle, setVehicle } = useContext(VehicleContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const infoArray = [
    { icon: <DriveEtaIcon />, title: "Name", value: vehicle.name },
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
      value: `${vehicle.mileage} km`,
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
      title: "Used/New",
      value: vehicle.isUsed ? "New" : "Used",
    },
    {
      icon: <EventAvailableIcon />,
      title: "Purchase Date",
      value: dayjs(vehicle.purchaseDate).format("MMMM, DD YYYY"),
    },
    {
      icon: <MonetizationOnIcon />,
      title: "Purchase Price",
      value: `$${vehicle.purchasePrice}`,
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
    {
      icon: <DescriptionIcon />,
      title: "Description",
      value: vehicle.description,
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
  return (
    loading && (
      <LayoutUser colorHeader>
        <Box
          component="section"
          sx={{
            mt: 10,
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
                    <Typography variant="h4" gutterBottom>
                      <span className="title-text">{vehicle.name}</span>
                    </Typography>
                    <Breadcrumbs separator="-">
                      <Typography>{vehicle.mileage} km</Typography>
                      <Typography>{vehicle.fuelType}</Typography>
                      <Typography>{vehicle.transmissionType}</Typography>
                    </Breadcrumbs>
                    <Typography variant="h6">
                      <span className="price-text">
                        {vehicle.purchasePrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </Typography>
                  </Stack>

                  {/* Stack ở dưới cùng */}
                  <Stack mt={2}>
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      onClick={() => {
                        // Xử lý khi nút được nhấn
                      }}
                    >
                      Add to cart
                    </Button>
                  </Stack>
                </Stack>
              </Grid>

              {/* Information Grid */}
              <Grid item xs={12}>
                <VehicleSpec infoArray={infoArray} />
              </Grid>
              <Grid item xs={12}>
                <RelatedVehicles />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </LayoutUser>
    )
  );
};
