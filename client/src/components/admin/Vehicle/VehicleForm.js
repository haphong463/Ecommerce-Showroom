import React from "react";
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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { formFields, generateValidationSchema } from "./VehicleLibrary";
import { FastField, Form, Formik } from "formik";
import { useState } from "react";
const VehicleForm = ({ open, onSetOpen, handleClose }) => {
  const [isUsed, setIsUsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const validationSchema = generateValidationSchema(isEditing);
  const handleChange = () => {
    setIsEditing(!isEditing);
  };
  const initialValues = {
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
    purchasedDate: new Date(),
    purchasePrice: "",
    image: [],
    isUsed: isUsed,
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle
        variant="h3"
        color="text.secondary"
        align="center"
        letterSpacing={10}
      >
        NEW VEHICLE
      </DialogTitle>
      <DialogContent>
        <Box height={10} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values);
          }}
        >
          {({ errors, touched, ...props }) => (
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
                              checked={isUsed}
                              onChange={() => {
                                props.setFieldValue("isUsed", !isUsed);
                                setIsUsed(!isUsed);
                              }}
                            />
                          }
                          label={isUsed ? "New" : "Used"}
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
                            error={
                              touched[field.name] && Boolean(errors[field.name])
                            }
                            label={field.label}
                            name={field.name}
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            value={props.values[field.name]}
                          >
                            {field.options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
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
                                  "image",
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
                          {touched.image && errors.image && (
                            <Typography variant="body2" color="error">
                              {errors.image}
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
                  onClick={handleChange}
                  color="info"
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
