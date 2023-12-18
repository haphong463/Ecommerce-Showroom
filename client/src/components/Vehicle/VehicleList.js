import { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { VehicleContext } from "../../context/VehicleContext";
import { columns, getVehicles } from "./VehicleLibrary";
import { IconButton, Skeleton, Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
export function VehicleList() {
  const { setVehicleData, vehicleData } = useContext(VehicleContext);
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    setLoading(true);
    getVehicles().then((data) => {
      console.log(data);
      if (data !== null) {
        setVehicleData(data);
        setLoading(false);
      }
    });
  }, [setVehicleData]);
  return (
    <>
      <TableContainer sx={{ maxHeight: "75vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading
              ? vehicleData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.vehicleID}
                      >
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
                                  <IconButton
                                    aria-label="edit"
                                    onClick={() =>
                                      navigate(
                                        `../admin/vehicle/${row.vehicleID}`
                                      )
                                    }
                                  >
                                    <RemoveRedEyeIcon />
                                  </IconButton>
                                </Stack>
                              ) : column.id === "brand" ? (
                                row.brand.name
                              ) : column.id === "used" ? (
                                row.isUsed ? (
                                  "Used"
                                ) : (
                                  "New"
                                )
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              : Array.from({ length: 4 }).map((_, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell colSpan={5}>
                        <Skeleton variant="rectangular" />
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={vehicleData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
