import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
export const VehicleItem = ({ image }) => {
  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardHeader
        title="Car 1"
        disableTypography
        sx={{
          fontSize: "14px",
        }}
        color="text.secondary"
      />
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
        loading="lazy"
      />
      <CardContent>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "top",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <LocalGasStationIcon />
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <Rating
          name="read-only"
          value={3.6}
          precision={0.5}
          sx={{ marginTop: "10px" }}
          readOnly
        />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" color="info">
          View details
        </Button>
      </CardActions>
    </Card>
  );
};
