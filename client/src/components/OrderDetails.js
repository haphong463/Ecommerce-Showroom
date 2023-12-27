import {
  Avatar,
  Box,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
const TAX_RATE = 0.07;
const calculateSubTotalItem = (item) => {
  return item.quantity * item.price;
};
function ccyFormat(num) {
  return num?.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
const cellStyles = { fontSize: ["1rem", "1.3rem"] };

export function OrderDetails(props) {
  console.log(props.order);
  const calculateTotal = () => {
    const subTotal = props.orderDetails.reduce(
      (total, item) => total + calculateSubTotalItem(item),
      0
    );
    const taxes = TAX_RATE * subTotal;
    const total = subTotal + taxes;

    return { subTotal, taxes, total };
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 700,
          }}
          aria-label="spanning table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }} align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Price
              </TableCell>
            </TableRow>
            <TableRow
              style={{
                fontWeight: 600,
              }}
            >
              <TableCell sx={{ fontWeight: 600 }}>Desc</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Qty.
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Unit
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Sum
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.orderDetails.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Avatar
                      src={row.vehicles.images[0].imagePath}
                      variant="square"
                      sx={{
                        width: "100px",
                        height: "100px",
                      }}
                    />
                    <Stack>
                      <Typography fontWeight={600} variant="body1">
                        {row.vehicles.name}
                      </Typography>
                      <Typography fontWeight={600} variant="body1">
                        {row.vehicles.modelId}
                      </Typography>
                      <Typography fontWeight={600} variant="body1">
                        {row.frameNumber}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell sx={cellStyles} align="right">
                  {row.quantity}
                </TableCell>
                <TableCell sx={cellStyles} align="right">
                  {ccyFormat(row.price)}
                </TableCell>
                <TableCell sx={cellStyles} align="right">
                  {ccyFormat(calculateSubTotalItem(row))}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell sx={{ ...cellStyles, fontWeight: 700 }} colSpan={2}>
                Subtotal
              </TableCell>
              <TableCell sx={cellStyles} align="right">
                {ccyFormat(calculateTotal().subTotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...cellStyles, fontWeight: 700 }}>Tax</TableCell>
              <TableCell sx={cellStyles} align="right">{`${(
                TAX_RATE * 100
              ).toFixed(0)} %`}</TableCell>
              <TableCell sx={cellStyles} align="right">
                {ccyFormat(calculateTotal().taxes)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...cellStyles, fontWeight: 700 }} colSpan={2}>
                Total
              </TableCell>
              <TableCell sx={cellStyles} align="right">
                {ccyFormat(calculateTotal().total)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" spacing={1}>
        <Typography fontWeight="600">Accompanied service:</Typography>
        <Stack direction="row">
          {props.order?.orderService
            ?.map((itemService) => {
              console.log(itemService);
              return itemService.services.name;
            })
            .join(", ")}
        </Stack>
      </Stack>
    </>
  );
}
