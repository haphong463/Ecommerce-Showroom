import * as React from "react";
import { useState } from "react"; // Import useState
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { LayoutUser } from "../../layout/LayoutUser";
import "../../assets/styles/Body.css";
import { DatePicker } from "@mui/x-date-pickers";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import dayjs from "dayjs";
import { NavLink, useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  name: yup.string().required("First name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
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
  { label: "Profile Image", name: "profileImage" },
];

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [avatarImage, setAvatarImage] = useState(null); // State to manage the avatar image

  const onSubmit = (data) => {
    const newDate = dayjs(new Date(data.dateOfBirth)).format("YYYY-MM-DD");
    console.log(data, newDate);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <LayoutUser colorHeader>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={5} component={Paper} elevation={6} square>
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
            ></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {formFields.map(({ label, name }, index) => (
                  <Grid item xs={12} sm={6} key={index}>
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
                        sx={{
                          width: "100%",
                        }}
                        onChange={(e) => {
                          setValue(name, e);
                        }}
                      />
                    ) : (
                      <TextField
                        {...register(name)}
                        required
                        fullWidth
                        id={name}
                        label={label}
                        name={name}
                        autoComplete={name}
                        error={!!errors[name]}
                        helperText={errors[name]?.message}
                        {...(index === 6
                          ? { type: "date", InputLabelProps: { shrink: true } }
                          : {})}
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
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/signin" variant="body2">
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </LayoutUser>
  );
}
