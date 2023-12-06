import React, { useContext, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import {
  Box,
  CircularProgress,
  Fab,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Sidebar } from "../../components/admin/Sidebar";
import BrandForm from "../../components/Brand/BrandForm";
import { BrandList } from "../../components/Brand/BrandList";
import { BrandContext } from "../../context/BrandContext";
import AddIcon from "@mui/icons-material/Add";
import { VehicleContext } from "../../context/VehicleContext";
import { DataContext } from "../../context/DataContext";

export const Brand = () => {
  const { onClose, handleClickOpen, openBrandForm } = useContext(BrandContext);
  const { loading } = useContext(DataContext);
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <BrandForm open={openBrandForm} handleClose={onClose} />
        </Box>
        <Paper sx={{ width: "100%", p: 3, overflow: "hidden" }}>
          {loading && (
            <CircularProgress
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
              }}
            />
          )}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4">
              <span className="title-text">Brand</span>
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
          <BrandList />
        </Paper>
      </Box>
    </>
  );
};
