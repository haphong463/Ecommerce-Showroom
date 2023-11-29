// DetailPage.js
import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
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
export const VehicleDetails = () => {
  const { productId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const productDetails = {
    title: "Product Title",
    description: "Product Description",
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D",
    ],
  };
  const infoArray = [
    { icon: <DriveEtaIcon />, title: "Name", value: productDetails.title },
    {
      icon: <CategoryIcon />,
      title: "Model ID",
      value: "Model ID Placeholder",
    },
    {
      icon: <LocalGasStationIcon />,
      title: "Fuel Type",
      value: productDetails.fuelType,
    },
    {
      icon: <CalendarTodayIcon />,
      title: "Manufacturing Year",
      value: productDetails.manufacturingYear,
    },
    { icon: <ColorLensIcon />, title: "Color", value: productDetails.color },
    {
      icon: <SpeedIcon />,
      title: "Mileage",
      value: `${productDetails.mileage} km`,
    },
    {
      icon: <CommuteIcon />,
      title: "Transmission Type",
      value: productDetails.transmissionType,
    },
    {
      icon: <EmojiTransportationIcon />,
      title: "Engine Type",
      value: productDetails.engineType,
    },
    {
      icon: <SettingsInputComponentIcon />,
      title: "Number of Seats",
      value: productDetails.numberOfSeats,
    },
    {
      icon: <PeopleAltIcon />,
      title: "Is Used",
      value: productDetails.isUsed ? "Yes" : "No",
    },
    {
      icon: <EventAvailableIcon />,
      title: "Purchase Date",
      value: productDetails.purchaseDate,
    },
    {
      icon: <MonetizationOnIcon />,
      title: "Purchase Price",
      value: `$${productDetails.purchasePrice}`,
    },
    {
      icon: <CheckCircleIcon />,
      title: "Status",
      value: productDetails.status,
    },
  ];
  // Cấu hình cho slider
  const sliderSettings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setActiveIndex(next);
    },
    customPaging: function (i) {
      // Sử dụng hình ảnh thay vì dấu chấm
      return (
        <img
          src={productDetails.images[i]}
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

  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
      </Box>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box sx={{ ml: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Slider {...sliderSettings}>
                {productDetails.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      style={{ width: "100%" }}
                      className="img-thumbnail"
                    />
                  </div>
                ))}
              </Slider>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box mt={2}>
                <Typography variant="h6">Vehicle Information</Typography>
                <Grid container spacing={2}>
                  {infoArray.map((info, index) => (
                    <Grid item xs={6} key={index}>
                      {info.icon}
                      <Typography variant="body2">
                        {info.title}: {info.value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
