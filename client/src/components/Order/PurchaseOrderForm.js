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
  getPurchaseOrder,
  postPurchaseOrder,
} from "./PurchaseOrderLibrary";
import { successToast } from "../Message";
import { OrderFormField } from "./PurchaseOrderFormField";
import { getVehicles } from "../Vehicle/VehicleLibrary";
import { getCustomer } from "../Customer/CustomerLibrary";
import { DataContext } from "../../context/DataContext";
import { getEmployeeById } from "../Employee/EmployeeLibrary";
const OrderForm = ({ vehicleList }) => {
  const { onClose, setOrderData, orderData, openOrderForm, order } =
    useContext(OrderContext);
  const { token } = useContext(DataContext);
  const [employeeId, setEmployeeId] = useState();
  const [suggestPrice, setSuggestPrice] = useState();
  const initialValues = {
    vehicleId: order?.vehicleID ?? "",
    modelName: order?.modelName ?? "",
    brandId: order?.brandId ?? "",
    suggestPrice: order?.suggestPrice ?? "",
    quantity: order?.quantity ?? "",
  };

  const handleChangeInfo = (e, formikBag) => {
    const vehicleInfo = vehicleList.find(
      (item) => item.vehicleID === e.target.value
    );

    formikBag.setFieldValue("vehicleId", vehicleInfo.vehicleID);
    formikBag.setFieldValue("name", vehicleInfo.name);
    formikBag.setFieldValue("modelId", vehicleInfo.modelId);
    formikBag.setFieldValue("brandId", vehicleInfo.brand.name);
    formikBag.setFieldValue("modelName", vehicleInfo.modelId);

    const newArrayToCheckLastOrderDuplicate = orderData.filter(
      (item) => item.vehicleId === vehicleInfo.vehicleID
    );
    const checkLastOrderDuplicate =
      newArrayToCheckLastOrderDuplicate[
        newArrayToCheckLastOrderDuplicate.length - 1
      ].suggestPrice;

    setSuggestPrice(checkLastOrderDuplicate);
  };

  const validationSchema = generateValidationSchemaOrder();
  const submitAPI = async (values, formikProps) => {
    if (!order) {
      const dataToPost = {
        vehicleId: values.vehicleId,
        suggestPrice: values.suggestPrice,
        quantity: values.quantity,
        employeeId: employeeId,
        brand: values.brandId,
        modelId: values.modelId,
        name: values.name,
      };
      console.log(dataToPost);
      postPurchaseOrder(dataToPost).then((data) => {
        if (data !== null) {
          console.log(data);
          setOrderData((prev) => [...prev, data]);
          onClose();
          successToast("Create a new purchase order successfully!");
        }
      });
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

  useEffect(() => {
    getCustomer().then((data) => {
      if (data) {
        const employee = data.find(
          (item) => item.accountId === Number(token.Id)
        );
        console.log(employee);
        if (employee.role === "Employee" || employee.role === "Admin") {
          getEmployeeById(token.Id).then((data) => {
            setEmployeeId(data.employeeId);
          });
        }
      }
    });
  }, []);
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
                  <TextField
                    name="brandId"
                    id="brandId"
                    fullWidth
                    label="Brand*"
                    disabled
                    value={formikProps.values.brandId}
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
                  <TextField
                    name="suggestPrice"
                    id="suggestPrice"
                    fullWidth
                    label="Suggest Price*"
                    onChange={(e) => {
                      formikProps.setFieldValue("suggestPrice", e.target.value);
                    }}
                    helperText={
                      formikProps.touched.suggestPrice
                        ? formikProps.errors.suggestPrice
                        : suggestPrice
                        ? `Suggested price for the last order: ${suggestPrice}`
                        : ""
                    }
                    error={
                      formikProps.touched.suggestPrice &&
                      !!formikProps.errors.suggestPrice
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="quantity"
                    id="quantity"
                    fullWidth
                    label="Quantity*"
                    onChange={(e) => {
                      formikProps.setFieldValue("quantity", e.target.value);
                    }}
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
