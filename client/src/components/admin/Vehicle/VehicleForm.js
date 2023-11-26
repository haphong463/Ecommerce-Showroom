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
  FormHelperText,
} from "@mui/material";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const VehicleForm = ({ open, onSetOpen, handleClose }) => {
  const [vehicles, setVehicles] = useState({
    name: "",
    image: [],
    brand: "",
    manufacturingYear: "",
    registrationNumber: "",
    color: "",
    mileage: "",
    engineType: "",
    transmissionType: "",
    fuelType: "",
    numberOfSeats: "",
    purchasePrice: "",
  });
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setVehicles((prev) => ({
        ...prev,
        image: Array.from(e.target.files),
      }));
    } else {
      setVehicles((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(vehicles);
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="100%">
      <DialogTitle
        variant="h3"
        color="text.secondary"
        align="center"
        letterSpacing={10}
      >
        NEW VEHICLE
      </DialogTitle>
      <DialogContent>
        <FormHelperText error>*All field is required!</FormHelperText>
        <form style={{ marginTop: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name*"
                onChange={handleChangeInput}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Brand*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="brand"
                  onChange={handleChangeInput}
                  label="Brand*"
                  defaultValue=""
                >
                  <MenuItem value="">None</MenuItem>
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
                onChange={handleChangeInput}
                label="Manufacturing Year*"
                type="number"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="registrationNumber"
                name="registrationNumber"
                onChange={handleChangeInput}
                label="Registration Number*"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="color"
                name="color"
                label="Color*"
                onChange={handleChangeInput}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="mileage"
                name="mileage"
                onChange={handleChangeInput}
                label="Mileage*"
                type="number"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="engineType"
                onChange={handleChangeInput}
                name="engineType"
                label="Engine Type*"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="transmissionType"
                name="transmissionType"
                onChange={handleChangeInput}
                label="Transmission Type*"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="fuelType"
                onChange={handleChangeInput}
                name="fuelType"
                label="Fuel Type*"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                onChange={handleChangeInput}
                id="numberOfSeats"
                name="numberOfSeats"
                label="Number of Seats*"
                type="number"
              />
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                label="Purchased Date*"
                sx={{
                  width: "100%",
                }}
                onChange={handleChangeInput}
                defaultValue={dayjs(new Date())}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="purchasePrice"
                name="purchasePrice"
                label="Purchase Price*"
                onChange={handleChangeInput}
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
                  onChange={handleChangeInput}
                  style={{ display: "none" }}
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
              </label>
            </Grid>
          </Grid>
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleForm;
