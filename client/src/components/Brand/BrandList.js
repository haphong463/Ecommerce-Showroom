import { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { columns, deleteBrand, getBrandList } from "./BrandLibrary";
import { BrandContext } from "../../context/BrandContext";
import { dangerMessage } from "../Message";
import Swal from "sweetalert2";
import { DataContext } from "../../context/DataContext";

export const BrandList = () => {
  const { data, setData, setBrand, handleClickOpen } = useContext(BrandContext);
  const { setLoading } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleDelete = (id) => {
    const brand = data.find((item) => item.brandId === id);

    if (brand && brand.vehicles.length > 0) {
      // Check if the specific brand has associated vehicles
      Swal.fire({
        title: "Cannot delete!",
        text: "This brand has associated vehicles. Please delete the vehicles first.",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this brand!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then((result) => {
        if (result.isConfirmed) {
          // User clicked 'Yes, delete it!'
          deleteBrand(id).then((data) => {
            if (data !== null) {
              setData((prev) =>
                prev.filter((item) => item.brandId !== data.brandId)
              );
              dangerMessage("Delete a brand successfully!");
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // User clicked 'No, cancel!'
          Swal.fire("Cancelled", "Your brand is safe :)", "info");
        }
      });
    }
  };

  const handleEdit = (id) => {
    const brand = data.find((item) => item.brandId === id);
    if (brand !== null) {
      setBrand(brand);
      handleClickOpen();
    }
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
    getBrandList().then((data) => {
      if (data !== null) {
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.brandId}
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
                                onClick={() => handleEdit(row.brandId)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDelete(row.brandId)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Stack>
                          ) : column.id === "image" ? (
                            <img
                              alt={`${row.name}`}
                              src={row.imagePath}
                              width={100}
                            />
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
              })}
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
