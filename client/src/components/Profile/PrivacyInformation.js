import React, { useEffect, useState } from "react";
import { TabPanel } from "@mui/lab";
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import {
  getCustomerById,
  putChangePassword,
} from "../Customer/CustomerLibrary";

const schema = yup.object().shape({
  oldPassword: yup.string().required("Old Password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[\W_]).+$/,
      "Password must contain at least one uppercase letter and one special character or underscore."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export function PrivacyInformation({ id }) {
  const [loading, setLoading] = useState(false);

  return (
    <TabPanel value="2">
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          setLoading(true);
          putChangePassword(id, values.oldPassword, values.newPassword)
            .then(() => {
              console.log("Password changed successfully");
              resetForm(); // Reset the form after successful submission
            })
            .catch((error) => {
              console.error("Error changing password", error);
            })
            .finally(() => {
              setLoading(false);
            });
          console.log(values);
        }}
      >
        <Form>
          <Stack spacing={2}>
            <Field name="oldPassword">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  label="Old Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
            <Field name="newPassword">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  label="New Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
            <Field name="confirmPassword">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              endIcon={
                loading && <CircularProgress color="inherit" size="1rem" />
              }
            >
              Change Password
            </Button>
          </Stack>
        </Form>
      </Formik>
    </TabPanel>
  );
}
