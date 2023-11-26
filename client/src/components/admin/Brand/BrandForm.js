import React, { useContext } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useFormik } from "formik";
import { initialValues, postBrand, validationSchema } from "./BrandLibrary";
import { BrandContext } from "../../../context/BrandContext";
const BrandForm = ({ open, onSetOpen, handleClose }) => {
  const { setData } = useContext(BrandContext);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("file", values.image);
      postBrand(formData).then((res) => {
        setData((prev) => [...prev, res.data]);
      });
      handleClose();
    },
  });
  // const handleChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "image") {
  //     setBrand((prev) => ({
  //       ...prev,
  //       image: e.target.files[0],
  //     }));
  //   } else {
  //     setBrand((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="100%">
      <DialogTitle
        variant="h3"
        color="text.secondary"
        align="center"
        letterSpacing={10}
      >
        NEW BRAND
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} style={{ marginTop: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.name && formik.errors.name}
                error={formik.touched.name && !!formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Desctipion*"
                multiline
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.description && formik.errors.description
                }
                error={
                  formik.touched.description && !!formik.errors.description
                }
              />
            </Grid>

            <Grid item xs={12}>
              <label
                htmlFor="image"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
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
              </label>
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="info"
              // onClick={handleSubmit}
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

export default BrandForm;
