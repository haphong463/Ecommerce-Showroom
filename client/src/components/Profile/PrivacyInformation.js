import React, { useContext, useEffect, useState } from "react";
import { TabPanel } from "@mui/lab";
import {
  Alert,
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
import { DataContext } from "../../context/DataContext";

const schema = yup.object().shape({
  oldPassword: yup.string().required("Old Password is required."),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .required("New Password is required.")
    .notOneOf(
      [yup.ref("oldPassword")],
      "New password must be different from old p.assword"
    )
    .matches(
      /^(?=.*[A-Z])(?=.*[\W_]).+$/,
      "Password must contain at least one uppercase letter and one special character or underscore."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match.")
    .required("Confirm password is required."),
});

export function PrivacyInformation() {
  const [loading, setLoading] = useState(false);
  const { token } = useContext(DataContext);
  const [generalMessage, setGeneralMessage] = useState("");
  return (
    <TabPanel value="2">
      {generalMessage && <Alert severity="success">{generalMessage}</Alert>}
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm, setFieldError }) => {
          setLoading(true);

          putChangePassword(
            token.Id,
            values.oldPassword,
            values.newPassword
          ).then((data) => {
            if (data) {
              setGeneralMessage("Password changed successfully");
              resetForm(); // Reset the form after successful submission
            } else {
              setFieldError("oldPassword", "Incorrect old password");
            }
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
