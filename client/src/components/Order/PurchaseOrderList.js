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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { OrderContext } from "../../context/OrderContext";
import { dangerMessage } from "../Message";
import Swal from "sweetalert2";
import {
  columns,
  deleteOrder,
  getOrder,
  getPurchaseOrder,
} from "./PurchaseOrderLibrary";
import { postReceivingOrder } from "../ReceivingOrder/ReceivingOrderLibrary";

export const OrderList = ({ orderList }) => {
  const { orderData, setOrderData, setOrder, handleClickOpen } =
    useContext(OrderContext);

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
              ? orderData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    console.log(row);
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell>{row.modelId}</TableCell>
                        <TableCell>{row.suggestPrice}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell align="center">{row.brand}</TableCell>
                        <TableCell align="center">
                          {row.employee.name}
                        </TableCell>

                        <TableCell align="center">
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
                            Xác nhận
                          </Button>
                        </TableCell>
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
