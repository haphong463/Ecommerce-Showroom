import { Box, Fab, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Sidebar } from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import AddIcon from "@mui/icons-material/Add";
import VehicleForm from "../../components/Vehicle/VehicleForm";
import { VehicleList } from "../../components/Vehicle/VehicleList";
import { VehicleContext } from "../../context/VehicleContext";
import { useParams } from "react-router-dom";
import { OrderDetails } from "../../components/OrderDetails";
import { getOrderById } from "../../components/SalesOrder/SaleOrderLibrary";
import dayjs from "dayjs";

export const ViewOrder = () => {
  const [order, setOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getOrderById(id).then((data) => {
      if (data) {
        console.log(data);
        setOrder(data);
        setOrderDetails(data.orderDetails);
      }
    });
  }, []);
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Paper sx={{ width: "100%", p: 3, overflow: "hidden" }}>
          <Typography variant="h2">
            <span className="title-text">ORDER NO.{id}</span>
          </Typography>
          <Typography variant="h5">
            <span className="title-text">
              Date: {dayjs(order?.orderDate).format("LLL")}
            </span>
          </Typography>
          <OrderDetails
            orderId={id}
            order={order}
            orderDetails={orderDetails}
          />
        </Paper>
      </Box>
    </>
  );
};
