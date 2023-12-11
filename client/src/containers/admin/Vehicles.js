import {
  Box,
  Fab,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Sidebar } from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import AddIcon from "@mui/icons-material/Add";
import VehicleForm from "../../components/Vehicle/VehicleForm";
import { VehicleList } from "../../components/Vehicle/VehicleList";
import { VehicleContext } from "../../context/VehicleContext";

export const Vehicles = () => {
  const [open, setOpen] = React.useState(false);
  const { setEntry } = useContext(VehicleContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEntry();
    setOpen(false);
  };
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <VehicleForm
            open={open}
            onSetOpen={setOpen}
            handleClose={handleClose}
          />
        </Box>
        <Paper sx={{ width: "100%", p: 3, overflow: "hidden" }}>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Typography variant="h4">
              <span className="title-text">Vehicles</span>
            </Typography>

            <Fab
              color="primary"
              size="medium"
              aria-label="add"
              onClick={handleClickOpen}
              sx={{
                m: "10px",
              }}
            >
              <AddIcon />
            </Fab>
          </Stack>
          <VehicleList />
        </Paper>
      </Box>
    </>
  );
};
