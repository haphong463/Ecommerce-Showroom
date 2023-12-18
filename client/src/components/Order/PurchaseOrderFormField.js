// BrandFormFields.jsx
import React, { useEffect, useState } from "react";
import { FastField } from "formik";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getVehicles } from "../Vehicle/VehicleLibrary";
export const OrderFormField = ({ formikProps }) => {
  const [vehicleList, setVehicleList] = useState([]);

  const handleChangeInfo = (e) => {
    const vehicleInfo = vehicleList.find(
      (item) => item.vehicleID === e.target.value
    );
    formikProps.setFieldValue("brandId", vehicleInfo.brand.name);
    formikProps.setFieldValue("modelName", vehicleInfo.modelId);
    formikProps.setFieldValue("price", vehicleInfo.price);
  };
  useEffect(() => {
    getVehicles().then((data) => {
      setVehicleList(data);
    });
  }, []);
  console.log(formikProps);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Model Number</InputLabel>
          <Select
            name="modelName"
            id="modelName"
            defaultValue="Select model number"
            onChange={handleChangeInfo}
          >
            <MenuItem disabled value="Select model number">
              Select model number
            </MenuItem>
            {vehicleList.map((item) => {
              return (
                <MenuItem key={item.vehicleID} value={item.vehicleID}>
                  {item.modelId}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FastField
          name="brandId"
          id="brandId"
          as={TextField}
          fullWidth
          label="Brand*"
          disabled
          helperText={formikProps.touched.brandId && formikProps.errors.brandId}
          error={formikProps.touched.brandId && !!formikProps.errors.brandId}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FastField
          name="price"
          id="price"
          as={TextField}
          fullWidth
          disabled
          label="Price*"
          helperText={formikProps.touched.price && formikProps.errors.price}
          error={formikProps.touched.price && !!formikProps.errors.price}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FastField
          name="quantity"
          id="quantity"
          as={TextField}
          fullWidth
          label="Quantity*"
          helperText={
            formikProps.touched.quantity && formikProps.errors.quantity
          }
          error={formikProps.touched.quantity && !!formikProps.errors.quantity}
        />
      </Grid>
    </Grid>
  );
};
