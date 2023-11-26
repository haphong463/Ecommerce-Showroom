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
import { useFormik } from "formik";
import dayjs from "dayjs";
const validationSchema = yup.object().shape({
  name: yup.string().required("Name field is required"),
  brand: yup.string().required("Brand field is required"),
  image: yup.array().nullable(),
  manufacturingYear: yup.number().required(),
  registrationNumber: yup.string().required(),
  color: yup.string().required(),
  mileage: yup.number().required(),
  engineType: yup.string().required(),
  transmissionType: yup.string().required(),
  fuelType: yup.string().required(),
  numberOfSeats: yup.number().required(),
  purchasePrice: yup.number().required(),
});
const VehicleForm = ({ open, onSetOpen, handleClose, ...props }) => {
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="100%">
      <DialogTitle variant="h3" color="text.secondary" align="center">
        NEW VEHICLE
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} style={{ marginTop: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="brand"
                  label="Brand"
                  defaultValue=""
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={"10"}>Brand 1</MenuItem>
                  <MenuItem value={"20"}>Brand 2</MenuItem>
                  <MenuItem value={"30"}>Brand 3</MenuItem>
                </Select>
                {formik.touched.brand && (
                  <FormHelperText error={Boolean(formik.errors.brand)}>
                    {formik.errors.brand}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="manufacturingYear"
                name="manufacturingYear"
                label="Manufacturing Year"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.manufacturingYear}
                error={
                  formik.touched.manufacturingYear &&
                  Boolean(formik.errors.manufacturingYear)
                }
                helperText={
                  formik.touched.manufacturingYear &&
                  formik.errors.manufacturingYear
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="registrationNumber"
                name="registrationNumber"
                label="Registration Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.registrationNumber}
                error={
                  formik.touched.registrationNumber &&
                  Boolean(formik.errors.registrationNumber)
                }
                helperText={
                  formik.touched.registrationNumber &&
                  formik.errors.registrationNumber
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="color"
                name="color"
                label="Color"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.color}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="mileage"
                name="mileage"
                label="Mileage"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mileage}
                error={formik.touched.mileage && Boolean(formik.errors.mileage)}
                helperText={formik.touched.mileage && formik.errors.mileage}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="engineType"
                name="engineType"
                label="Engine Type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.engineType}
                error={
                  formik.touched.engineType && Boolean(formik.errors.engineType)
                }
                helperText={
                  formik.touched.engineType && formik.errors.engineType
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="transmissionType"
                name="transmissionType"
                label="Transmission Type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.transmissionType}
                error={
                  formik.touched.transmissionType &&
                  Boolean(formik.errors.transmissionType)
                }
                helperText={
                  formik.touched.transmissionType &&
                  formik.errors.transmissionType
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="fuelType"
                name="fuelType"
                label="Fuel Type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fuelType}
                error={
                  formik.touched.fuelType && Boolean(formik.errors.fuelType)
                }
                helperText={formik.touched.fuelType && formik.errors.fuelType}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="numberOfSeats"
                name="numberOfSeats"
                label="Number of Seats"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.numberOfSeats}
                error={
                  formik.touched.numberOfSeats &&
                  Boolean(formik.errors.numberOfSeats)
                }
                helperText={
                  formik.touched.numberOfSeats && formik.errors.numberOfSeats
                }
              />
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                label="Purchased Date"
                sx={{
                  width: "100%",
                }}
                defaultValue={dayjs(new Date())}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="purchasePrice"
                name="purchasePrice"
                label="Purchase Price"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.purchasePrice}
                error={
                  formik.touched.purchasePrice &&
                  Boolean(formik.errors.purchasePrice)
                }
                helperText={
                  formik.touched.purchasePrice && formik.errors.purchasePrice
                }
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
            <Button type="submit" variant="contained" color="info">
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
