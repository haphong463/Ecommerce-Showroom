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
import { ServiceContext } from "../../context/ServiceContext";
import { dangerMessage } from "../Message";
import Swal from "sweetalert2";
import { DataContext } from "../../context/DataContext";
import { columns, deleteService, getService } from "./ServiceLibrary";

export const ServiceList = () => {
  const { serviceData, setServiceData, setService, handleClickOpen } =
    useContext(ServiceContext);
  const { loading, setLoading } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleDelete = (id) => {
    const service = serviceData.find((item) => item.serviceId === id);
    console.log(service);
    if (service && service.orders.length > 0) {
      // Check if the specific brand has associated vehicles
      Swal.fire({
        title: "Cannot delete!",
        text: "This service has associated orders. Please delete the orders first.",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this service!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then((result) => {
        if (result.isConfirmed) {
          // User clicked 'Yes, delete it!'
          deleteService(id).then((data) => {
            if (data !== null) {
              console.log(data);
              setServiceData((prev) =>
                prev.filter((item) => item.serviceId !== data.serviceId)
              );
              dangerMessage("Delete a service successfully!");
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // User clicked 'No, cancel!'
          Swal.fire("Cancelled", "Your service is safe :)", "info");
        }
      });
    }
  };

  const handleEdit = (id) => {
    const service = serviceData.find((item) => item.serviceId === id);
    if (service !== null) {
      setService(service);
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
    getService().then((data) => {
      if (data !== null) {
        setServiceData(data);
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
              ? serviceData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.serviceId}
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
                                    onClick={() => handleEdit(row.serviceId)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    aria-label="delete"
                                    onClick={() => handleDelete(row.serviceId)}
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
        count={serviceData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
