import { MenuItem, Select } from "@mui/material";

export function VehicleFormFieldSelect({
  field,
  touched,
  errors,
  props,
  list,
}) {
  return (
    <Select
      id={field.name}
      error={touched[field.name] && Boolean(errors[field.name])}
      label={field.label}
      name={field.name}
      onBlur={props.handleBlur}
      onChange={props.handleChange}
      value={props.values[field.name]}
    >
      {list.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
