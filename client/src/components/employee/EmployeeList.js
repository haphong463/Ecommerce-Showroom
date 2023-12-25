import { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, Badge, Skeleton } from "@mui/material";
import { DataContext } from "../../context/DataContext";
import dayjs from "dayjs";
import { columns, getCustomer } from "../Customer/CustomerLibrary";
import { AccountContext } from "../../context/AccountContext";

export const EmployeeList = () => {
  const { dataEmployee, setDataEmployee } = useContext(AccountContext);
  const [loading, setLoading] = useState();
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
    setLoading(true);
    getCustomer().then((data) => {
      console.log(data);
      if (data) {
        setDataEmployee(data.filter((item) => item.role === "Employee"));
      }
      setLoading(false);
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
              ? dataEmployee
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.accountId}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "avatarUrl" ? (
                                <Avatar alt="Remy Sharp" src={row.avatarUrl} />
                              ) : column.id === "dateOfBirth" ? (
                                dayjs(row.dateOfBirth).format("MMMM DD, YYYY")
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              : Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell colSpan={5}>
                        <Skeleton height="40px" variant="rectangular" />
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={dataEmployee.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
