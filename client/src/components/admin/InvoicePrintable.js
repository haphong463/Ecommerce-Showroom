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

import { getVehicleById, getVehicles } from "../Vehicle/VehicleLibrary";
import { dangerMessage } from "../Message";
import dayjs from "dayjs";
import { getCustomer } from "../Customer/CustomerLibrary";
import { getService } from "../Service/ServiceLibrary";
import { InvoiceAddress } from "./InvoiceAddress";
import { getEmployeeById } from "../employee/EmployeeLibrary";
const TAX_RATE = 0.07;
function ccyFormat(num) {
  return num?.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
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
    const [newRow, setNewRow] = useState({
      name: "",
      quantity: 0,
      unitPrice: 0,
    });
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
    const selectedAccount = useMemo(() => {
      const result = listAccount.find(
        (item) => item.accountId === dataToPost.accountId
      );
      return result;
    }, [dataToPost?.accountId]);

    const extractDataForPost = (list) => {
      return list.map((item) => ({
        vehicleId: item.vehicleID,
        quantity: item.quantity,
        price: item.unitPrice,
      }));
    };
    const addRow = () => {
      if (!newRow.name || newRow.quantity <= 0) {
        dangerMessage("Please fill in all required fields.");
        return;
      }
      if (listItem.some((item) => item.vehicleID === newRow.vehicleID)) {
        dangerMessage("Item already exists.");
        return;
      }
      setListItem([...listItem, newRow]);
      setDataToPost((prev) => ({
        ...prev,
        orderDetails: extractDataForPost([...listItem, newRow]),
      }));
      setNewRow({ name: "", quantity: "", unitPrice: "" });
    };
    const handleRemoveRow = (indexRow) => {
      setListItem((prev) => prev.filter((item, index) => index !== indexRow));
    };
    const calculateSubTotalItem = (item) => {
      return item.quantity * item.unitPrice;
    };

    const calculateTotal = () => {
      const subTotal = listItem.reduce(
        (total, item) => total + calculateSubTotalItem(item),
        0
      );
      const taxes = TAX_RATE * subTotal;
      const total = subTotal + taxes;

      return { subTotal, taxes, total };
    };

    useEffect(() => {
      getVehicles().then((data) => {
        if (data) {
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
          setListAccount(data);
          const employeeId = data.find((item) => item.email === token.Email);
          if (employeeId.role === "Employee") {
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
    useEffect(() => {
      setDataToPost((prev) => ({
        ...prev,
        totalPrice: parseInt(calculateTotal().total),
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
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            {!isAddRowVisible ? (
              <Stack>
                <Typography fontWeight={600} variant="body1">
                  {selectedAccount?.name}
                </Typography>
                <Typography variant="body1">
                  {selectedAccount?.phone}
                </Typography>
                <Typography variant="body1">
                  {selectedAccount?.email}
                </Typography>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1}>
                <Select
                  value={selectedAccount?.accountId ?? "Select customer"}
                  onChange={(e) => {
                    setDataToPost({ ...dataToPost, accountId: e.target.value });
                  }}
                  MenuProps={MenuProps}
                >
                  <MenuItem disabled value="Select customer">
                    Select customer
                  </MenuItem>
                  {listAccount.map((item) => (
                    <MenuItem key={item.accountId} value={item.accountId}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormControl sx={{ width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={service}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            listService.find((item) => item.serviceId === id)
                              .name
                        )
                        .join(", ")
                    }
                    MenuProps={MenuProps}
                  >
                    {listService.map((item, index) => (
                      <MenuItem key={index} value={item.serviceId}>
                        <Checkbox
                          checked={service.indexOf(item.serviceId) > -1}
                        />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            )}
          </Stack>
          <Stack>
            <Typography variant="body2">Issued by {token.Name}</Typography>
          </Stack>
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>No.</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
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
                    <TableCell>{detail.name}</TableCell>
                    <TableCell>{detail.model}</TableCell>
                    <TableCell>{detail.isUsed ? "New" : "Used"}</TableCell>
                    <TableCell>{detail.quantity}</TableCell>
                    <TableCell>{ccyFormat(detail.unitPrice)}</TableCell>
                    <TableCell align="right">
                      {ccyFormat(calculateSubTotalItem(detail))}
                      {isAddRowVisible && (
                        <Button onClick={() => handleRemoveRow(index)}>
                          -
                        </Button>
                      )}
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
                          value={newRow.vehicleID ? newRow.vehicleID : "*"}
                          onChange={(e) => {
                            const selectedOption = options.find(
                              (option) => option.value === e.target.value
                            );
                            setNewRow({
                              ...newRow,
                              name: selectedOption ? selectedOption.label : "",
                              vehicleID: e.target.value,
                              unitPrice: selectedOption
                                ? selectedOption.price
                                : 0,
                              isUsed: selectedOption
                                ? selectedOption.isUsed
                                : false,
                              model: selectedOption ? selectedOption.model : "",
                            });
                          }}
                          label="Vehicle"
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="*" disabled>
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
                      <TextField
                        type="number"
                        label="Qty."
                        value={newRow.quantity}
                        onChange={(e) =>
                          setNewRow({
                            ...newRow,
                            quantity: parseInt(e.target.value, 10) || 0,
                          })
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        type="number"
                        label="Unit"
                        value={newRow.unitPrice}
                        disabled
                      />
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      {ccyFormat(calculateSubTotalItem(newRow))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
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
      </Box>
    );
  }
);
