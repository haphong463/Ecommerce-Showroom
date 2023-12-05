// VehicleInformation.js
import React from "react";
import { Box, Button, Grid, Stack, Tooltip, Typography } from "@mui/material";

const VehicleInformation = ({
  infoArray,
  handleClickOpen,
  handleDelete,
  vehicleID,
  userLayout,
}) => {
  return (
    <Box mt={2}>
      <Typography variant="h4">Vehicle Information</Typography>
      <Grid
        container
        spacing={4}
        sx={{
          pr: 3,
        }}
      >
        {infoArray.map((info, index) => (
          <Grid item xs={info.title === "Description" ? 12 : 6} key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Tooltip sx={{ marginRight: 2 }} title={info.title}>
                {info.icon}
              </Tooltip>
              <Typography variant="body1">{info.value}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      {!userLayout && (
        <Stack direction="row" sx={{ mt: 3 }} spacing={1}>
          <Button variant="contained" color="info" onClick={handleClickOpen}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(vehicleID)}
          >
            Delete
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default VehicleInformation;
