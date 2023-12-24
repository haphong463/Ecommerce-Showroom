import React, { useContext, useEffect } from "react";
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
  Tab,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  formFields,
  fuelType,
  generateModelID,
  generateValidationSchema,
  postVehicle,
  putVehicle,
  transmissionType,
} from "./VehicleLibrary";
import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import { VehicleContext } from "../../context/VehicleContext";
import { successToast } from "../Message";
import { getBrandList } from "../Brand/BrandLibrary";
import { VehicleFormFields } from "./VehicleFormFields";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const VehicleForm = ({ open, handleClose, refreshVehicleData }) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [isUsed, setIsUsed] = useState(false);
  const { entry, setVehicle, setVehicleData, vehicleData } =
    useContext(VehicleContext);
  const [brand, setBrand] = useState([]);
  const validationSchema = generateValidationSchema(entry);
  const initialValues = {
    name: entry ? entry.name : "",
    brandId: entry ? entry.brand?.brandId : "",
    manufacturingYear: entry ? entry.manufacturingYear : "",
    color: entry ? entry.color : "",
    mileage: entry ? entry.mileage : "",
    engineType: entry ? entry.engineType : "",
    transmissionType: entry ? entry.transmissionType : "",
    fuelType: entry ? entry.fuelType : "",
    numberOfSeats: entry ? entry.numberOfSeats : "",
    files: entry && entry.images.length > 0 ? null : [],
    isUsed: entry ? entry.isUsed : false,
  };

  console.log(initialValues);
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
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikBag) => {
            const newDay = dayjs(values.purchaseDate).format("YYYY-MM-DD");
            const selectedBrand = brand.find(
              (item) => item.value === values.brandId
            );

            const brandLabel = selectedBrand ? selectedBrand.label : "";
            const modelID = generateModelID(brandLabel, values.name);
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
            if (!entry) {
              const vehicleNameExists = vehicleData.some(
                (item) =>
                  item.name.toLowerCase() === values.name.toLowerCase() &&
                  item.brandId === values.brandId &&
                  item.color === values.color
              );
              if (vehicleNameExists) {
                formikBag.setFieldError(
                  "name",
                  "This name already exists in the vehicle list."
                );
                formikBag.setSubmitting(false);
                return;
              }
              formData.append("modelId", modelID);
              postVehicle(formData).then((data) => {
                if (data) {
                  setVehicleData((prev) => [...prev, data]);
                  successToast("Created a new vehicle successfully");
                  handleClose();
                }
              });
            } else {
              if (values.files === null) {
                formData.append("files", null);
              }
              if (entry.brandId === values.brandId) {
                formData.append("modelId", entry.modelId);
              } else {
                formData.append("modelId", modelID);
              }
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
              <VehicleFormFields
                props={props}
                isUsed={isUsed}
                setIsUsed={setIsUsed}
                touched={touched}
                errors={errors}
                brand={brand}
              />
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
