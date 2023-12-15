import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import React, { useCallback, useContext, useEffect, useState } from "react";
import useMarketExecution from "../hooks/useMarketExecution";

type Props = {
  handleClose: () => void;
  open: boolean;
  id: any;
};
//useMarketExecution
const OrdersExecution: React.FC<Props> = ({ handleClose, open, id }) => {
  const { findId } = useMarketExecution();
  const [rows, setRows] = React.useState<any[]>([]);

  const incrementfind = useCallback((id: any) => {
    const objDenom = async (id: any) => {
      if (id) {
        const data = await findId(id);
        if (data) {
          setRows(data);
        }
      }
    };
    objDenom(id).catch(console.error);
  }, []);
  useEffect(() => {
    incrementfind(id);
  }, [id]);
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} maxWidth={"xl"}>
        <DialogTitle>Orders Execution</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">createdAt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.Amount}</TableCell>
                    <TableCell align="right">{row.Price}</TableCell>
                    <TableCell align="right">{row.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default OrdersExecution;
