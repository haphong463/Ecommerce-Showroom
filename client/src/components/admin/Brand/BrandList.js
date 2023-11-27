import { useState, useEffect, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import { Fab, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getBrandList } from "./BrandLibrary";
import { BrandContext } from "../../../context/BrandContext";
const columns = [
  { id: "image", label: "", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];

export function BrandList({ handleClickOpen }) {
  const { data, setData } = useContext(BrandContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getBrandList().then((res) => {
      setData(res.data);
    });
  }, [setData]);
  return (
    <Paper sx={{ width: "100%", p: 3, overflow: "hidden" }}>
      <Fab
        color="primary"
        size="medium"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{
          m: "10px",
        }}
      >
        <AddIcon />
      </Fab>
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
                                onClick={() => console.log(row.name)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDelete(row.code)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Stack>
                          ) : column.id === "image" ? (
                            <img
                              alt={`${row.name}-image`}
                              src={row.imagePath}
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
    </Paper>
  );
}
