import { Box, Fab, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Sidebar } from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { OrderContext } from "../../context/OrderContext";
import OrderForm from "../../components/Order/PurchaseOrderForm";
import { OrderList } from "../../components/Order/PurchaseOrderList";

export const Order = () => {
  const { handleClickOpen, openOrderForm, onClose } = useContext(OrderContext);
  const [orderList, setOrderList] = useState([]);
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <OrderForm
            setOrderList={setOrderList}
            open={openOrderForm}
            handleClose={onClose}
          />
        </Box>
        <Paper sx={{ width: "100%", p: 3, overflow: "hidden" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4">
              <span className="title-text">Purchase Orders</span>
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
          <OrderList orderList={orderList} />
        </Paper>
      </Box>
    </>
  );
};
