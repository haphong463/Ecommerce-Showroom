import React, { useContext, useEffect } from "react";
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
  Box,
  Switch,
  FormControlLabel,
  Typography,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  formFields,
  generateValidationSchema,
  postVehicle,
  putVehicle,
} from "./VehicleLibrary";
import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import { VehicleContext } from "../../context/VehicleContext";
import { successToast } from "../Message";
import { getBrandList } from "../Brand/BrandLibrary";
const VehicleForm = ({ open, handleClose, refreshVehicleData }) => {
  const [isUsed, setIsUsed] = useState(false);
  const { entry, setVehicle, setVehicleData } = useContext(VehicleContext);
  const [brand, setBrand] = useState([]);
  const validationSchema = generateValidationSchema(entry);
  const initialValues = {
    name: entry ? entry.name : "",
    price: entry ? entry.price : "",
    brandId: entry ? entry.brand?.brandId : "",
    manufacturingYear: entry ? entry.manufacturingYear : "",
    registrationNumber: entry ? entry.registrationNumber : "",
    color: entry ? entry.color : "",
    mileage: entry ? entry.mileage : "",
    engineType: entry ? entry.engineType : "",
    transmissionType: entry ? entry.transmissionType : "",
    fuelType: entry ? entry.fuelType : "",
    numberOfSeats: entry ? entry.numberOfSeats : "",
    purchaseDate: entry ? entry.purchaseDate : new Date(),
    purchasePrice: entry ? entry.purchasePrice : "",
    files: entry && entry.images.length > 0 ? null : [],
    isUsed: entry ? entry.isUsed : false,
    description: entry ? entry.description : "",
  };

  useEffect(() => {
    getBrandList().then((data) => {
      if (data !== null) {
        data.forEach((item) => {
          const newData = {
            value: item.brandId,
            label: item.name,
          };
          setBrand((prev) => [...prev, newData]);
        });
      }
    });
  }, []);
  return (
    <Dialog fullWidth open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle
        variant="h3"
        color="text.secondary"
        align="center"
        letterSpacing={10}
      >
        {entry ? "EDIT VEHICLE" : "NEW VEHICLE"}
      </DialogTitle>
      <DialogContent>
        <Box height={10} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values);
            const newDay = dayjs(values.purchasedDate).format("YYYY-MM-DD");
            let formData = new FormData();
            formFields.map((field) => {
              if (field.name === "files") {
                if (values.files !== null) {
                  values[field.name].forEach((file) => {
                    formData.append(field.name, file);
                  });
                }
              }
              if (field.name === "purchaseDate") {
                formData.append(field.name, newDay);
              }
              formData.append(field.name, values[field.name]);
              return formData;
            });
            formData.append("modelId", "asd");
            if (!entry) {
              postVehicle(formData).then((data) => {
                if (data) {
                  setVehicleData((prev) => [...prev, data]);
                  successToast("Created a new vehicle successfully");
                  handleClose();
                }
              });
            } else {
              formData.append("vehicleID", entry.vehicleID);
              putVehicle(formData, entry.vehicleID).then((data) => {
                if (data !== null) {
                  setVehicle(data);
                  successToast("Updated a vehicle successfully");
                  handleClose();
                  refreshVehicleData();
                }
              });
            }
          }}
        >
          {({ errors, touched, isSubmitting, dirty, ...props }) => (
            <Form>
              <Grid container spacing={2}>
                {formFields.map((field) => {
                  return (
                    <Grid
                      item
                      xs={field.name === "description" ? 12 : 3}
                      key={field.name}
                    >
                      {field.name === "isUsed" ? (
                        <FormControlLabel
                          control={
                            <Switch
                              id="isUsed"
                              name="isUsed"
                              checked={props.values.isUsed}
                              onChange={() => {
                                props.setFieldValue("isUsed", !isUsed);
                                setIsUsed(!isUsed);
                              }}
                            />
                          }
                          label={props.values.isUsed ? "New" : "Used"}
                        />
                      ) : field.type === "select" ? (
                        <FormControl fullWidth>
                          <InputLabel
                            error={
                              touched[field.name] && Boolean(errors[field.name])
                            }
                          >
                            {field.label}
                          </InputLabel>
                          <Select
                            id={field.name}
                            error={
                              touched[field.name] && Boolean(errors[field.name])
                            }
                            label={field.label}
                            name={field.name}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            value={props.values[field.name]}
                          >
                            {brand.map((option, index) => (
                              <MenuItem key={index} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>

                          {touched[field.name] && errors[field.name] ? (
                            <FormHelperText error>
                              {errors[field.name]}
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </FormControl>
                      ) : field.type === "date" ? (
                        <DatePicker
                          label={field.label}
                          sx={{ width: "100%" }}
                          onBlur={props.handleBlur}
                          onChange={(newValue) => {
                            props.setFieldValue(field.name, dayjs(newValue));
                          }}
                          value={dayjs(props.values[field.name])}
                        />
                      ) : field.type === "file" ? (
                        <div>
                          <label
                            htmlFor={field.name}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <input
                              type="file"
                              id={field.name}
                              name={field.name}
                              accept={field.accept}
                              onBlur={props.handleBlur}
                              onChange={(event) => {
                                props.setFieldValue(
                                  "files",
                                  Array.from(event.currentTarget.files)
                                );
                              }}
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
                          {touched.files && errors.files && (
                            <Typography variant="body2" color="error">
                              {errors.files}
                            </Typography>
                          )}
                        </div>
                      ) : (
                        <FastField name={field.name}>
                          {({ field: { name, value, onChange, onBlur } }) => (
                            <>
                              <TextField
                                fullWidth
                                id={name}
                                name={name}
                                label={field.label}
                                multiline={field.name === "description"}
                                rows={field.name === "description" ? 4 : 1}
                                helperText={
                                  touched[field.name] && errors[field.name]
                                    ? errors[field.name]
                                    : ""
                                }
                                error={Boolean(
                                  touched[field.name] && errors[field.name]
                                )}
                                onChange={onChange}
                                onBlur={onBlur}
                                type={field.type}
                                value={value}
                                InputProps={
                                  field.name === "price"
                                    ? {
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            $
                                          </InputAdornment>
                                        ),
                                      }
                                    : undefined
                                }
                              />
                            </>
                          )}
                        </FastField>
                      )}
                    </Grid>
                  );
                })}
              </Grid>
              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  disabled={entry && (isSubmitting || !dirty)}
                >
                  Submit
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleForm;
