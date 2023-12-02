import {
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const Filter = () => {
  return (
    <Grid item xs={12} md={2}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
            textAlign: "center",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Filter
        </Typography>
        <Stack spacing={2}>
          <TextField fullWidth label="Name" variant="outlined" />
          <TextField fullWidth label="Model ID" variant="outlined" />
          <TextField fullWidth label="Color" variant="outlined" />
          <TextField
            fullWidth
            label="Mileage"
            variant="outlined"
            type="number"
          />
          <TextField fullWidth label="Engine Type" variant="outlined" />
          <TextField fullWidth label="Transmission Type" variant="outlined" />
          <TextField fullWidth label="Fuel Type" variant="outlined" />
          <TextField
            fullWidth
            label="Number of Seats"
            variant="outlined"
            type="number"
          />
          <Select fullWidth label="Brand" defaultValue="1" variant="outlined">
            <MenuItem value={"1"}>Brand 1</MenuItem>
            <MenuItem value={"2"}>Brand 2</MenuItem>
          </Select>
        </Stack>
      </Paper>
    </Grid>
  );
};
