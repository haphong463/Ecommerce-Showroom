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
  Box,
  Button,
  Container,
  IconButton,
  TablePagination,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { getVehicleById } from "../../components/Vehicle/VehicleLibrary";
import { DataContext } from "../../context/DataContext";
import { json, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return num?.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function Cart() {
  const { token, itemCart, setItemCart } = useContext(DataContext);
  const [itemQuantities, setItemQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // functional
  // 1. hàm updatedCartData ban đàu lấy data từ local storage
  // 2. updatedCart sử dụng promise.all cho trường hợp phải sử dụng map lấy lại giá tiền cho từng item
  // 3. set state updatedCart cho cartItems.
  // 4. tạo biến khởi tạo quantity là 1 object rỗng.
  // 5, sử dụng foreach để duyệt qua từng phần tử trong mảng storedCart
  const updateCartData = async () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = await Promise.all(
      storedCart.map(async (item) => {
        const vehicleData = await getVehicleById(item.vehicleId);
        return { ...item, unitPrice: vehicleData?.purchasePrice };
      })
    );
    setCartItems(updatedCart);
    const initialQuantities = {};
    storedCart.forEach((item) => {
      initialQuantities[item.vehicleId] = item.qty;
    });
    setItemQuantities(initialQuantities);
  };

  const calculateSubTotalItem = (item) => {
    return (itemQuantities[item.vehicleId] || item.qty) * item.unitPrice;
  };
  const handleRemoveItem = (vehicleId) => {
    const updatedCart = cartItems.filter(
      (item) => item.vehicleId !== vehicleId
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartData();
    setItemCart(updatedCart.length);
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

  const updateQuantity = (vehicleId, newQuantity) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [vehicleId]: newQuantity,
    }));
    const updatedCart = cartItems.map((item) =>
      item.vehicleId === vehicleId ? { ...item, qty: newQuantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartData();
    console.log(" update quantity");
  };
  const handleCheckout = () => {};
  useEffect(() => {
    updateCartData();
    console.log("useEffect render");
  }, []);
  console.log("re-render component");
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
              {CartHeader()}
              <TableBody>
                {cartItems.length > 0 ? (
                  cartItems
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) =>
                      CartRows(
                        row,
                        handleRemoveItem,
                        updateQuantity,
                        itemQuantities,
                        calculateSubTotalItem
                      )
                    )
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={5}>
                      <Typography variant="h5" color="text.secondary">
                        Empty cart.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell colSpan={2} align="right">
                    Subtotal
                  </TableCell>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell align="right">
                    {ccyFormat(calculateTotal().subTotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell colSpan={2} align="right">
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
                  <TableCell colSpan={2} align="right">
                    Total
                  </TableCell>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell align="right">
                    {ccyFormat(calculateTotal().total)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" colSpan={5}>
                    {token ? (
                      <Button onClick={() => handleCheckout()} variant="text">
                        Checkout
                      </Button>
                    ) : (
                      <Button onClick={() => navigate("/login")} variant="text">
                        Please log in to proceed
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[3, 6, 9]}
              component="div"
              count={itemCart}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Container>
      </Box>
    </LayoutUser>
  );
}
// ---------------------------------------------------------------- CART HEADER ----------------------------------------------------------------

function CartHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" colSpan={4}>
          Details
        </TableCell>
        <TableCell align="right">Price</TableCell>
      </TableRow>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Desc</TableCell>
        <TableCell align="right">Qty.</TableCell>
        <TableCell align="right">Unit</TableCell>
        <TableCell align="right">Sum</TableCell>
      </TableRow>
    </TableHead>
  );
}

// ---------------------------------------------------------------- CART ROWS ----------------------------------------------------------------
function CartRows(
  row,
  handleRemoveItem,
  updateQuantity,
  itemQuantities,
  calculateSubTotalItem
) {
  return (
    <TableRow key={row.vehicleId}>
      <TableCell>
        <IconButton onClick={() => handleRemoveItem(row.vehicleId)}>
          <RemoveIcon />
        </IconButton>
        <img
          src={row.imageUrl}
          alt={row.name}
          width={100}
          height={100}
          className="img-thumbnail"
        />
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell align="right">
        <Button
          onClick={() =>
            updateQuantity(row.vehicleId, Math.max(row.qty - 1, 0))
          }
          disabled={row.qty === 1}
          variant="text"
        >
          -
        </Button>
        {itemQuantities[row.vehicleId] || row.qty}
        <Button
          onClick={() => updateQuantity(row.vehicleId, row.qty + 1)}
          variant="text"
        >
          +
        </Button>
      </TableCell>
      <TableCell align="right">{ccyFormat(row.unitPrice)}</TableCell>
      <TableCell align="right">
        {ccyFormat(calculateSubTotalItem(row))}
      </TableCell>
    </TableRow>
  );
}
