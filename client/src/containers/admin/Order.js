import { Box, Fab, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Sidebar } from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { OrderContext } from "../../context/OrderContext";
import OrderForm from "../../components/Order/PurchaseOrderForm";
import { OrderList } from "../../components/Order/PurchaseOrderList";
import { DataContext } from "../../context/DataContext";
import { getVehicles } from "../../components/Vehicle/VehicleLibrary";
import { useTitle } from "../../UseTitle";

export const Order = () => {
  const { handleClickOpen, openOrderForm, onClose } = useContext(OrderContext);
  const { token } = useContext(DataContext);
  const [orderList, setOrderList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);

  useEffect(() => {
    getVehicles().then((data) => {
      if (data) {
        setVehicleList(data);
      }
    });
  }, []);
  useTitle("Purchase Order");
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <OrderForm
            setVehicleList={setVehicleList}
            vehicleList={vehicleList}
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
            {token.Role !== "Company" && (
              <>
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
              </>
            )}
          </Stack>
          <OrderList
            vehicleList={vehicleList}
            setVehicleList={setVehicleList}
            orderList={orderList}
          />
        </Paper>
      </Box>
    </>
  );
};
