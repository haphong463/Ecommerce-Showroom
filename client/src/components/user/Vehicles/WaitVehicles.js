import { Grid, Skeleton } from "@mui/material";
import React from "react";

export function WaitVehicles({ vehiclesPerPage }) {
  return (
    <Grid container spacing={2}>
      {[...Array(vehiclesPerPage)].map((_, index) => (
        <Grid item xs={12} sm={6} lg={4} key={index}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{
              borderRadius: "12px",
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
