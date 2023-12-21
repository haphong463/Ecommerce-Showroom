import React, { useContext, useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import { DataContext } from "../../context/DataContext";
import { Link, Navigate, useLocation } from "react-router-dom";
import { loginAuth } from "../../components/Auth";
import { successToast } from "../../components/Message";
import { getCustomerByToken } from "../../components/Customer/CustomerLibrary";

// Define validation schema using yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email.").required("Email is required."),
  password: yup.string().required("Password is required."),
});
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export const Signin = () => {
  const query = useQuery();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { login, token } = useContext(DataContext);
  const [generalError, setGeneralError] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setLoadingSubmit(true);
    loginAuth(data).then((res) => {
      if (res.data !== null) {
        login(res);
      } else {
        setGeneralError(res.message);
      }
      setLoadingSubmit(false);
    });
  };
  const [capsLockEnabled, setCapsLockEnabled] = React.useState(false);

  const handleKeyPress = (e) => {
    const isCapsLockOn = e.getModifierState("CapsLock");
    setCapsLockEnabled(isCapsLockOn);
  };
  const clearQueryParams = () => {
    const { protocol, host, pathname } = window.location;
    const newUrl = `${protocol}//${host}${pathname}`;
    window.history.replaceState({}, document.title, newUrl);
  };

  useEffect(() => {
    console.log("re-render");
    const verifyParam = query.get("verify");
    async function fetchDataCustomerByToken(verifyParam) {
      const res = await getCustomerByToken(verifyParam);
      if (res) {
        setVerificationMessage(
          "Email verification successful. You can now log in."
        );
      }
    }
    if (verifyParam) {
      fetchDataCustomerByToken(verifyParam);
    }

    clearQueryParams();
  }, []);

  if (token) {
    return <Navigate to="/" />;
  }
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
              {verificationMessage && (
                <Alert
                  severity="success"
                  sx={{
                    my: 2,
                  }}
                >
                  {verificationMessage}
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
                endIcon={
                  loadingSubmit && (
                    <CircularProgress size="1rem" color="inherit" />
                  )
                }
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
