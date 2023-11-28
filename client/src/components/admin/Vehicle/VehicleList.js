import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { VehicleItem } from "./VehicleItem";
import { getVehicles } from "./VehicleLibrary";

export const VehicleList = () => {
  useEffect(() => {
    getVehicles().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <VehicleItem image={"https://source.unsplash.com/random?wallpapers"} />
      </Grid>
    </Grid>
  );
};
