import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  formFields,
  fuelType,
  numberOfSeats,
  transmissionType,
} from "./VehicleLibrary";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { FastField } from "formik";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { VehicleFormFieldSelect } from "./VehicleFormFieldSelect";

export function VehicleFormFields({
  props,
  isUsed,
  setIsUsed,
  touched,
  errors,
  brand,
}) {
  return (
    <Grid container spacing={2}>
      {formFields.map((field) => {
        return (
          <Grid item xs={field.name === "files" ? 12 : 3} key={field.name}>
            {field.name === "isUsed" ? (
              <FormControlLabel
                control={
                  <Switch
                    id="isUsed"
                    name="isUsed"
                    checked={props.values.isUsed}
                    onChange={() => {
                      props.setFieldValue("isUsed", !isUsed);
                      setIsUsed(!isUsed);
                    }}
                  />
                }
                label={props.values.isUsed ? "Used" : "New"}
              />
            ) : field.type === "select" ? (
              <FormControl fullWidth>
                <InputLabel
                  error={touched[field.name] && Boolean(errors[field.name])}
                >
                  {field.label}
                </InputLabel>
                {field.name === "brandId" ? (
                  <VehicleFormFieldSelect
                    field={field}
                    touched={touched}
                    errors={errors}
                    props={props}
                    list={brand}
                  />
                ) : field.name === "fuelType" ? (
                  <VehicleFormFieldSelect
                    field={field}
                    touched={touched}
                    errors={errors}
                    props={props}
                    list={fuelType}
                  />
                ) : field.name === "numberOfSeats" ? (
                  <VehicleFormFieldSelect
                    field={field}
                    touched={touched}
                    errors={errors}
                    props={props}
                    list={numberOfSeats}
                  />
                ) : (
                  <VehicleFormFieldSelect
                    field={field}
                    touched={touched}
                    errors={errors}
                    props={props}
                    list={transmissionType}
                  />
                )}

                {touched[field.name] && errors[field.name] ? (
                  <FormHelperText error>{errors[field.name]}</FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            ) : field.type === "date" ? (
              <DatePicker
                label={field.label}
                sx={{ width: "100%" }}
                onBlur={props.handleBlur}
                onChange={(newValue) => {
                  props.setFieldValue(field.name, dayjs(newValue));
                }}
                value={dayjs(props.values[field.name])}
              />
            ) : field.type === "file" ? (
              <div>
                <label
                  htmlFor={field.name}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="file"
                    id={field.name}
                    name={field.name}
                    accept={field.accept}
                    onBlur={props.handleBlur}
                    onChange={(event) => {
                      props.setFieldValue(
                        "files",
                        Array.from(event.currentTarget.files)
                      );
                    }}
                    style={{ display: "none" }}
                    multiple={field.multiple}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    sx={{ width: "100%" }}
                  >
                    {field.label}
                  </Button>
                </label>
                {touched.files && errors.files && (
                  <Typography variant="body2" color="error">
                    {errors.files}
                  </Typography>
                )}
              </div>
            ) : (
              <FastField name={field.name}>
                {({ field: { name, value, onChange, onBlur } }) => (
                  <>
                    <TextField
                      fullWidth
                      id={name}
                      name={name}
                      label={field.label}
                      helperText={
                        touched[field.name] && errors[field.name]
                          ? errors[field.name]
                          : ""
                      }
                      value={value}
                      error={Boolean(touched[field.name] && errors[field.name])}
                      onChange={onChange}
                      onBlur={onBlur}
                      type={field.type}
                    />
                  </>
                )}
              </FastField>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}
