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
  Divider,
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
  putCancelPurchaseOrder,
} from "./PurchaseOrderLibrary";
import {
  getReceivingOrder,
  postReceivingOrder,
} from "../ReceivingOrder/ReceivingOrderLibrary";
import { DataContext } from "../../context/DataContext";

export const OrderList = ({ orderList, vehicleList }) => {
  const { orderData, setOrderData, setOrder, handleClickOpen } =
    useContext(OrderContext);
  const { token } = useContext(DataContext);
  const [loading, setLoading] = useState();
  const [getRelated, setGetRelated] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataToPost, setDataToPost] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDetails, setOpenDialogDetails] = useState(false);
  const [dialogFields, setDialogFields] = useState([]);
  const [frameDetail, setFrameDetail] = useState([]);

  // ---------------------------------------------------------------- handleConfirmClick ----------------------------------------------------------------
  const handleConfirmClick = (vehicleId, quantity, purchaseOrderId) => {
    const fields = [];
    for (let i = 0; i < quantity; i++) {
      fields.push("");
    }
    setDialogFields(fields);
    setOpenDialog(true);
    setDataToPost((prev) => ({ ...prev, vehicleId, purchaseOrderId }));
  };
  // ---------------------------------------------------------------- handleReceivingOrder ----------------------------------------------------------------

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

    const vehicleId = dataToPost.vehicleId;

    // Find the corresponding vehicle in vehicleList
    const selectedVehicle = vehicleList.find(
      (vehicle) => vehicle.vehicleID === vehicleId
    );

    if (selectedVehicle) {
      const existingFrames = selectedVehicle.frames.map(
        (frame) => frame.frameNumber
      );

      // Check for duplicate frame numbers
      const duplicateFrame = dialogFields.find((frame) =>
        existingFrames.includes(frame)
      );

      if (duplicateFrame) {
        dangerMessage(
          `Frame number '${duplicateFrame}' already exists for this vehicle.`
        );
        return;
      }
    }
    const dataPost = {
      frames: [...dialogFields],
      vehicleId: dataToPost.vehicleId,
      purchaseOrderId: dataToPost.purchaseOrderId,
      price: dataToPost.price,
    };
    console.log(dataPost);
    // postReceivingOrder(dataPost).then((data) => {
    //   if (data) {
    //     setOrderData((prev) =>
    //       prev.map((item) =>
    //         item.orderCompanyId === data.orderCompanyId ? data : item
    //       )
    //     );
    //     setOpenDialog(false);
    //   }
    // });
  };
  // ---------------------------------------------------------------- handleDialogClose ----------------------------------------------------------------

  const handleDialogClose = () => {
    if (openDialog) {
      setOpenDialog(false);
    }
    if (openDialogDetails) {
      setOpenDialogDetails(false);
    }
  };
  // ---------------------------------------------------------------- handleChangePage ----------------------------------------------------------------

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // ---------------------------------------------------------------- handleChangeRowsPerPage ----------------------------------------------------------------

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // ---------------------------------------------------------------- handleCancelOrder ----------------------------------------------------------------

  const handleCancelOrder = (id) => {
    Swal.fire({
      title: "Confirm Cancel Order",
      text: "Are you sure you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed canceling the order
        // console.log("Confirmed order cancellation");
        putCancelPurchaseOrder(id).then((data) => {
          if (data) {
            setOrderData((prev) =>
              prev.map((item) =>
                item.orderCompanyId === data.orderCompanyId ? data : item
              )
            );
          }
        });
      }
    });
  };

  const handleViewOrderDetails = (purchaseOrderId) => {
    // Find the related data for the current purchaseOrderId
    const relatedData = getRelated.find(
      (data) => data.purchaseOrderId === purchaseOrderId
    );
    console.log(relatedData);
    if (relatedData) {
      // Extract frames from related data
      const frames = relatedData.frames || [];

      // Open a dialog to display the frames
      setOpenDialogDetails(true);
      setFrameDetail(frames);
    }
  };

  useEffect(() => {
    setLoading(true);
    getReceivingOrder().then((data) => {
      if (data) {
        setGetRelated(data);
      }
    });
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
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model Number</TableCell>

              <TableCell>Suggest Price</TableCell>
              <TableCell>Quantity</TableCell>
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
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.brand}</TableCell>
                        <TableCell>{row.modelId}</TableCell>
                        <TableCell>{row.suggestPrice}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
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
                          {row.orderStatus === 1 ? (
                            <Stack direction="row" alignItems="center">
                              <Typography variant="body2">Confirmed</Typography>
                              <Button
                                onClick={() =>
                                  handleViewOrderDetails(row.orderCompanyId)
                                }
                              >
                                View
                              </Button>
                            </Stack>
                          ) : row.orderStatus === 2 ? (
                            <Typography variant="body2">Cancelled</Typography>
                          ) : (
                            ""
                          )}
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
          <Stack direction="row" container spacing={2}>
            {dialogFields.map((field, index) => (
              <TextField
                key={index}
                label={`Car ${index + 1}`}
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
          </Stack>

          <TextField
            sx={{
              mt: 1,
            }}
            variant="outlined"
            label="Price"
            onChange={(e) => {
              setDataToPost((prev) => ({ ...prev, price: e.target.value }));
            }}
          />

          <DialogActions>
            <Button onClick={handleReceivingOrder}>Confirm</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog open={openDialogDetails} onClose={handleDialogClose}>
        <DialogContent>
          <Typography variant="h6">Frames for Purchase Order</Typography>
          <Grid container spacing={2}>
            {frameDetail.map((field, index) => (
              <Grid key={index} item xs={3}>
                <TextField
                  label={`Frame ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={field.frameNumber}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
