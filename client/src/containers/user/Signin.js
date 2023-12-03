import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LayoutUser } from "../../layout/LayoutUser";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import axios from "axios";
import { DataContext } from "../../context/DataContext";

// Define validation schema using yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email.").required("Email is required."),
  password: yup.string().required("Password is required."),
});

export const Signin = () => {
  const { login } = useContext(DataContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // Xử lý Sign in ở đây
    console.log("Dữ liệu form:", data);
    try {
      const res = await axios.post("http://localhost:5251/api/Auth", data);
      if (res.status === 200) {
        console.log(res.data);
        let tokenString = res.data.token;
        login(tokenString);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
      setGeneralError(
        "An error occurred during login. Please try again later."
      );
    }
  };

  return (
    <LayoutUser>
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column", // Default: Stack items on top of each other
            alignItems: "center",
            "@media (min-width: 600px)": {
              flexDirection: "row", // On screens wider than 600px, display side by side
            },
          }}
        >
          <Box
            sx={{
              marginBottom: "16px", // Add margin at the bottom for separation on mobile
              flex: "0 0 auto", // Make sure the image doesn't grow
            }}
          >
            <Icon
              component="img"
              src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=826&t=st=1701596007~exp=1701596607~hmac=ee1040ea1c9f965fb48e6d22b575718fdf3107c90de6c80bbffec01088fda824"
              alt="Sign In"
              sx={{ width: "500px", height: "500px" }}
            />
          </Box>
          <Container>
            <Typography variant="h4" align="center" gutterBottom>
              Sign in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                Sign in
              </Button>
            </form>
          </Container>
        </Container>
      </Box>
    </LayoutUser>
  );
};
