import React from "react";
import Navbar from "../../components/admin/Navbar";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { Sidebar } from "../../components/admin/Sidebar";
import { CustomerList } from "../../components/Customer/CustsomerList";

export const Customer = () => {
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}></Box>
        <Paper sx={{ width: "100%", p: 3, overflow: "hidden" }}>
          <Stack alignItems="flex-start" justifyContent="space-between">
            <Typography variant="h4">
              <span className="title-text">Customer</span>
            </Typography>
          </Stack>
          <CustomerList />
        </Paper>
      </Box>
    </>
  );
};
