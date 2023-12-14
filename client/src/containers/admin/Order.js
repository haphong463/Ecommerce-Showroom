import {
  Box,
  CircularProgress,
  Fab,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Sidebar } from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { OrderContext } from "../../context/OrderContext";
import { OrderList } from "../../components/Order/OrderList";
import { DataContext } from "../../context/DataContext";
import OrderForm from "../../components/Order/OrderForm";

export const Order = () => {
  const { handleClickOpen, openOrderForm, onClose } = useContext(OrderContext);
  const { loading } = useContext(DataContext);
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <OrderForm open={openOrderForm} handleClose={onClose} />
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
              <span className="title-text">Orders</span>
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
          <OrderList />
        </Paper>
      </Box>
    </>
  );
};
