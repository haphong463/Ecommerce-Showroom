import React, { useContext } from "react";
import Navbar from "../../components/admin/Navbar";
import {
  Box,
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

export const Brand = () => {
  const { onClose, handleClickOpen, openBrandForm } = useContext(BrandContext);
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
