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
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { OrderContext } from "../../context/OrderContext";
import { dangerMessage } from "../Message";
import Swal from "sweetalert2";
import {
  deleteOrder,
  getOrder,
  getPurchaseOrder,
  postCancelPurchaseOrder,
} from "./PurchaseOrderLibrary";
import { postReceivingOrder } from "../ReceivingOrder/ReceivingOrderLibrary";
import { DataContext } from "../../context/DataContext";

export const OrderList = ({ orderList }) => {
  const { orderData, setOrderData, setOrder, handleClickOpen } =
    useContext(OrderContext);
  const { token } = useContext(DataContext);
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataToPost, setDataToPost] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogFields, setDialogFields] = useState([]);
  const handleConfirmClick = (vehicleId, quantity, purchaseOrderId) => {
    const fields = [];
    for (let i = 0; i < quantity; i++) {
      fields.push("");
    }
    setDialogFields(fields);
    setOpenDialog(true);
    setDataToPost((prev) => ({ ...prev, vehicleId, purchaseOrderId }));
  };

  const handleReceivingOrder = () => {
    const hasEmptyField = dialogFields.some((field) => !field.trim());

    if (hasEmptyField) {
      dangerMessage("Please enter chassis numbers for all fields.");
      return;
    }
    const isDuplicate = new Set(dialogFields).size !== dialogFields.length;

    if (isDuplicate) {
      dangerMessage("Chassis numbers must be unique.");
      return;
    }
    const dataPost = {
      frames: [...dialogFields],
      vehicleId: dataToPost.vehicleId,
      purchaseOrderId: dataToPost.purchaseOrderId,
    };
    postReceivingOrder(dataPost);
  };
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
  const handleCancelOrder = (id) => {
    console.log(id);
    postCancelPurchaseOrder(id);
  };
  useEffect(() => {
    setLoading(true);
    getPurchaseOrder().then((data) => {
      if (data !== null) {
        setOrderData(data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      <TableContainer sx={{ height: "75vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Model Number</TableCell>
              <TableCell>Suggest Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading
              ? orderData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell>{row.modelId}</TableCell>
                        <TableCell>{row.suggestPrice}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.brand}</TableCell>
                        <TableCell>{row.employee.name}</TableCell>

                        <TableCell>
                          {token.Role === "Company" &&
                            row.orderStatus === 0 && (
                              <Stack spacing={1} direction="row">
                                <Button
                                  variant="contained"
                                  color="info"
                                  onClick={() =>
                                    handleConfirmClick(
                                      orderData[index].vehicleId,
                                      orderData[index].quantity,
                                      orderData[index].orderCompanyId
                                    )
                                  }
                                >
                                  Confirm
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() =>
                                    handleCancelOrder(row.orderCompanyId)
                                  }
                                >
                                  Cancel
                                </Button>
                              </Stack>
                            )}
                          {(token.Role === "Admin" ||
                            token.Role === "Employee") &&
                            row.orderStatus === 0 && (
                              <Button
                                variant="contained"
                                onClick={() =>
                                  handleCancelOrder(row.orderCompanyId)
                                }
                                color="error"
                              >
                                Cancel
                              </Button>
                            )}
                          {(token.Role === "Admin" ||
                            token.Role === "Employee") &&
                            row.orderStatus === 1 &&
                            "Confirmed"}
                        </TableCell>
                      </TableRow>
                    );
                  })
              : Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={6}>
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
          <Grid container spacing={2}>
            {dialogFields.map((field, index) => (
              <Grid key={index} item xs={3}>
                <TextField
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
              </Grid>
            ))}
          </Grid>
          <DialogActions>
            <Button onClick={handleReceivingOrder}>Confirm</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
