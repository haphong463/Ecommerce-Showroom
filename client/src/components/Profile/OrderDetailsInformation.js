import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  IconButton,
} from "@mui/material";
import { DataContext } from "../../context/DataContext";
import dayjs from "dayjs";
import { RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const OrderTable = ({
  orders,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Customer</TableCell>
              <TableCell align="center">Total Amount</TableCell>
              <TableCell></TableCell>
              {/* Thêm các cột khác tùy thuộc vào thông tin bạn muốn hiển thị */}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell component="th" scope="row">
                    {order.orderId}
                  </TableCell>
                  <TableCell align="center">
                    {dayjs(order.orderDate).format("LLL")}
                  </TableCell>
                  <TableCell align="center">{order.totalPrice}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        navigate("/profile/order/" + order.orderId)
                      }
                    >
                      <RemoveRedEye />
                    </IconButton>
                  </TableCell>
                  {/* Thêm các ô dữ liệu khác tùy thuộc vào thông tin bạn muốn hiển thị */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

const OrderDetailsInformation = ({ order }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <Typography variant="h4">
        <span className="title-text">Your order</span>
      </Typography>
      <OrderTable
        orders={order}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default OrderDetailsInformation;
