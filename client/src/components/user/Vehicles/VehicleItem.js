import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  LocalGasStation as LocalGasStationIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export function VehicleItem({ vehicle, openImageDialog, navigate }) {
  return (
    <Grid item xs={12} sm={6} lg={4} key={vehicle.vehicleID}>
      <Card elevation={3}>
        {vehicle.images && vehicle.images.length > 0 && (
          <CardMedia
            component="img"
            src={vehicle.images[0].imagePath}
            alt={vehicle.name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
            onClick={() => openImageDialog(vehicle.images[0].imagePath)}
          />
        )}
        <CardContent>
          <Stack>
            <Typography variant="body2" color="error">
              ${vehicle.price}
            </Typography>
            <Typography variant="h6" sx={{ mt: 0 }}>
              {vehicle.name}
            </Typography>
          </Stack>
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
        </CardContent>
        <CardActions>
          <Button
            startIcon={<RemoveRedEyeIcon />}
            variant="contained"
            fullWidth
            onClick={() => navigate(`/vehicle/${vehicle.vehicleID}`)}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
