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
import { ServiceContext } from "../../context/ServiceContext";
import { dangerMessage } from "../Message";
import Swal from "sweetalert2";
import { DataContext } from "../../context/DataContext";
import { columns, deleteService, getService } from "./ServiceLibrary";

export const ServiceList = () => {
  const { serviceData, setServiceData, setService, handleClickOpen } =
    useContext(ServiceContext);
  const { setLoading } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleDelete = (id) => {
    const service = serviceData.find((item) => item.ServiceId === id);
    deleteService(id).then((data) => {
      if (data !== null) {
        setServiceData((prev) =>
          prev.filter((item) => item.ServiceId !== data.ServiceId)
        );
        dangerMessage("Delete a service successfully!");
      }
    });
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
            {serviceData
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
              })}
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
