import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LayoutUser } from "../../layout/LayoutUser";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../components/SalesOrder/SaleOrderLibrary";
import { useState } from "react";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export function Order() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const calculateSubTotalItem = (item) => {
    return item.quantity * item.price;
  };
  const calculateTotal = () => {
    const subTotal = orderDetails.reduce(
      (total, item) => total + calculateSubTotalItem(item),
      0
    );
    const taxes = TAX_RATE * subTotal;
    const total = subTotal + taxes;

    return { subTotal, taxes, total };
  };
  useEffect(() => {
    getOrderById(orderId).then((data) => {
      if (data) {
        console.log(data);
        setOrderDetails(data.orderDetails);
      }
    });
  }, []);

  return (
    <LayoutUser>
      <Box component="section" mb={20} mt={10}>
        <Container maxWidth="xl">
          <Typography variant="h2">
            <span className="title-text">ORDER NO.{orderId}</span>
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Desc</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetails.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Avatar
                          src={row.vehicles.images[0].imagePath}
                          variant="square"
                          sx={{
                            width: "100px",
                            height: "100px",
                          }}
                        />
                        <Stack>
                          <Typography variant="body1">
                            {row.vehicles.name}
                          </Typography>
                          <Typography variant="body1">
                            {row.vehicles.fuelType}
                          </Typography>
                          <Typography variant="body1">
                            {row.vehicles.numberOfSeats}
                          </Typography>
                          <Typography variant="body1">
                            {row.vehicles.modelId}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    {ccyFormat(calculateTotal().subTotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(calculateTotal().taxes)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">
                    {ccyFormat(calculateTotal().total)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </LayoutUser>
  );
}
