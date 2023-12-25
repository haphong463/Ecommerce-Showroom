import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LayoutUser } from "../../layout/LayoutUser";
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../../components/SalesOrder/SaleOrderLibrary";
import { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { OrderDetails } from "../../components/OrderDetails";
import dayjs from "dayjs";

const TAX_RATE = 0.07;

export function Order() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [order, setOrder] = useState();

  useEffect(() => {
    getOrderById(orderId).then((data) => {
      if (data) {
        console.log(data);
        setOrderDetails(data.orderDetails);
        setOrder(data);
      }
    });
  }, []);

  return (
    <LayoutUser>
      <Container maxWidth="xl">
        <Button startIcon={<ArrowBack />} onClick={() => navigate("/profile")}>
          Back to profile
        </Button>
      </Container>
      <Box component="section" mb={20} mt={10}>
        <Container maxWidth="xl">
          <Typography variant="h2">
            <span className="title-text">ORDER NO.{orderId}</span>
          </Typography>
          <Typography variant="h5">
            <span className="title-text">
              Date: {dayjs(order?.orderDate).format("LLL")}
            </span>
          </Typography>
          <OrderDetails orderId={orderId} orderDetails={orderDetails} />
        </Container>
      </Box>
    </LayoutUser>
  );
}
