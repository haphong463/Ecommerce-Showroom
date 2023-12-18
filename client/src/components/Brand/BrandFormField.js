// BrandFormFields.jsx
import React from "react";
import { FastField } from "formik";
import {
  Grid,
  TextField,
  Button,
  Avatar,
  FormLabel,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const BrandFormFields = ({ formikProps, preview, setSelectedFile }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
        <FastField
          name="description"
          id="description"
          as={TextField}
          fullWidth
          label="Desctipion*"
          multiline
          helperText={
            formikProps.touched.description && formikProps.errors.description
          }
          error={
            formikProps.touched.description && !!formikProps.errors.description
          }
        />
      </Grid>

      <Grid item xs={12}>
        <FormLabel
          htmlFor="image"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(event) => {
              setSelectedFile(event.currentTarget.files[0]);
              formikProps.setFieldValue("image", event.currentTarget.files[0]);
            }}
            style={{ display: "none" }}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            sx={{ width: "100%" }}
          >
            Upload Image
          </Button>
        </FormLabel>

        {formikProps.touched.image && (
          <Typography variant="body2" color="error">
            {formikProps.errors.image}
          </Typography>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {preview && (
          <Avatar
            alt="Image Preview"
            src={preview}
            sx={{ width: 100, height: 100 }}
          />
        )}
      </Grid>
    </Grid>
  );
};
