import React from "react";
import Navbar from "../../components/admin/Navbar";
import { Box, Typography } from "@mui/material";
import { Sidebar } from "../../components/admin/Sidebar";

export const Brand = () => {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h3" component="div">
            Brand
          </Typography>
        </Box>
      </Box>
    </>
  );
};
