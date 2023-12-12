import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useContext, useEffect } from "react";
import { context as socketMarketContex } from "../context/SocketMarketContext";
import { context as coinContex } from "../context/CoinContext";

export const Trade = () => {
  let countMark = 0;
  const { executePriceMarket, market } = useContext(socketMarketContex);
  const { symbol, denom } = useContext(coinContex);
  useEffect(() => {
    executePriceMarket(symbol);
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.text.disabled,
      fontSize: 11,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 11,
    },
  }));

  const StyledTableCellGreen = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 11,
      color: "green",
    },
  }));
  const StyledTableCellRed = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 11,
      color: "red",
    },
  }));
  function getHoursAndMinutes(date = new Date()) {
    return (
      padTo2Digits(date.getHours()) +
      ":" +
      padTo2Digits(date.getMinutes()) +
      ":" +
      padTo2Digits(date.getSeconds())
    );
  }
  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Price(USDT)</StyledTableCell>
            <StyledTableCell align="right">Amount({denom})</StyledTableCell>
            <StyledTableCell align="right">Hour</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {market
            ? market.map((row) => (
                <TableRow
                  key={countMark++}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {row.Type === "buy" ? (
                    <StyledTableCellGreen component="th" scope="row">
                      {typeof row.Price === "number"
                        ? row.Price.toFixed(6)
                        : null}
                    </StyledTableCellGreen>
                  ) : (
                    <StyledTableCellRed component="th" scope="row">
                      {typeof row.Price === "number"
                        ? row.Price.toFixed(6)
                        : null}
                    </StyledTableCellRed>
                  )}

                  <StyledTableCell align="right">
                    {row.Amount?.toLocaleString("en-IN")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {getHoursAndMinutes(new Date(row.createdAt))}
                  </StyledTableCell>
                </TableRow>
              ))
            : ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
