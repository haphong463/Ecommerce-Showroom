import { Grid } from "@mui/material";
import React from "react";
import { VehicleItem } from "./VehicleItem";

export const VehicleList = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <VehicleItem image={"https://source.unsplash.com/random?wallpapers"} />
      </Grid>
    </Grid>
  );
};
