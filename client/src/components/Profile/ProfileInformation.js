import React, { useContext, useEffect, useState } from "react";
import { TabPanel } from "@mui/lab";
import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { getCustomerById, putCustomer } from "../Customer/CustomerLibrary";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DataContext } from "../../context/DataContext";

const schema = yup.object().shape({
  name: yup.string().required("Email is required"),
  phone: yup.string().required("Phone is required"),
});

export function ProfileInformation({ information, loading }) {
  const [load, setLoad] = useState(false);
  const { token } = useContext(DataContext);
  const [avatarPreview, setAvatarPreview] = useState(token.Avatar || null);
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <TabPanel value="1">
      {!loading && (
        <Formik
          initialValues={{
            name: information.name,
            phone: information.phone,
            address: information.address,
            dateOfBirth: dayjs(information.dateOfBirth),
            file: null,
            gender: information.gender || "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            // Handle form submission logic here
            setLoad(true);
            console.log({
              ...values,
              accountId: token.Id,
            });
            const formData = new FormData();
            formData.append("accountId", Number(token.Id));
            formData.append("name", values.name);
            formData.append("dateOfBirth", values.dateOfBirth);
            formData.append("address", values.address);
            formData.append("phone", values.phone);
            formData.append("file", values.file);

            putCustomer(formData, Number(token.Id)).then((data) => {
              console.log(data);
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Input
                    accept="image/*"
                    id="avatar"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setFieldValue("file", e.target.files[0]);
                      handleAvatarChange(e);
                    }}
                  />
                  <label htmlFor="avatar">
                    <Avatar
                      src={avatarPreview}
                      alt={information.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </label>
                </Stack>
                <Field name="name">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Name"
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
                <Field name="dateOfBirth">
                  {({ field, meta }) => (
                    <DatePicker
                      {...field}
                      disableFuture
                      value={field.value}
                      onChange={(date) => {
                        setFieldValue(
                          "dateOfBirth",
                          dayjs(date).format("YYYY-MM-DD")
                        );
                      }}
                    />
                  )}
                </Field>
                <Field name="gender">
                  {({ field, meta }) => (
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender"
                        label="Gender"
                        defaultValue={information.gender}
                        {...field}
                        error={meta.touched && !!meta.error}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                      {meta.touched && meta.error && (
                        <div style={{ color: "red" }}>{meta.error}</div>
                      )}
                    </FormControl>
                  )}
                </Field>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={load}
                  endIcon={
                    load && <CircularProgress color="inherit" size="1rem" />
                  }
                >
                  Save
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      )}
    </TabPanel>
  );
}
