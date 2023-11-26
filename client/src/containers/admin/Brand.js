import React, { useState } from "react";
import Navbar from "../../components/admin/Navbar";
import { Box, Fab, Typography } from "@mui/material";
import { Sidebar } from "../../components/admin/Sidebar";
import AddIcon from "@mui/icons-material/Add";

export const Brand = () => {
  const [openBrandForm, setOpenBrandForm] = useState(false);
  const handleClickOpen = () => {
    setOpenBrandForm(true);
  };
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
        </Box>
      </Box>
    </>
  );
};
