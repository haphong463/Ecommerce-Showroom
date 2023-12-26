import { Box, Fab, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Sidebar } from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { OrderContext } from "../../context/OrderContext";
import OrderForm from "../../components/Order/PurchaseOrderForm";
import { OrderList } from "../../components/Order/PurchaseOrderList";
import { SaleOrderList } from "../../components/SalesOrder/SaleOrderList";
import { useTitle } from "../../UseTitle";

export const SaleOrder = () => {
  const [orderList, setOrderList] = useState([]);
  useTitle("Sale Orders");
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}></Box>
        <Paper sx={{ width: "100%", p: 3, overflow: "hidden" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4">
              <span className="title-text">Sale Orders</span>
            </Typography>
          </Stack>
          <SaleOrderList />
        </Paper>
      </Box>
    </>
  );
};
