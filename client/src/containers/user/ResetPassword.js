import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCustomer,
  postResetPassword,
} from "../../components/Customer/CustomerLibrary";
import { LayoutUser } from "../../layout/LayoutUser";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";

// Define the validation schema using yup
const schema = yup.object().shape({
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

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  useEffect(() => {
    getCustomer().then((data) => {
      if (data) {
        const checkToken = data.some((item) => {
          console.log("passwordResetToken: ", item.passwordResetToken);
          console.log("token: ", token);
          return item.passwordResetToken === token;
        });
        console.log(checkToken);
        if (!checkToken) {
          // Navigate to NotFound page if token is not valid
          navigate("/");
        }
      }
    });
  }, [token]);
  return (
    <LayoutUser>
      <Container
        sx={{
          height: "60vh",
          mt: 10,
        }}
      >
        {generalMessage && <Alert security="success">{generalMessage}</Alert>}
        <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            setLoading(true);
            postResetPassword(token, values).then((data) => {
              if (data) {
                setGeneralMessage("Password changed successfully");
                resetForm();
              }
              setLoading(false);
            });

            console.log(values);
          }}
        >
          <Form>
            <Stack spacing={2}>
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
                Reset password
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Container>
    </LayoutUser>
  );
};
