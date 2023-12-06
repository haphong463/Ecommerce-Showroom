import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LayoutUser } from "../../layout/LayoutUser";
import { Box, Container, Typography } from "@mui/material";
import { getVehicleById } from "../../components/Vehicle/VehicleLibrary";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function Cart() {
  const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    const fetchCartData = async () => {
      // Fetch cart items from localStorage
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

      // Fetch additional data for each item
      const updatedCart = await Promise.all(
        storedCart.map(async (item) => {
          const vehicleData = await getVehicleById(item.vehicleId);
          return { ...item, unitPrice: vehicleData.purchasePrice };
        })
      );

      setCartItems(updatedCart);
    };

    fetchCartData();
  }, []);

  const calculateSubTotalItem = (item) => {
    return item.qty * item.unitPrice;
  };

  const calculateTotal = () => {
    const subTotal = cartItems.reduce(
      (total, item) => total + calculateSubTotalItem(item),
      0
    );
    const taxes = TAX_RATE * subTotal;
    const total = subTotal + taxes;

    return { subTotal, taxes, total };
  };
  return (
    <LayoutUser>
      <Box
        component="section"
        sx={{
          my: 10,
          height: "90vh",
        }}
      >
        <Container maxWidth="xl">
          <TableContainer component={Paper}>
            <Typography variant="h4" sx={{ m: 3 }}>
              <span className="title-text">Your cart</span>
            </Typography>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Desc</TableCell>
                  <TableCell>Desc</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((row) => (
                  <TableRow key={row.vehicleId}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.unitPrice}</TableCell>
                    <TableCell align="right">
                      {ccyFormat(calculateSubTotalItem(row))}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell colSpan={2} align="right" verticalAlign="bottom">
                    Subtotal
                  </TableCell>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell align="right">
                    {ccyFormat(calculateTotal().subTotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell colSpan={2} align="right" verticalAlign="bottom">
                    Tax
                  </TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(calculateTotal().taxes)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell colSpan={2} align="right" verticalAlign="bottom">
                    Total
                  </TableCell>
                  <TableCell colSpan={1}></TableCell>
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
