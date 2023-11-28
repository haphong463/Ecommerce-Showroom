import { Box, Typography } from "@mui/material";
import React from "react";
import { Sidebar } from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";

export const Settings = () => {
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h3" component="div">
            Settings
          </Typography>
        </Box>
      </Box>
    </>
  );
};
