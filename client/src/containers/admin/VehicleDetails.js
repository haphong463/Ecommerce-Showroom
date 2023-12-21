// DetailPage.js
import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
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
} from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  deleteVehicle,
  getVehicleById,
} from "../../components/Vehicle/VehicleLibrary";
import dayjs from "dayjs";
import VehicleForm from "../../components/Vehicle/VehicleForm";
import { VehicleContext } from "../../context/VehicleContext";
import CustomSlider from "../../components/admin/VehicleDetails/ImageList";
import VehicleInformation from "../../components/admin/VehicleDetails/VehicleInformation";
import { dangerMessage } from "../../components/Message";
import Swal from "sweetalert2";
export const VehicleDetails = () => {
  const { id } = useParams();
  const { setEntry, vehicle, setVehicle, setVehicleData } =
    useContext(VehicleContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickOpen = () => {
    setEntry(vehicle);
    setOpen(true);
  };

  const handleClose = () => {
    setEntry();
    setOpen(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this vehicle!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVehicle(id).then((data) => {
          if (data !== null) {
            setVehicleData((prev) =>
              prev.filter((item) => item.vehicleID !== data.vehicleID)
            );
            navigate("/admin/car");
            dangerMessage(`Deleted vehicle successfully.`);
          }
        });
      }
    });
  };

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
      value: vehicle.transmissionType + " Transmission",
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
      value: vehicle.isUsed ? "Used" : "New",
    },
    {
      icon: <EventAvailableIcon />,
      title: "Purchase Date",
      value: dayjs(vehicle.purchaseDate).format("MMMM, DD YYYY"),
    },
    {
      icon: <MonetizationOnIcon />,
      title: "Price",
      value: `$${vehicle.price}`,
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
        navigate("../admin/vehicles");
      }
    });
  };
  useEffect(() => {
    refreshVehicleData();
  }, [id]);
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <VehicleForm
            open={open}
            onSetOpen={setOpen}
            handleClose={handleClose}
            refreshVehicleData={refreshVehicleData}
          />
        </Box>
        <Paper sx={{ width: "100%", p: 3, overflow: "hidden" }}>
          {loading && (
            <Box>
              <Grid container spacing={2}>
                {vehicle.images.length > 0 && (
                  <Grid item xs={12} lg={6}>
                    <CustomSlider vehicleImages={vehicle.images} />
                  </Grid>
                )}

                <Grid item xs={12} lg={6}>
                  <VehicleInformation
                    infoArray={infoArray}
                    handleClickOpen={handleClickOpen}
                    handleDelete={handleDelete}
                    vehicleID={id}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
};
