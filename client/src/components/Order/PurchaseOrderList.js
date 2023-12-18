import { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { OrderContext } from "../../context/OrderContext";
import { dangerMessage } from "../Message";
import Swal from "sweetalert2";
import { columns, deleteOrder, getOrder } from "./PurchaseOrderLibrary";

export const OrderList = ({ orderList }) => {
  const { orderData, setOrderData, setOrder, handleClickOpen } =
    useContext(OrderContext);

  const [loading, setLoading] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //   const handleDelete = (id) => {
  //     const order = orderData.find((item) => item.orderId === id);
  //     console.log(order);
  //     if (order && order.orders.length > 0) {
  //       // Check if the specific brand has associated vehicles
  //       Swal.fire({
  //         title: "Cannot delete!",
  //         text: "This Order has associated orders. Please delete the orders first.",
  //         icon: "error",
  //       });
  //     } else {
  //       Swal.fire({
  //         title: "Are you sure?",
  //         text: "You will not be able to recover this Order!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonText: "Yes, delete it!",
  //         cancelButtonText: "No, cancel!",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           // User clicked 'Yes, delete it!'
  //           deleteOrder(id).then((data) => {
  //             if (data !== null) {
  //               console.log(data);
  //               setOrderData((prev) =>
  //                 prev.filter((item) => item.OrderId !== data.OrderId)
  //               );
  //               dangerMessage("Delete a Order successfully!");
  //             }
  //           });
  //         } else if (result.dismiss === Swal.DismissReason.cancel) {
  //           // User clicked 'No, cancel!'
  //           Swal.fire("Cancelled", "Your Order is safe :)", "info");
  //         }
  //       });
  //     }
  //   };

  //   const handleEdit = (id) => {
  //     const Order = OrderData.find((item) => item.OrderId === id);
  //     if (Order !== null) {
  //       setOrder(Order);
  //       handleClickOpen();
  //     }
  //   };
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogFields, setDialogFields] = useState([]);
  console.log(dialogFields);
  // Function to handle the button click and open the dialog with text fields
  const handleConfirmClick = (orderId, quantity) => {
    const fields = [];
    for (let i = 0; i < quantity; i++) {
      fields.push(""); // Initialize text fields with empty values
    }
    setDialogFields(fields);
    setOpenDialog(true);
    // Perform additional actions based on orderId if needed
    console.log(`Clicked Confirm for Order ID ${orderId}`);
  };

  // Function to handle the dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //   useEffect(() => {
  //     setLoading(true);
  //     getOrder().then((data) => {
  //       if (data !== null) {
  //         setOrderData(data);
  //         setLoading(false);
  //       }
  //     });
  //   }, []);
  console.log(orderData);
  return (
    <>
      <TableContainer sx={{ height: "75vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => {
                return (
                  <TableCell
                    key={index}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading
              ? orderList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    console.log(row);
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "actions" ? (
                                <Stack
                                  direction="row"
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <IconButton aria-label="edit">
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton aria-label="delete">
                                    <DeleteIcon />
                                  </IconButton>
                                </Stack>
                              ) : column.id === "action" ? (
                                <Button
                                  variant="contained"
                                  color="info"
                                  onClick={() =>
                                    handleConfirmClick(
                                      orderList[index].modelName,
                                      orderList[index].quantity
                                    )
                                  }
                                >
                                  Xác nhận
                                </Button>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              : Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={4}>
                      <Skeleton variant="rectangular" />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={orderData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent>
          <Typography variant="h6">Enter chassis number</Typography>
          <Stack spacing={2}>
            {dialogFields.map((field, index) => (
              <TextField
                key={index}
                label={`Field ${index + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={field}
                onChange={(e) => {
                  const updatedFields = [...dialogFields];
                  updatedFields[index] = e.target.value;
                  setDialogFields(updatedFields);
                }}
              />
            ))}
            {/* Add other dialog content as needed */}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
