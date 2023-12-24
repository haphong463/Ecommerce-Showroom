import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  LocalGasStation as LocalGasStationIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

import { useEffect, useState } from "react";
import { warningMessage } from "../../Message";

// Rest of the imports...

export function VehicleItem({
  vehicle,
  navigate,
  isList,
  setCountItemCompare,
}) {
  const [isComparing, setComparing] = useState(false);

  useEffect(() => {
    // Kiểm tra xem xe đã được thêm vào danh sách so sánh hay chưa
    const storedComparison = localStorage.getItem("comparisonList");
    if (storedComparison) {
      const comparisonList = JSON.parse(storedComparison);
      setComparing(
        comparisonList.some((v) => v.vehicleID === vehicle.vehicleID)
      );
    }
  }, [vehicle.vehicleID]);

  const handleCompareClick = () => {
    const storedComparison = localStorage.getItem("comparisonList");
    let comparisonList = storedComparison ? JSON.parse(storedComparison) : [];

    if (isComparing) {
      // Loại bỏ xe khỏi danh sách so sánh
      comparisonList = comparisonList.filter(
        (v) => v.vehicleID !== vehicle.vehicleID
      );
      setComparing(false);
    } else {
      if (comparisonList.length >= 2) {
        warningMessage("Only 2 items can be compared!");
        return;
      }
      comparisonList.push(vehicle);
      setComparing(true);
    }
    setCountItemCompare(comparisonList.length);
    localStorage.setItem("comparisonList", JSON.stringify(comparisonList));
  };
  return (
    <Card
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: isList ? "row" : "column",
        width: isList ? "100%" : "auto", // Set full width if isList is true
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      {!isList ? (
        <>
          {/* Image on top for list view */}
          {vehicle.images && vehicle.images.length > 0 && (
            <CardActionArea
              onClick={() => navigate(`/vehicle/${vehicle.vehicleID}`)}
            >
              <CardMedia
                component="img"
                src={vehicle.images[0].imagePath}
                alt={vehicle.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            </CardActionArea>
          )}
          <CardContent>
            {/* Info below image for list view */}
            <Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2" color="error">
                  {vehicle.price > 0
                    ? vehicle.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    : "Updating..."}
                </Typography>
                <Tooltip title={!isComparing ? "Compare" : "Cancel compare"}>
                  <IconButton
                    size="small"
                    color={isComparing ? "warning" : "inherit"}
                    variant="contained"
                    onClick={handleCompareClick}
                  >
                    <CompareArrowsIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Typography variant="h6" sx={{ mt: 0 }}>
                {vehicle.name}
              </Typography>
              <Stack sx={{ mt: 1 }} direction="row" spacing={2}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <SpeedIcon /> {vehicle.mileage} km
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <SettingsIcon />
                  {vehicle.transmissionType}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <LocalGasStationIcon /> {vehicle.fuelType}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </>
      ) : (
        <>
          {/* Image on left for grid view */}
          {vehicle.images && vehicle.images.length > 0 && (
            <CardActionArea
              sx={{
                width: "200px",
              }}
              onClick={() => navigate(`/vehicle/${vehicle.vehicleID}`)}
            >
              <CardMedia
                component="img"
                src={vehicle.images[0].imagePath}
                alt={vehicle.name}
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            </CardActionArea>
          )}
          <CardContent sx={{ flex: 1 }}>
            {/* Info on right for grid view */}
            <Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body1" color="error">
                  {vehicle.price > 0
                    ? vehicle.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    : "Updating..."}
                </Typography>
                <Tooltip title={!isComparing ? "Compare" : "Cancel compare"}>
                  <IconButton
                    size="small"
                    color={isComparing ? "warning" : "inherit"}
                    variant="contained"
                    onClick={handleCompareClick}
                  >
                    <CompareArrowsIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Typography variant="h6" sx={{ mt: 0 }}>
                {vehicle.name}
              </Typography>
              <Stack sx={{ mt: 1 }} direction="row" spacing={2}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <SpeedIcon /> {vehicle.mileage} km
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <SettingsIcon />
                  {vehicle.transmissionType}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <LocalGasStationIcon /> {vehicle.fuelType}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </>
      )}
    </Card>
  );
}
