import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const VehicleForm = ({ open, onSetOpen, handleClose, ...props }) => {
  const [selectedFile, setSelectedFile] = useState([]);
  const handleFileChange = (event) => {
    // Handle the file change event and update the state
    const file = Array(event.target.files);
    setSelectedFile(file);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSetOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="100%">
      <DialogTitle variant="h3" color="text.secondary" align="center">
        NEW VEHICLE
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                required
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Brand"
                  defaultValue={"10"}
                >
                  <MenuItem value={"10"}>Brand 1</MenuItem>
                  <MenuItem value={"20"}>Brand 2</MenuItem>
                  <MenuItem value={"30"}>Brand 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="manufacturingYear"
                name="manufacturingYear"
                label="Manufacturing Year"
                type="number"
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="registrationNumber"
                name="registrationNumber"
                label="Registration Number"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth id="color" name="color" label="Color" />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="mileage"
                name="mileage"
                label="Mileage"
                type="number"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="engineType"
                name="engineType"
                label="Engine Type"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="transmissionType"
                name="transmissionType"
                label="Transmission Type"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="fuelType"
                name="fuelType"
                label="Fuel Type"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="numberOfSeats"
                name="numberOfSeats"
                label="Number of Seats"
                type="number"
              />
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                label="Purchased Date"
                sx={{
                  width: "100%",
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="purchasePrice"
                name="purchasePrice"
                label="Purchase Price"
                type="number"
              />
            </Grid>
            <Grid item xs={3}>
              <label
                htmlFor="image"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*" // Limit to image files if needed
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  multiple
                />
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{ width: "100%" }}
                >
                  Upload Image
                </Button>
                {selectedFile && (
                  <span style={{ marginLeft: "8px" }}>{selectedFile.name}</span>
                )}
              </label>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          color="info"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button variant="contained" color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleForm;
