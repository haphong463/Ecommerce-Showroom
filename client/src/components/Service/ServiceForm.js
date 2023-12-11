// ServiceForm.jsx
import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { ServiceContext } from "../../context/ServiceContext";
import {
  generateValidationSchemaService,
  postService,
  putService,
} from "./ServiceLibrary";
import { successToast } from "../Message";
import { ServiceFormField } from "./ServiceFormField";

const ServiceForm = () => {
  const { onClose, setServiceData, openServiceForm, service } =
    useContext(ServiceContext);
  const initialValues = {
    name: service?.name ?? "",
    description: service?.description ?? "",
    price: service?.price ?? "",
  };
  const validationSchema = generateValidationSchemaService();
  const submitAPI = (service, values) => {
    if (!service) {
      postService(values).then((data) => {
        if (data !== null) {
          setServiceData((prev) => [...prev, data]);
          onClose();
          successToast("Create a new Service successfully!");
        }
      });
    } else {
      putService(values, service.serviceId).then((data) => {
        console.log(data);
        if (data) {
          setServiceData((prev) =>
            prev.map((item) =>
              item.serviceId === data.serviceId ? data : item
            )
          );
          onClose();
          successToast("Update a Service successfully!");
        }
      });
    }
  };
  return (
    <Dialog open={openServiceForm} onClose={onClose} maxWidth="100%">
      <DialogTitle
        variant="h3"
        color="text.secondary"
        align="center"
        letterSpacing={10}
      >
        {!service ? "NEW SERVICE" : "EDIT SERVICE"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikBag) => {
            submitAPI(service, values);
          }}
        >
          {(formikProps) => (
            <Form
              onSubmit={formikProps.handleSubmit}
              style={{ marginTop: "10px" }}
            >
              <ServiceFormField formikProps={formikProps} />
              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  disabled={
                    service && (formikProps.isSubmitting || !formikProps.dirty)
                  }
                >
                  {service ? "Save" : "Create"}
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

export default ServiceForm;
