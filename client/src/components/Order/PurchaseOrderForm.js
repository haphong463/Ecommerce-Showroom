// OrderForm.jsx
import React, { useContext, useEffect, useState } from "react";
import { FastField, Form, Formik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { OrderContext } from "../../context/OrderContext";
import {
  generateValidationSchemaOrder,
  postOrder,
  putOrder,
} from "./PurchaseOrderLibrary";
import { successToast } from "../Message";
import { OrderFormField } from "./PurchaseOrderFormField";
import { getVehicles } from "../Vehicle/VehicleLibrary";

const OrderForm = ({ orderList, setOrderList }) => {
  const { onClose, setOrderData, openOrderForm, order } =
    useContext(OrderContext);
  const initialValues = {
    modelName: order?.modelName ?? "",
    brandId: order?.brandId ?? "",
    price: order?.price ?? "",
    quantity: order?.quantity ?? "",
  };
  const [vehicleList, setVehicleList] = useState([]);
  const handleChangeInfo = (e, formikBag) => {
    const vehicleInfo = vehicleList.find(
      (item) => item.vehicleID === e.target.value
    );
    formikBag.setFieldValue("brandId", vehicleInfo.brand.name);
    formikBag.setFieldValue("modelName", vehicleInfo.modelId);
    formikBag.setFieldValue("price", vehicleInfo.price);
  };
  useEffect(() => {
    getVehicles().then((data) => {
      setVehicleList(data);
    });
  }, []);
  const addRow = (values, formikProps) => {
    setOrderList((prev) => [...prev, values]);
  };

  const validationSchema = generateValidationSchemaOrder();
  const submitAPI = (values, formikProps) => {
    if (!order) {
      addRow(values, formikProps);
      //   postOrder(values).then((data) => {
      //     if (data !== null) {
      //       setOrderData((prev) => [...prev, data]);
      //       onClose();
      //       successToast("Create a new Order successfully!");
      //     }
      //   });
      // } else {
      //   putOrder(values, order.orderId).then((data) => {
      //     console.log(data);
      //     if (data) {
      //       setOrderData((prev) =>
      //         prev.map((item) => (item.orderId === data.OrderId ? data : item))
      //       );
      //       onClose();
      //       successToast("Update a Order successfully!");
      //     }
      //   });
    }
  };
  return (
    <Dialog open={openOrderForm} onClose={onClose} maxWidth="100%">
      <DialogTitle
        variant="h3"
        color="text.secondary"
        align="center"
        letterSpacing={10}
      >
        NEW PURCHASE ORDER
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikBag) => {
            submitAPI(values, formikBag);
          }}
        >
          {(formikProps) => (
            <Form
              onSubmit={formikProps.handleSubmit}
              style={{ marginTop: "10px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Model Number</InputLabel>
                    <Select
                      name="modelName"
                      id="modelName"
                      label="Model Number"
                      defaultValue="Select model number"
                      onChange={(e) => handleChangeInfo(e, formikProps)}
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
                    helperText={
                      formikProps.touched.brandId && formikProps.errors.brandId
                    }
                    error={
                      formikProps.touched.brandId &&
                      !!formikProps.errors.brandId
                    }
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
                    helperText={
                      formikProps.touched.price && formikProps.errors.price
                    }
                    error={
                      formikProps.touched.price && !!formikProps.errors.price
                    }
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
                      formikProps.touched.quantity &&
                      formikProps.errors.quantity
                    }
                    error={
                      formikProps.touched.quantity &&
                      !!formikProps.errors.quantity
                    }
                  />
                </Grid>
              </Grid>{" "}
              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  disabled={
                    order && (formikProps.isSubmitting || !formikProps.dirty)
                  }
                >
                  {order ? "Save" : "Create"}
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

export default OrderForm;
