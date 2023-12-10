import { forwardRef, useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "../../context/DataContext";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  MenuItem,
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
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import { getVehicleById, getVehicles } from "../Vehicle/VehicleLibrary";
import { dangerMessage } from "../Message";
import dayjs from "dayjs";
import { getCustomer } from "../Customer/CustomerLibrary";
const TAX_RATE = 0.07;
function ccyFormat(num) {
  return num?.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export const InvoicePrintable = forwardRef(
  (
    { isAddRowVisible, listItem, setListItem, dataToPost, setDataToPost },
    ref
  ) => {
    const { token } = useContext(DataContext);
    const [autoCompleteValue, setAutoCompleteValue] = useState("");
    const [options, setOptions] = useState([]);
    const [listAccount, setListAccount] = useState([]);
    const [newRow, setNewRow] = useState({
      name: "",
      quantity: 0,
      unitPrice: 0,
    });
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
      } else {
        setListItem((prev) => [...prev, newRow]);
        setNewRow({ name: "", quantity: "", unitPrice: "" });
        setAutoCompleteValue("");
      }
      setDataToPost({
        ...dataToPost,
        listItems: extractDataForPost([...listItem, newRow]),
      });
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
        const uniqueOptions = data.map((item) => ({
          label: item.name,
          value: item.vehicleID,
          price: item.purchasePrice,
          isUsed: item.isUsed,
          model: item.modelId,
        }));

        setOptions(uniqueOptions);
      });
      getCustomer().then((data) => {
        setListAccount(data);
      });
    }, []);
    console.log(dataToPost);
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
            {LeftHeaderInvoice()}
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
              <Select
                defaultValue="Select customer"
                onChange={(e) => {
                  setDataToPost({ ...dataToPost, accountId: e.target.value });
                }}
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
                    <TableCell>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={options}
                        inputValue={autoCompleteValue}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Vehicle"
                            variant="outlined"
                            placeholder="Search vehicle by name..."
                          />
                        )}
                        onChange={(e, newValue) => {
                          if (newValue) {
                            setNewRow({
                              ...newRow,
                              name: newValue.label || "",
                              vehicleID: newValue.value || "",
                              unitPrice: newValue.price || 0,
                              isUsed: newValue.isUsed,
                              model: newValue.model,
                            });
                          }
                        }}
                        onInputChange={(e, newValue) => {
                          setAutoCompleteValue(newValue);
                          setNewRow({ ...newRow, name: newValue });
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        disableClearable
                        freeSolo
                      />
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
function LeftHeaderInvoice() {
  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <HomeIcon />
        <Typography variant="body2" sx={{ width: "330px" }}>
          590 Cach Mang Thang Tam Str, District 3, Ho Chi Minh City, Vietnam
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <PhoneIcon />
        <Typography variant="body2">0347337941</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <EmailIcon />
        <Typography variant="body2">autocar@gmail.com</Typography>
      </Stack>
    </Stack>
  );
}
