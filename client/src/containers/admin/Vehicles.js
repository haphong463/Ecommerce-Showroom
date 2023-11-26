import { Box, Fab, Grid, Stack } from "@mui/material";
import React, { useCallback } from "react";
import { Sidebar } from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import AddIcon from "@mui/icons-material/Add";
import VehicleForm from "../../components/admin/Vehicle/VehicleForm";
import { VehicleItem } from "../../components/admin/Vehicle/VehicleItem";

export const Vehicles = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  });

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          ></Box>
          <VehicleForm
            open={open}
            onSetOpen={setOpen}
            handleClose={handleClose}
          />

          <Fab
            color="primary"
            size="medium"
            aria-label="add"
            onClick={handleClickOpen}
            sx={{
              marginBottom: "10px",
            }}
          >
            <AddIcon />
          </Fab>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <VehicleItem image={"https://source.unsplash.com/random"} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
