import { Box } from "@mui/material";
import React from "react";
import { Sidebar } from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export const Settings = () => {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Settings</h1>
        </Box>
      </Box>
    </>
  );
};
