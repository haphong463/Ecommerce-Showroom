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
  Tooltip,
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
import { Print, RemoveRedEye } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { putVehicleQuantity } from "../Vehicle/VehicleLibrary";

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
    postReceivingOrder(dataPost).then((data) => {
      if (data) {
        console.log(data);
        setOrderData((prev) =>
          prev.map((item) =>
            item.orderCompanyId === data.orderCompanyId ? data : item
          )
        );
        setOpenDialog(false);
      }
    });
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

  // ---------------------------------------------------------------- handleViewOrderDetails ----------------------------------------------------------------

  const handleViewOrderDetails = (purchaseOrderId) => {
    // Find the related data for the current purchaseOrderId
    const relatedData = getRelated.find((data) => {
      console.log("data.purchaseOrderId: ", data.purchaseOrderId);
      console.log("purchaseOrderId: ", purchaseOrderId);
      return data.purchaseOrderId === purchaseOrderId;
    });
    if (relatedData) {
      // Extract frames from related data
      const frames = relatedData.frames || [];

      // Open a dialog to display the frames
      setOpenDialogDetails(true);
      setFrameDetail(frames);
    }
  };
  // ---------------------------------------------------------------- generatePDF ----------------------------------------------------------------

  const generatePDF = (order) => {
    const pdf = new jsPDF();
    const relatedData = getRelated.find(
      (data) => data.purchaseOrderId === order.orderCompanyId
    );
    console.log(relatedData);
    Swal.fire({
      title: "Generate PDF",
      text: "Do you want to generate the PDF?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (order.orderStatus === 1) {
          putVehicleQuantity(
            order.vehicle.vehicleId,
            order.quantity,
            order.orderCompanyId
          ).then((data) => {
            console.log(data);
          });
        }

        pdf.setFont("helvetica");
        pdf.setFontSize(12);

        pdf.text("------------------ GOODS RECEIPT ------------------", 10, 10);
        pdf.text(`Received Date: ${relatedData.receivedDate}`, 10, 20);
        pdf.text(`Receipt Number: ${relatedData.id}`, 10, 30);
        pdf.text("-------------------------------------", 10, 40);

        // Uncomment and customize showroom information
        pdf.text(`Showroom Information:`, 10, 50);
        pdf.text(`Showroom Name: AutoCar`, 10, 60);
        pdf.text(`Address: 123 Main Street, City Vile`, 10, 70);
        pdf.text(`Phone Number: 094-214-4124`, 10, 80);
        pdf.text("-------------------------------------", 10, 90);
        // Uncomment and customize supplier information
        pdf.text(`Supplier Information:`, 10, 100);
        pdf.text(`Supplier Name: ABC Supplier`, 10, 110);
        pdf.text(`Address: 456 Supplier Avenue, Townsville`, 10, 120);
        pdf.text(`Phone Number: 987-654-3210`, 10, 130);

        pdf.text(
          "------------------ RECEIVED VEHICLES ------------------",
          10,
          140
        );

        const headers = [
          "No.",
          "Model",
          "Name",
          "Brand",
          "Color",
          "Condition",
          "Fuel Type",
          "Transmission Type",
          "Chassis Number",
        ];

        // Modify this part to create an array of arrays for body data
        const bodyData = relatedData.frames.map((item, index) => [
          (index + 1).toString(),
          order.modelId,
          order.name,
          order.brand,
          order.vehicle.color,
          order.vehicle.isUsed ? "Used" : "New",
          order.vehicle.fuelType,
          order.vehicle.transmissionType,
          item.frameNumber,
        ]);

        pdf.autoTable({
          startY: 150,
          head: [headers],
          body: bodyData,
        });
        pdf.text(
          "------------------ TOTAL ------------------",
          10,
          pdf.autoTable.previous.finalY + 10
        );
        pdf.text(
          `Total Quantity: ${order.quantity}`,
          10,
          pdf.autoTable.previous.finalY + 20
        );

        // Uncomment and customize receiver's signature and other footer information
        pdf.text(
          "------------------ RECEIVER'S SIGNATURE ------------------",
          10,
          pdf.autoTable.previous.finalY + 50
        );
        pdf.text(
          "Received By: ____________________ ",
          10,
          pdf.autoTable.previous.finalY + 60
        );

        pdf.text(
          "------------------ END OF GOODS RECEIPT ------------------",
          10,
          pdf.autoTable.previous.finalY + 70
        );

        pdf.save(`Receipt_${relatedData.id}.pdf`);
      }
    });
  };

  useEffect(() => {
    setLoading(true);

    getPurchaseOrder().then((data) => {
      if (data !== null) {
        setOrderData(data.reverse());
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getReceivingOrder().then((data) => {
      if (data) {
        setGetRelated(data);
      }
    });
  }, [orderData]);

  return (
    <>
      <TableContainer sx={{ height: "75vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model Number</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Fuel Type</TableCell>
              <TableCell>Transmission Type</TableCell>
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
                        <TableCell>{row.vehicle.modelId}</TableCell>
                        <TableCell>
                          {row.vehicle.isUsed ? "Used" : "New"}
                        </TableCell>
                        <TableCell>{row.vehicle.fuelType}</TableCell>
                        <TableCell>{row.vehicle.transmissionType}</TableCell>
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
                                      row.vehicleId,
                                      row.quantity,
                                      row.orderCompanyId
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
                          {["Admin", "Employee"].includes(token.Role) &&
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
                          {(["Admin", "Employee"].includes(token.Role) &&
                            row.orderStatus === 1) ||
                          row.orderStatus === 3 ? (
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <Button
                                variant="contained"
                                onClick={() =>
                                  handleViewOrderDetails(row.orderCompanyId)
                                }
                              >
                                <RemoveRedEye />
                              </Button>
                              {row.orderStatus !== 3 && (
                                <Tooltip title="Click to create a goods receipt">
                                  <Button
                                    onClick={() => generatePDF(row)}
                                    variant="contained"
                                    startIcon={<Print />}
                                  >
                                    PDF
                                  </Button>
                                </Tooltip>
                              )}
                            </Stack>
                          ) : row.orderStatus === 2 ? (
                            <Typography variant="body2">Cancelled</Typography>
                          ) : row.orderStatus === 1 &&
                            token.Role === "Company" ? (
                            <Button
                              variant="contained"
                              onClick={() =>
                                handleViewOrderDetails(row.orderCompanyId)
                              }
                            >
                              <RemoveRedEye />
                            </Button>
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
          <Stack direction="row" spacing={2}>
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
              <Grid
                key={index}
                item
                xs={
                  frameDetail.length === 1
                    ? 12
                    : frameDetail.length === 2
                    ? 6
                    : frameDetail.length === 3
                    ? 4
                    : 3
                }
              >
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
