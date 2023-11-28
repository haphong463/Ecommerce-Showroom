import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  Stack,
  Breadcrumbs,
} from "@mui/material";
import { styled } from "@mui/system";

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
});

const HoverTypography = styled(Typography)({
  color: "#fff",
  marginBottom: "8px", // Add margin-bottom to create space between items
});

const HoverCard = styled(Card)({
  position: "relative",
  "&:hover": {
    "& .MuiCardContent-root": {
      opacity: 1,
    },
  },
});

export function FeaturedCard({ handleImageLoad, imageLoaded }) {
  return (
    <HoverCard>
      <CardMedia
        component="img"
        height="250"
        image="https://source.unsplash.com/random?wallpapers?auto=format&fit=crop&w=400&h=250&q=60"
        alt="Car Image"
        onLoad={handleImageLoad}
      />
      {imageLoaded && (
        <HoverCardContent className="HoverCardContent">
          <Breadcrumbs separator={<span style={{ color: "#fff" }}>/</span>}>
            <HoverTypography variant="body2" color="text.secondary">
              Automatic
            </HoverTypography>
            <HoverTypography variant="body2" color="text.secondary">
              50,000 miles
            </HoverTypography>
            <HoverTypography variant="body2" color="text.secondary">
              1800cc
            </HoverTypography>
          </Breadcrumbs>

          <HoverTypography variant="h6">Car 1</HoverTypography>
          <HoverTypography variant="body2" color="text.secondary">
            $10,000
          </HoverTypography>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}
