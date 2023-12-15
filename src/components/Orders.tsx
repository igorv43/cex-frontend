import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Card, CardContent, Link } from "@mui/material";
import { context } from "../context/UserContext";
import { useContext, useState } from "react";
import OrdersExecution from "./OrdersExecution";
interface Column {
  id: "Denom" | "Amount" | "Price" | "Type" | "Status" | "createdAt";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "Denom", label: "Denom", minWidth: 50 },
  {
    id: "Amount",
    label: "Amount",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "Price",
    label: "Price",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  { id: "Type", label: "Type", minWidth: 100 },
  { id: "Status", label: "Status", minWidth: 100 },
  { id: "createdAt", label: "createdAt", minWidth: 100 },
];

interface Data {
  _id: string;
  Denom: string;
  Amount: number;
  Price: number;
  Type: string;
  Status: string;

  createdAt: string;
}

function createData(
  _id: string,
  Denom: string,
  Amount: number,
  Price: number,
  Type: string,
  Status: string,

  createdAt: string
): Data {
  createdAt = getHoursAndMinutes(new Date(createdAt));
  return { _id, Denom, Amount, Price, Type, Status, createdAt };
}
function getHoursAndMinutes(date = new Date()) {
  return (
    padTo2Digits(date.getFullYear()) +
    "-" +
    padTo2Digits(date.getMonth()) +
    "-" +
    padTo2Digits(date.getDay()) +
    " " +
    padTo2Digits(date.getHours()) +
    ":" +
    padTo2Digits(date.getMinutes()) +
    ":" +
    padTo2Digits(date.getSeconds())
  );
}
function padTo2Digits(num: any) {
  return String(num).padStart(2, "0");
}
type Props = {
  rows: any[];
};
export const Orders: React.FC<Props> = ({ rows }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { autheticated } = useContext(context);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let countRows = 0;
  return (
    <>
      {autheticated ? (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <TableRow>
                    {columns?.map((column) => (
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
                {/* {!rows && ( */}
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row: any) => {
                      return (
                        <>
                          <TableRow hover key={row._id}>
                            {columns?.map((column) => {
                              const value = row[column.id];

                              if (column.label === "Denom") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    <Link
                                      component="button"
                                      variant="body2"
                                      onClick={() => {
                                        setOpen(true);
                                        setId(row._id);
                                      }}
                                    >
                                      {value}
                                    </Link>
                                  </TableCell>
                                );
                              } else {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              }
                            })}
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
                {/* )} */}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      ) : (
        ""
      )}
      <OrdersExecution handleClose={handleClose} open={open} id={id} />
    </>
  );
};
