import React, { useContext } from "react";
import Navbar from "../../components/admin/Navbar";
import { Box, CircularProgress, Fab, Paper } from "@mui/material";
import { Sidebar } from "../../components/admin/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import { DataContext } from "../../context/DataContext";
import { CustomerList } from "../../components/Customer/CustsomerList";

export const Customer = () => {
  const { loading } = useContext(DataContext);
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}></Box>
        <Paper sx={{ width: "100%", p: 3, overflow: "hidden" }}>
          {loading && (
            <CircularProgress
              sx={{
                position: "absolute",
                left: "50%",
              }}
            />
          )}
          <CustomerList />
        </Paper>
      </Box>
    </>
  );
};
