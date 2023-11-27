import React, { useState } from "react";
import Navbar from "../../components/admin/Navbar";
import { Box } from "@mui/material";
import { Sidebar } from "../../components/admin/Sidebar";
import BrandForm from "../../components/admin/Brand/BrandForm";
import { BrandList } from "../../components/admin/Brand/BrandList";

export const Brand = () => {
  const [openBrandForm, setOpenBrandForm] = useState(false);
  const handleClickOpen = () => {
    setOpenBrandForm(true);
  };
  const onClose = () => {
    setOpenBrandForm(false);
  };
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <BrandForm
            open={openBrandForm}
            onSetOpen={handleClickOpen}
            handleClose={onClose}
          />
        </Box>
        <BrandList handleClickOpen={handleClickOpen} />
      </Box>
    </>
  );
};
