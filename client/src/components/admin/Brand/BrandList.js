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
import { BrandContext } from "../../../context/BrandContext";

export const BrandList = ({ onSetLoading }) => {
  const { data, setData, setIsEditing, formik, handleClickOpen } =
    useContext(BrandContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleDelete = (id) => {
    deleteBrand(id).then((res) => {
      if (res.data !== null) {
        setData((prev) =>
          prev.filter((item) => item.brandId !== res.data.brandId)
        );
      }
    });
  };

  const handleEdit = (id) => {
    const brand = data.find((item) => item.brandId === id);
    if (brand !== null) {
      formik.setFieldValue("id", brand.brandId);
      formik.setFieldValue("name", brand.name);
      formik.setFieldValue("description", brand.description);
      setIsEditing(true);
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
    onSetLoading(true);

    getBrandList().then((res) => {
      if (res.data !== null) {
        setData(res.data);
      }
      onSetLoading(false);
    });
  }, [setData, onSetLoading]);
  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
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
