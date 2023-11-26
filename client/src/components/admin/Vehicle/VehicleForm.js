import React, { useState, useCallback } from "react";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { formFields, validationSchema } from "./VehicleLibrary";

const VehicleForm = ({ open, onSetOpen, handleClose }) => {
  const [vehicles, setVehicles] = useState({
    name: "",
    brand: "",
    manufacturingYear: "",
    registrationNumber: "",
    color: "",
    mileage: "",
    engineType: "",
    transmissionType: "",
    fuelType: "",
    numberOfSeats: "",
    purchasedDate: dayjs(new Date()),
    purchasePrice: "",
    image: [],
  });

  const handleChangeInput = (e) => {
    const { name, value, files } = e.target;

    setVehicles((prev) => ({
      ...prev,
      [name]: name === "image" ? files : value,
    }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      validationSchema
        .validate(vehicles)
        .then(() => {
          console.log("Validation passed:", vehicles);
        })
        .catch((error) => {
          console.error("Validation failed:", error.errors);
        });
    },
    [vehicles]
  );

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
            {formFields.map((field) => (
              <Grid item xs={3} key={field.name}>
                {field.type === "select" ? (
                  <FormControl fullWidth>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      label={field.label}
                      name={field.name}
                      onChange={handleChangeInput}
                      value={vehicles[field.name]}
                    >
                      <MenuItem value="">None</MenuItem>
                      {field.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : field.type === "date" ? (
                  <DatePicker
                    label={field.label}
                    sx={{ width: "100%" }}
                    onChange={handleChangeInput}
                    value={vehicles[field.name]}
                  />
                ) : field.type === "file" ? (
                  <label
                    htmlFor={field.name}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="file"
                      id={field.name}
                      name={field.name}
                      accept={field.accept}
                      onChange={handleChangeInput}
                      style={{ display: "none" }}
                      multiple={field.multiple}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      sx={{ width: "100%" }}
                    >
                      {field.label}
                    </Button>
                  </label>
                ) : (
                  <TextField
                    fullWidth
                    id={field.name}
                    name={field.name}
                    label={field.label}
                    onChange={handleChangeInput}
                    type={field.type}
                    value={vehicles[field.name]}
                  />
                )}
              </Grid>
            ))}
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
