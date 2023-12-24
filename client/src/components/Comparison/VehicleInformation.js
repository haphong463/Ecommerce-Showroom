import { Stack, Typography } from "@mui/material";

export const VehicleInformation = ({ label, value, highlight }) => (
  <Stack
    sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 4 }}
    spacing={2}
  >
    <Typography
      variant="h6"
      sx={{ backgroundColor: "#f3f3f3", color: "#848484" }}
    >
      {label}
    </Typography>
    <Typography
      variant="h6"
      color={highlight ? "red" : "inherit"}
      sx={{ backgroundColor: highlight ? "#fff1cd" : "transparent" }}
    >
      {value}
    </Typography>
  </Stack>
);
