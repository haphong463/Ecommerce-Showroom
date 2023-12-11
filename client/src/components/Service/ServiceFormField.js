// BrandFormFields.jsx
import React from "react";
import { FastField } from "formik";
import { Grid, TextField } from "@mui/material";

export const ServiceFormField = ({ formikProps }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FastField
          name="name"
          id="name"
          as={TextField}
          fullWidth
          label="Name*"
          helperText={formikProps.touched.name && formikProps.errors.name}
          error={formikProps.touched.name && !!formikProps.errors.name}
        />
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
          name="description"
          id="description"
          as={TextField}
          fullWidth
          label="Desctipion*"
          multiline
          rows={4}
          helperText={
            formikProps.touched.description && formikProps.errors.description
          }
          error={
            formikProps.touched.description && !!formikProps.errors.description
          }
        />
      </Grid>
    </Grid>
  );
};
