import React, { useEffect, useMemo, useState } from "react";
import { Sidebar } from "../../components/admin/Sidebar";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Navbar from "../../components/admin/Navbar";
import "../../assets/styles/Dashboard.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Analystic } from "../../components/admin/Analystic";
import CountUp from "react-countup";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { getOrder } from "../../components/SalesOrder/SaleOrderLibrary";
import ChartUserVehicle from "../../components/admin/ChartUserVehicle";
import { getPurchaseOrder } from "../../components/Order/PurchaseOrderLibrary";
import { getCustomer } from "../../components/Customer/CustomerLibrary";
import { SupportAgent } from "@mui/icons-material";
import { useTitle } from "../../UseTitle";

export const Home = () => {
  const [orders, setOrders] = useState([]);
  const [purchaseOrder, setPurchaseOrder] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const totalOrderPrice = useMemo(() => {
    const result = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    return result;
  }, [orders]);

  useEffect(() => {
    getOrder().then((data) => {
      if (data) {
        setOrders(data);
      }
    });
    getPurchaseOrder().then((data) => {
      if (data) {
        setPurchaseOrder(data);
      }
    });
    getCustomer().then((data) => {
      if (data) {
        setAccounts(data);
      }
    });
  }, []);
  useTitle("Dashboard");
  return (
    <div className="bg-gray">
      <Navbar />
      <Box height={70} />

      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Paper
            sx={{
              p: 3,
            }}
          >
            <Typography variant="h4">
              <span className="title-text">Dashboard</span>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Stack spacing={2} direction="row">
                  <Card
                    sx={{ minWidth: 49 + "%", height: 150 }}
                    className="gradient"
                  >
                    <CardContent>
                      <div style={{ color: "#ffffff", marginTop: "10px" }}>
                        <CreditCardIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#ffffff" }}
                      >
                        $
                        <CountUp
                          start={-500}
                          end={totalOrderPrice}
                          duration={5}
                          decimal={2}
                        />
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total Earnings
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ minWidth: 49 + "%", height: 150 }}
                    className="gradientlight"
                  >
                    <CardContent>
                      <div style={{ color: "#ffffff", marginTop: "10px" }}>
                        <ShoppingBagIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#ffffff" }}
                      >
                        {orders.length}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total Orders
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card>
                    <Stack spacing={2} direction="row">
                      <Box>
                        <StorefrontRoundedIcon
                          sx={{
                            ml: "20px",
                            mt: "20px",
                          }}
                        />
                      </Box>
                      <div className="paddingall">
                        <span className="priceTitle">
                          {purchaseOrder.length}
                        </span>
                        <br />
                        <span className="priceSubTitle">
                          Total purchase order
                        </span>
                      </div>
                    </Stack>
                  </Card>
                  <Card>
                    <Stack spacing={2} direction="row">
                      <div className="iconstyleblack">
                        <SupportAgent />
                      </div>
                      <div className="paddingall">
                        <span className="priceTitle">
                          {
                            accounts.filter((item) => item.role === "Employee")
                              .length
                          }
                        </span>
                        <br />
                        <span className="priceSubTitle">Total employee</span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={4} sm={6} xl={8}>
                <Analystic orders={orders} />
              </Grid>
              <Grid item xs={8} sm={6} xl={4}>
                <ChartUserVehicle
                  accounts={accounts.filter((item) => item.role === "User")}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};
