import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { successToast } from "../Message";
import Swal from "sweetalert2";
import { AccountContext } from "../../context/AccountContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { postCustomer, putCustomer } from "../Customer/CustomerLibrary";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
const schema = yup.object().shape({
  name: yup.string().required("First name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[\W_]).+$/,
      "Password must contain at least one uppercase letter and one special character or underscore."
    ),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10,11}$/, "Phone should have 10 to 11 digits"),
});

const formFields = [
  { label: "Name", name: "name" },
  { label: "Email Address", name: "email" },
  { label: "Password", name: "password" },
  { label: "Phone", name: "phone" },
  { label: "Gender", name: "gender" },
  { label: "Date of Birth", name: "dateOfBirth" },
  { label: "Address", name: "address" },
  { label: "Profile Image", name: "profileImage" },
];
const EmployeeForm = () => {
  const { setDataEmployee } = useContext(AccountContext);
  const {
    onClose,
    data,
    setData,
    openAccountForm,
    brand: account,
  } = useContext(AccountContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [avatarImage, setAvatarImage] = useState(null); // State to manage the avatar image
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    const newDate = dayjs(new Date(data.dateOfBirth)).format("YYYY-MM-DD");
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("dateOfBirth", newDate);
    formData.append("file", data.profileImage ? data.profileImage : null);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("gender", data.gender);
    formData.append("phone", data.phone);
    formData.append("role", "Employee");

    postCustomer(formData).then((result) => {
      if (result) {
        successToast(
          "Sign up successful. Please check your email and verify employee's email address."
        );
        setDataEmployee((prev) => [...prev, result]);
      }
      setLoading(false);
      onClose();
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue("profileImage", file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={openAccountForm} onClose={onClose} maxWidth="100%">
      <DialogTitle
        variant="h3"
        color="text.secondary"
        align="center"
        letterSpacing={10}
      >
        {!account ? "NEW EMPLOYEE" : "EDIT EMPLOYEE"}
      </DialogTitle>
      <DialogContent>
        <Container>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              className="custom-avatar"
              sx={{
                m: 1,
                width: "200px",
                height: "200px",
                objectFit: "contain",
              }}
              alt="Avatar"
              src={avatarImage} // Set the source of the Avatar
            />
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {formFields.map(({ label, name }, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={name === "profileImage" || name === "address" ? 12 : 6}
                    key={index}
                  >
                    {name === "profileImage" ? (
                      <div>
                        <label
                          htmlFor={name}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="file"
                            {...register(name)}
                            accept="image/*"
                            id={name}
                            style={{
                              display: "none",
                            }}
                            onChange={handleFileChange} // Call the handleFileChange function
                          />
                          <Button
                            variant="contained"
                            component="span"
                            sx={{ width: "100%" }}
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload
                          </Button>
                        </label>
                      </div>
                    ) : name === "dateOfBirth" ? (
                      <DatePicker
                        label="Date of Birth"
                        defaultValue={dayjs()}
                        sx={{
                          width: "100%",
                        }}
                        {...register(name)}
                        onChange={(e) => {
                          setValue(name, e);
                        }}
                      />
                    ) : name === "gender" ? (
                      <FormControl fullWidth>
                        <InputLabel htmlFor="select-gender" shrink>
                          Gender
                        </InputLabel>
                        <Select
                          {...register(name)}
                          defaultValue="Male"
                          fullWidth
                          label="Gender"
                          inputProps={{
                            name: name,
                            id: "select-gender",
                          }}
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        {...register(name)}
                        type={name === "password" ? "password" : "text"}
                        required
                        fullWidth
                        id={name}
                        label={label}
                        name={name}
                        autoComplete={name}
                        error={!!errors[name]}
                        helperText={errors[name]?.message}
                      />
                    )}
                  </Grid>
                ))}
                {/* Other form fields... */}
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || loading}
                endIcon={
                  loading && <CircularProgress color="inherit" size="1rem" />
                }
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
