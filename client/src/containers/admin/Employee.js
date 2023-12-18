import React, { useContext } from "react";
import Navbar from "../../components/admin/Navbar";
import { Box, Fab, Paper, Stack, Typography } from "@mui/material";
import { Sidebar } from "../../components/admin/Sidebar";
import { EmployeeList } from "../../components/Employee/EmployeeList";
import AddIcon from "@mui/icons-material/Add";
import { AccountContext } from "../../context/AccountContext";
import EmployeeForm from "../../components/Employee/EmployeeForm";

export const Employee = () => {
  const { onClose, handleClickOpen, openAccountForm } =
    useContext(AccountContext);

  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <EmployeeForm />
        </Box>
        <Paper sx={{ width: "100%", p: 3, overflow: "hidden" }}>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="h4">
              <span className="title-text">Employee</span>
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
          <EmployeeList />
        </Paper>
      </Box>
    </>
  );
};
