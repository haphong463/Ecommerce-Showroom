// BrandForm.jsx
import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { BrandContext } from "../../../context/BrandContext";
import { postBrand, putBrand, validationSchema } from "./BrandLibrary";
import { BrandFormFields } from "./BrandFormField";

const BrandForm = () => {
  const { onClose, formik, isEditing, setIsEditing, setData, openBrandForm } =
    useContext(BrandContext);

  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    const file = selectedFile;
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  return (
    <Dialog open={openBrandForm} onClose={onClose} maxWidth="100%">
      <DialogTitle
        variant="h3"
        color="text.secondary"
        align="center"
        letterSpacing={10}
      >
        {!isEditing ? "NEW BRAND" : "EDIT BRAND"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={formik.values}
          validationSchema={validationSchema}
          onSubmit={(values, formikBag) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("file", values.image);
            if (!isEditing) {
              postBrand(formData).then((res) => {
                if (res.data) {
                  setData((prev) => [...prev, res.data]);
                  formikBag.resetForm();
                  setPreview();
                  onClose();
                }
              });
            } else {
              putBrand(formData, formik.values.id).then((res) => {
                if (res.data) {
                  setData((prev) =>
                    prev.map((item) =>
                      item.brandId === res.data.brandId ? res.data : item
                    )
                  );
                  setPreview();
                  setIsEditing(false);
                  formikBag.resetForm();
                  onClose();
                }
              });
            }
          }}
        >
          {(formikProps) => (
            <Form
              onSubmit={formikProps.handleSubmit}
              style={{ marginTop: "10px" }}
            >
              <BrandFormFields
                formikProps={formikProps}
                preview={preview}
                setSelectedFile={setSelectedFile}
              />
              <DialogActions>
                <Button type="submit" variant="contained" color="info">
                  Submit
                </Button>
                <Button variant="contained" color="error" onClick={onClose}>
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

export default BrandForm;
