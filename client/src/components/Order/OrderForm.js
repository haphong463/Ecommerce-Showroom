// OrderForm.jsx
import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { OrderContext } from "../../context/OrderContext";
import {
  generateValidationSchemaOrder,
  postOrder,
  putOrder,
} from "./OrderLibrary";
import { successToast } from "../Message";
import { OrderFormField } from "./OrderFormField";

const OrderForm = () => {
  const { onClose, setOrderData, openOrderForm, order } =
    useContext(OrderContext);
  const initialValues = {
    modelName: order?.modelName ?? "",
    brandId: order?.brandId ?? "",
    price: order?.price ?? "",
    quantity: order?.quantity ?? "",
  };
  const validationSchema = generateValidationSchemaOrder();
  const submitAPI = (order, values) => {
    if (!order) {
      postOrder(values).then((data) => {
        if (data !== null) {
          setOrderData((prev) => [...prev, data]);
          onClose();
          successToast("Create a new Order successfully!");
        }
      });
    } else {
      putOrder(values, order.orderId).then((data) => {
        console.log(data);
        if (data) {
          setOrderData((prev) =>
            prev.map((item) =>
              item.orderId === data.OrderId ? data : item
            )
          );
          onClose();
          successToast("Update a Order successfully!");
        }
      });
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
        {!order ? "NEW Order" : "EDIT Order"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikBag) => {
            submitAPI(order, values);
          }}
        >
          {(formikProps) => (
            <Form
              onSubmit={formikProps.handleSubmit}
              style={{ marginTop: "10px" }}
            >
              <OrderFormField formikProps={formikProps} />
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
