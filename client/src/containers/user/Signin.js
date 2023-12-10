import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LayoutUser } from "../../layout/LayoutUser";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import { loginAuth } from "../../components/Auth";

// Define validation schema using yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email.").required("Email is required."),
  password: yup.string().required("Password is required."),
});

export const Signin = () => {
  const { login } = useContext(DataContext);
  const [generalError, setGeneralError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    loginAuth(data).then((data) => {
      if (data !== null) {
        login(data);
      } else {
        setGeneralError(
          "An error occurred during login. Please try again later."
        );
      }
    });
  };
  const [capsLockEnabled, setCapsLockEnabled] = React.useState(false);

  const handleKeyPress = (e) => {
    const isCapsLockOn = e.getModifierState("CapsLock");
    setCapsLockEnabled(isCapsLockOn);
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
              SIGN IN
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              {generalError && (
                <Alert
                  severity="error"
                  sx={{
                    my: 2,
                  }}
                >
                  {generalError}
                </Alert>
              )}

              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email*"
                    fullWidth
                    margin="normal"
                    placeholder="enter your email address..."
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
                    label="Password*"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="enter your password..."
                    type="password"
                    error={!!errors.password}
                    helperText={
                      capsLockEnabled
                        ? "CapsLock is ON"
                        : errors.password?.message
                    }
                    onKeyDown={handleKeyPress}
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
              <Typography variant="body2" style={{ marginTop: "16px" }}>
                Don't have an account?{" "}
                <Link to="/signup" style={{ textDecoration: "underline" }}>
                  Sign up here
                </Link>
              </Typography>
            </form>
          </Container>
        </Container>
      </Box>
    </LayoutUser>
  );
};
