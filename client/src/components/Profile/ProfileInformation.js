import React, { useEffect, useState } from "react";
import { TabPanel } from "@mui/lab";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { getCustomerById } from "../Customer/CustomerLibrary";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone is required"),
});

export function ProfileInformation({ id }) {
  const [loading, setLoading] = useState(false);
  const [information, setInformation] = useState({});

  useEffect(() => {
    setLoading(true);
    getCustomerById(id).then((data) => {
      if (data) {
        setInformation(data);
        setLoading(false);
      }
    });
  }, []);
  return (
    <TabPanel value="1">
      <Typography variant="h5" mb={1}>
        Profile Information
      </Typography>
      {!loading && (
        <Formik
          initialValues={{
            email: information.email || "",
            phone: information.phone || "",
            address: information.address || "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            // Handle form submission logic here
            console.log(values);
          }}
        >
          <Form>
            <Stack spacing={2}>
              <Field name="email">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    variant="outlined"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
              <Field name="phone">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    fullWidth
                    variant="outlined"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
              <Field name="address">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    label="Address"
                    fullWidth
                    variant="outlined"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </Stack>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Form>
        </Formik>
      )}
    </TabPanel>
  );
}
