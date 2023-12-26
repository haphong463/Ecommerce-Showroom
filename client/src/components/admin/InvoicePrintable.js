import { forwardRef, useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "../../context/DataContext";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { getVehicles } from "../Vehicle/VehicleLibrary";
import { dangerMessage } from "../Message";
import dayjs from "dayjs";
import { getCustomer } from "../Customer/CustomerLibrary";
import { getService } from "../Service/ServiceLibrary";
import { InvoiceAddress } from "./InvoiceAddress";
import { getEmployeeById } from "../Employee/EmployeeLibrary";
import { HeaderPrint } from "./HeaderPrint";
import { getFrame } from "../Frame/FrameLibary";
import { getOrder, getOrderDetails } from "../SalesOrder/SaleOrderLibrary";
const TAX_RATE = 0.07;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function ccyFormat(num) {
  return num?.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export const InvoicePrintable = forwardRef(
  (
    { isAddRowVisible, listItem, setListItem, dataToPost, setDataToPost },
    ref
  ) => {
    const { token } = useContext(DataContext);
    const [options, setOptions] = useState([]);
    const [listAccount, setListAccount] = useState([]);
    const [listService, setListService] = useState([]);
    const [service, setService] = useState([]);
    const [vehicleList, setVehicleList] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [availableFrameNumbers, setAvailableFrameNumbers] = useState([]);

    const [frameData, setFrameData] = useState([]);
    const [newRow, setNewRow] = useState({
      name: "",
      quantity: 0,
      unitPrice: 0,
      frameNumber: "",
    });

    // ------------------------------------------------- checkQuantity -------------------------------------------------
    const checkQuantity = (newQuantity, vehicleID) => {
      const vehicle = vehicleList.find((v) => v.vehicleID === vehicleID);
      if (vehicle && newQuantity > vehicle.quantity) {
        return false;
      }
      return true;
    };

    // ------------------------------------------------- handleChange -------------------------------------------------
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setService(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
      setDataToPost((prev) => ({
        ...prev,
        orderServices: value.map((item) => ({
          serviceId: item,
        })),
      }));
    };

    // ------------------------------------------------- selectedAccount -------------------------------------------------
    const selectedAccount = useMemo(() => {
      const result = listAccount.find(
        (item) => item.accountId === dataToPost.accountId
      );
      return result;
    }, [dataToPost?.accountId]);

    // ------------------------------------------------- extractDataForPost -------------------------------------------------
    const extractDataForPost = (list) => {
      return list.map((item) => {
        return {
          vehicleId: item.vehicleID,
          quantity: 1,
          price: item.unitPrice,
          frameNumber: item.frameNumber,
        };
      });
    };

    // ------------------------------------------------- addRow -------------------------------------------------
    const addRow = () => {
      if (!newRow.name) {
        dangerMessage("Please select a vehicle.");
        return;
      }
      if (!newRow.frameNumber) {
        dangerMessage("Please select a frame number for " + newRow.name + ".");
        return;
      }
      if (
        listItem.some(
          (item) =>
            item.vehicleID === newRow.vehicleID &&
            item.frameNumber === newRow.frameNumber
        )
      ) {
        dangerMessage("Item already exists.");
        return;
      }

      setListItem([...listItem, newRow]); // Add the newRow to the list directly
      setDataToPost((prev) => ({
        ...prev,
        orderDetails: extractDataForPost([...listItem, newRow], frameData),
      }));
      setNewRow({ name: "", quantity: 0, unitPrice: 0, frameNumber: "" });
      setAvailableFrameNumbers([]);
    };
    // ------------------------------------------------- handleRemoveRow -------------------------------------------------

    const handleRemoveRow = (indexRow) => {
      setListItem((prev) => prev.filter((item, index) => index !== indexRow));
    };
    // ------------------------------------------------- calculateSubTotalItem -------------------------------------------------

    const calculateSubTotalItem = (item) => {
      return item.quantity * item.unitPrice;
    };
    // ------------------------------------------------- calculateTotal -------------------------------------------------

    const calculateTotal = () => {
      const subTotal = listItem.reduce(
        (total, item) => total + calculateSubTotalItem(item),
        0
      );
      const taxes = TAX_RATE * subTotal;
      const total = subTotal + taxes;

      return { subTotal, taxes, total };
    };
    const handleVehicleChange = (event) => {
      const selectedVehicleId = event.target.value;
      const selectedOption = options.find(
        (option) => option.value === selectedVehicleId
      );

      // Update newRow state with the selected vehicle details
      setNewRow({
        ...newRow,
        name: selectedOption ? selectedOption.label : "",
        vehicleID: selectedVehicleId,
        unitPrice: selectedOption ? selectedOption.price : 0,
        isUsed: selectedOption ? selectedOption.isUsed : false,
        model: selectedOption ? selectedOption.model : "",
        quantity: 1,
      });

      // Set available frame numbers based on the selected VehicleId

      // Filter out frame numbers that are already in listItem
      // Get frame numbers in orderDetails
      // Get frame numbers in orderDetails
      const orderDetailsFrameNumbers = orderDetails.map(
        (item) => item.frameNumber
      );

      // Set available frame numbers based on the selected VehicleId
      const vehicleFrameData = frameData.filter(
        (item) => item.vehicleId === selectedVehicleId
      );

      // Filter out frame numbers that are in orderDetails or listItem from availableFrameNumbers
      const availableFrameNumbers = [];
      const seenFrameNumbers = new Set([
        ...listItem.map((item) => item.frameNumber),
        ...orderDetailsFrameNumbers,
      ]);

      for (const item of vehicleFrameData) {
        if (!seenFrameNumbers.has(item.frameNumber)) {
          availableFrameNumbers.push(item.frameNumber);
          seenFrameNumbers.add(item.frameNumber);
        }
      }

      setAvailableFrameNumbers(availableFrameNumbers);
    };

    // ------------------------------------------------- useEffect getVehicles, getCustomer, getService -------------------------------------------------
    console.log(dataToPost);
    console.log("order details: ", orderDetails);
    useEffect(() => {
      getFrame().then((data) => {
        setFrameData(data.data);
      });
      getOrderDetails().then((data) => {
        setOrderDetails(data);
      });
      getVehicles().then((data) => {
        if (data) {
          setVehicleList(data);
          const uniqueOptions = data.map((item) => ({
            label: item.name,
            value: item.vehicleID,
            price: item.purchasePrice,
            isUsed: item.isUsed,
            model: item.modelId,
          }));

          setOptions(uniqueOptions);
        }
      });
      getCustomer().then((data) => {
        if (data) {
          setListAccount(data.filter((item) => item.role === "User"));
          const employeeId = data.find((item) => item.email === token.Email);
          if (employeeId.role === "Employee" || employeeId.role === "Admin") {
            getEmployeeById(employeeId.accountId).then((data) => {
              setDataToPost({ ...dataToPost, employeeId: data.employeeId });
            });
          }
        }
      });
      getService().then((data) => {
        if (data) {
          setListService(data);
        }
      });
    }, []);

    // ------------------------------------------------- useEffect setDataToPost -------------------------------------------------

    useEffect(() => {
      setDataToPost((prev) => ({
        ...prev,
        totalPrice: calculateTotal().total,
      }));
    }, [listItem]);
    return (
      <Box component="div" p={1} ref={ref}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={3}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "monospace",
              }}
              align="center"
              gutterBottom
            >
              <span className="title-text">AutoCar</span>
            </Typography>
            <InvoiceAddress />
          </Stack>

          <Stack justifyContent="flex-end">
            <Typography variant="body2" align="right" gutterBottom>
              {dayjs().format("LLL")}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ border: "1px solid", my: 1.5 }} />
        <HeaderPrint
          Name={token.Name}
          listAccount={listAccount}
          listService={listService}
          service={service}
          handleChange={handleChange}
          selectedAccount={selectedAccount}
          isAddRowVisible={isAddRowVisible}
          dataToPost={dataToPost}
          setDataToPost={setDataToPost}
          MenuProps={MenuProps}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>No.</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Detail</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Model</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Condition</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Qty.</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Unit</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Price
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listItem.map((detail, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {detail.name} | {detail.frameNumber}
                    </TableCell>
                    <TableCell>{detail.model}</TableCell>
                    <TableCell>{detail.isUsed ? "New" : "Used"}</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>{ccyFormat(detail.unitPrice)}</TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        {ccyFormat(detail.unitPrice)}
                        {isAddRowVisible && (
                          <Button onClick={() => handleRemoveRow(index)}>
                            -
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}

              {isAddRowVisible && (
                <>
                  <TableRow>
                    <TableCell>{listItem.length + 1}</TableCell>
                    <TableCell
                      sx={{
                        minWidth: 350,
                      }}
                    >
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="vehicle-label">Vehicle</InputLabel>
                        <Select
                          labelId="vehicle-label"
                          id="vehicle-select"
                          value={newRow.vehicleID ? newRow.vehicleID : ""}
                          onChange={(e) => handleVehicleChange(e)}
                          label="Vehicle"
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="" disabled>
                            Select vehicle
                          </MenuItem>
                          {options.map((option, index) => (
                            <MenuItem key={option.value} value={option.value}>
                              {index + 1 + ". " + option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      {availableFrameNumbers.length > 0 && (
                        <Select
                          labelId="vehicle-label"
                          id="vehicle-select"
                          value={newRow.frameNumber ? newRow.frameNumber : ""}
                          onChange={(e) =>
                            setNewRow({
                              ...newRow,
                              frameNumber: e.target.value,
                            })
                          }
                          fullWidth
                          label="Frame Number"
                          defaultValue="Select frame number"
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="Select frame number" disabled>
                            Select frame number
                          </MenuItem>
                          {availableFrameNumbers.map((frameNumber) => (
                            <MenuItem key={frameNumber} value={frameNumber}>
                              {frameNumber}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        label="Unit"
                        value={newRow.unitPrice}
                        disabled
                      />
                    </TableCell>
                    <TableCell colSpan={3} align="right">
                      {ccyFormat(calculateSubTotalItem(newRow))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={7}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={addRow}
                      >
                        Add Row
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              )}
              <TableRow>
                <TableCell colSpan={5} align="right" sx={{ fontWeight: 600 }}>
                  Subtotal
                </TableCell>
                <TableCell colSpan={1}></TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  {ccyFormat(calculateTotal().subTotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} align="right" sx={{ fontWeight: 600 }}>
                  Tax
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>{`${(
                  TAX_RATE * 100
                ).toFixed(0)} %`}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  {ccyFormat(calculateTotal().taxes)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} align="right" sx={{ fontWeight: 600 }}>
                  Total
                </TableCell>
                <TableCell colSpan={1}></TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  {ccyFormat(calculateTotal().total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" spacing={1}>
          <Typography fontWeight="600">Accompanied service:</Typography>
          <Stack direction="row">
            {service
              .map((itemService) => {
                const serviceObject = listService.find(
                  (item) => item.serviceId === itemService
                );
                return serviceObject ? serviceObject.name : null;
              })
              .filter(Boolean)
              .join(", ")}
          </Stack>
        </Stack>
      </Box>
    );
  }
);
