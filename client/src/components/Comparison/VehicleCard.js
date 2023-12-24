import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  return (
    <Card
      elevation={3}
      sx={{
        transition: "transform 0.3s ease-in-out",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      {vehicle.images && vehicle.images.length > 0 && (
        <CardMedia
          component="img"
          src={vehicle.images[0].imagePath}
          alt={vehicle.name}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      )}
      <CardContent>
        <Typography variant="h6" sx={{ mt: 0 }}>
          {vehicle.name}
        </Typography>
      </CardContent>
      <Button
        size="medium"
        variant="contained"
        color="warning"
        onClick={() => navigate(`/vehicle/${vehicle.vehicleID}`)}
        fullWidth
      >
        VIEW DETAIL
      </Button>
    </Card>
  );
};
