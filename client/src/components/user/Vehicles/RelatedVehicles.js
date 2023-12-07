import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  CardMedia,
  Stack,
  CardActions,
  Button,
  Avatar,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  LocalGasStation as LocalGasStationIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../assets/styles/slick.css";
import { getVehicles } from "../../Vehicle/VehicleLibrary";
import { useNavigate, useParams } from "react-router-dom";
const RelatedVehicles = ({ brandId }) => {
  const { id } = useParams();
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();
  const sliderSettings = {
    infinite: true,
    slidesToShow: related.length > 3 ? 3 : related.length,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 2,
          centerPadding: "20%", // Adjust as needed for different breakpoints
        },
      },
      {
        breakpoint: 900,
        settings: {
          arrows: false,
          slidesToShow: 2,
          centerPadding: "15%", // Adjust as needed for different breakpoints
        },
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 1,
          centerPadding: "10%", // Adjust as needed for different breakpoints
        },
      },
    ],
    cssEase: "linear",
  };
  useEffect(() => {
    getVehicles().then((data) => {
      setRelated(
        data.filter((item) => {
          return (
            item.brand.brandId === brandId && item.vehicleID !== Number(id)
          );
        })
      );
    });
  }, [id]);
  return (
    related.length > 0 && (
      <Box sx={{ my: 4 }} component="section">
        <Typography
          variant="h4"
          align="center"
          marginBottom={3}
          className="title-specs"
        >
          <span className="title-text">Other Vehicles</span>
        </Typography>
        <Slider {...sliderSettings}>
          {related.map((item, index) => (
            <Card
              key={index}
              elevation={3}
              sx={{
                boxShadow: "none",
                width: "100%", // Set the width to 100%
              }}
            >
              <Avatar
                src={item.images[0].imagePath}
                variant="square"
                sx={{
                  height: "200px",
                  width: "100%",
                  "& > img": {
                    objectFit: "cover",
                  },
                }}
                className="img-thumbnail"
              />
              <CardContent>
                <Stack>
                  <Typography variant="body2" color="error">
                    ${item.price}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 0 }}>
                    {item.name}
                  </Typography>
                </Stack>
                <Stack sx={{ mt: 1 }} direction="row" spacing={2}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <SpeedIcon /> {item.mileage} km
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <SettingsIcon />
                    {item.transmissionType}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <LocalGasStationIcon /> {item.fuelType}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<RemoveRedEyeIcon />}
                  variant="contained"
                  color="info"
                  fullWidth
                  onClick={() => {
                    navigate(`/vehicle/${item.vehicleID}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          ))}
        </Slider>
      </Box>
    )
  );
};

export default RelatedVehicles;
