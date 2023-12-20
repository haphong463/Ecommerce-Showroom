import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Alert, Stack } from "@mui/material";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { loginAuth } from "../../components/Auth";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { login, token } = React.useContext(DataContext);
  const [generalError, setGeneralError] = React.useState("");

  const onSubmit = (data) => {
    loginAuth(data).then((res) => {
      if (res.data !== null) {
        login(res);
      } else {
        setGeneralError(res.message);
      }
    });
  };
  const [capsLockEnabled, setCapsLockEnabled] = React.useState(false);

  const handleKeyPress = (e) => {
    const isCapsLockOn = e.getModifierState("CapsLock");
    setCapsLockEnabled(isCapsLockOn);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://i.pinimg.com/originals/26/cf/a7/26cfa7d023698de9611b8077019093cd.jpg)",
          backgroundRepeat: "no-repeat",
          filter: "brightness(150%)",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
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

            <Box>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    fullWidth
                    error={Boolean(errors.email)}
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
                    sx={{ mt: 3 }}
                    {...field}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={Boolean(errors.password || capsLockEnabled)}
                    helperText={
                      capsLockEnabled
                        ? "Capslock is ON"
                        : errors.password?.message
                    }
                    fullWidth
                    onKeyDown={handleKeyPress}
                  />
                )}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
