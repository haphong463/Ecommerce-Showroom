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
import { getBrandList } from "../Brand/BrandLibrary";

export const OrderFormField = ({ formikProps }) => {
  const [brandList, setBrandList] = useState([]);
  useEffect(() => {
    getBrandList().then((data) => {
      setBrandList(data);
    });
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FastField
          name="modelName"
          id="modelName"
          as={TextField}
          fullWidth
          label="Model Number*"
          helperText={
            formikProps.touched.modelName && formikProps.errors.modelName
          }
          error={
            formikProps.touched.modelName && !!formikProps.errors.modelName
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel shrink>Brand</InputLabel>
          <Select label="Brand" defaultValue="Select brand">
            <MenuItem disabled value="Select brand">
              Select brand
            </MenuItem>
            {brandList.map((item) => (
              <MenuItem key={item.brandId} value={item.brandId}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FastField
          name="price"
          id="price"
          as={TextField}
          fullWidth
          label="Price*"
          helperText={formikProps.touched.price && formikProps.errors.price}
          error={formikProps.touched.price && !!formikProps.errors.price}
        />
      </Grid>
      <Grid item xs={12}>
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
