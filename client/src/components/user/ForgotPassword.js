import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { postForgotPassword } from "../Customer/CustomerLibrary";
const schema = yup.object().shape({
  email: yup.string().email("Invalid email.").required("Email is required."),
});
export const ForgotPassword = ({ loadingSubmit, setLoadingSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [generalMessage, setGeneralMessage] = useState("");
  const onSubmit = (data) => {
    setLoadingSubmit(true);
    console.log(data);
    postForgotPassword(data).then((result) => {
      if (result) {
        setGeneralMessage("Please check your email to reset your password.");
      }else{}
      setLoadingSubmit(false);
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {generalMessage && <Alert severity="success">{generalMessage}</Alert>}
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}
        disabled={loadingSubmit}
      >
        <ArrowForwardIcon />
      </Button>
    </form>
  );
};
