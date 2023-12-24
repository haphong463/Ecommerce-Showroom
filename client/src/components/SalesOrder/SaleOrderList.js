import { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton, Skeleton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { dangerMessage } from "../Message";
import Swal from "sweetalert2";
import { DataContext } from "../../context/DataContext";
import { columns, getOrder } from "./SaleOrderLibrary";
import { SaleOrderContext } from "../../context/SaleOrderContext";
import { RemoveRedEye } from "@mui/icons-material";

export const SaleOrderList = () => {
  const [loading, setLoading] = useState();
  const { data, setData } = useContext(SaleOrderContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //   const handleDelete = (id) => {
  //     const brand = data.find((item) => item.brandId === id);

  //     if (brand && brand.vehicles.length > 0) {
  //       // Check if the specific brand has associated vehicles
  //       Swal.fire({
  //         title: "Cannot delete!",
  //         text: "This brand has associated vehicles. Please delete the vehicles first.",
  //         icon: "error",
  //       });
  //     } else {
  //       Swal.fire({
  //         title: "Are you sure?",
  //         text: "You will not be able to recover this brand!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonText: "Yes, delete it!",
  //         cancelButtonText: "No, cancel!",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           // User clicked 'Yes, delete it!'
  //           deleteBrand(id).then((data) => {
  //             if (data !== null) {
  //               setData((prev) =>
  //                 prev.filter((item) => item.brandId !== data.brandId)
  //               );
  //               dangerMessage("Delete a brand successfully!");
  //             }
  //           });
  //         } else if (result.dismiss === Swal.DismissReason.cancel) {
  //           // User clicked 'No, cancel!'
  //           Swal.fire("Cancelled", "Your brand is safe :)", "info");
  //         }
  //       });
  //     }
  //   };

  //   const handleEdit = (id) => {
  //     const brand = data.find((item) => item.brandId === id);
  //     if (brand !== null) {
  //       setBrand(brand);
  //       handleClickOpen();
  //     }
  //   };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    setLoading(true);
    getOrder().then((data) => {
      if (data) {
        setData(data);
        setLoading(false);
      }
    });
  }, []);
  return (
    <>
      <TableContainer sx={{ height: "75vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.id}
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
              ? data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.orderId}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "actions" ? (
                                <IconButton
                                  aria-label="edit"
                                  // onClick={() => handleEdit(row.brandId)}
                                >
                                  <RemoveRedEye />
                                </IconButton>
                              ) : column.id === "account" ? (
                                row.account.name
                              ) : column.id === "employee" ? (
                                row.employee.name
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
              : Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={4}>
                      <Skeleton variant="rectangular" height={50} />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
