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

import { BrandContext } from "../../context/BrandContext";
import {
  generateValidationSchemaBrand,
  postBrand,
  putBrand,
} from "./BrandLibrary";
import { BrandFormFields } from "./BrandFormField";
import { successToast } from "../Message";

const BrandForm = () => {
  const { onClose, setData, openBrandForm, brand, setBrand } =
    useContext(BrandContext);
  const initialValues = {
    name: brand?.name ?? "",
    description: brand?.description ?? "",
    image: null,
  };
  const validationSchema = generateValidationSchemaBrand(brand);
  const submitAPI = (brand, values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("file", values.image);
    if (!brand) {
      postBrand(formData).then((data) => {
        if (data !== null) {
          setData((prev) => [...prev, data]);
          setPreview();
          onClose();
          successToast("Create a new brand successfully!");
        }
      });
    } else {
      putBrand(formData, brand.brandId).then((data) => {
        if (data) {
          setData((prev) =>
            prev.map((item) => (item.brandId === data.brandId ? data : item))
          );
          setPreview();
          onClose();
          successToast("Update a brand successfully!");
        }
      });
    }
  };
  // preview
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
  // end preview
  return (
    <Dialog open={openBrandForm} onClose={onClose} maxWidth="100%">
      <DialogTitle
        variant="h3"
        color="text.secondary"
        align="center"
        letterSpacing={10}
      >
        {!brand ? "NEW BRAND" : "EDIT BRAND"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikBag) => {
            submitAPI(brand, values);
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
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  disabled={
                    brand && (formikProps.isSubmitting || !formikProps.dirty)
                  }
                >
                  {brand ? "Save" : "Create"}
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
