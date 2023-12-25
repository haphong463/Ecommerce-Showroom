import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Breadcrumbs,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const HoverCardContent = styled(CardContent)({
  opacity: 0,
  transition: "opacity 0.3s",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  background: "rgba(0, 0, 0, 0.7)",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const HoverTypography = styled(Typography)({
  color: "#fff",
  marginBottom: "8px",
  fontSize: [".8rem", "1.1rem", "1.4rem"],
  // Add margin-bottom to create space between items
});

const HoverCard = styled(Card)({
  position: "relative",
  borderRadius: "12px",
  "&:hover": {
    "& .MuiCardContent-root": {
      opacity: 1,
    },
  },
});

export function FeaturedCard({ handleImageLoad, imageLoaded, vehicle }) {
  const navigate = useNavigate();
  return (
    <Card>
      <HoverCard onClick={() => navigate(`/vehicle/${vehicle.vehicleID}`)}>
        <CardMedia
          component="img"
          height="250"
          width="400"
          image={vehicle.images[0].imagePath}
          alt="Car Image"
          onLoad={handleImageLoad}
        />
        <HoverCardContent className="HoverCardContent">
          <Breadcrumbs separator={<span style={{ color: "#fff" }}>/</span>}>
            <HoverTypography color="text.secondary">
              {vehicle.fuelType}
            </HoverTypography>
            <HoverTypography color="text.secondary">
              {vehicle.mileage} km
            </HoverTypography>
            <HoverTypography color="text.secondary">
              {vehicle.transmissionType}
            </HoverTypography>
          </Breadcrumbs>
        </HoverCardContent>
      </HoverCard>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">
            <span className="title-text">{vehicle.name}</span>
          </Typography>
          <Typography variant="h6">
            <span>{vehicle.isUsed ? "Used" : "New"}</span>
          </Typography>
        </Stack>
        <Typography variant="h6" color="text.secondary">
          <span className="price-text">
            {vehicle.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}
