// DetailPage.js
import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import "./slick.css";
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
import { DataContext } from "../../context/DataContext";
import CustomSlider from "../../components/VehicleDetails/CustomSlider";
import VehicleInformation from "../../components/VehicleDetails/VehicleInformation";
import { dangerMessage } from "../../components/Message";
export const VehicleDetails = () => {
  const { id } = useParams();
  const { setEntry, vehicle, setVehicle, setVehicleData } =
    useContext(DataContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setEntry(vehicle);
    setOpen(true);
  };

  const handleClose = () => {
    setEntry();
    setOpen(false);
  };

  const handleDelete = (id) => {
    deleteVehicle(id).then((res) => {
      if (res.data !== null) {
        setVehicleData((prev) =>
          prev.filter((item) => item.vehicleID !== res.data.vehicleID)
        );
        navigate("../admin/vehicles");
        dangerMessage(`Deleted vehicle successfully.`);
      }
    });
  };
  const [activeIndex, setActiveIndex] = useState(0);

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
  const sliderSettings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setActiveIndex(next);
    },
    customPaging: function (i) {
      // Sử dụng hình ảnh thay vì dấu chấm
      return (
        <img
          src={vehicle.images[i].imagePath}
          alt={`Product ${i + 1}`}
          style={{ width: "50px", height: "50px", marginRight: 5 }} // Set width and height as needed
          className={`dot ${i === activeIndex ? "active" : ""}`}
        />
      );
    },
    appendDots: (dots) => (
      <div>
        <ul style={{ margin: "0", padding: "0" }}>{dots}</ul>
      </div>
    ),
  };
  useEffect(() => {
    getVehicleById(id).then((res) => {
      if (res.data !== null) {
        setVehicle(res.data);
      } else {
        navigate("../admin/vehicles");
      }
    });
  }, [id]);
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
      </Box>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <VehicleForm
          open={open}
          onSetOpen={setOpen}
          handleClose={handleClose}
        />
        <Box sx={{ ml: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomSlider
                vehicleImages={vehicle.images}
                sliderSettings={sliderSettings}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <VehicleInformation
                infoArray={infoArray}
                handleClickOpen={handleClickOpen}
                handleDelete={handleDelete}
                vehicleID={id}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
