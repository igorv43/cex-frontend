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
  TextField,
} from "@mui/material";

import React, { useContext, useState } from "react";
import { context } from "../context/UserContext";
import { context as socketMarketContex } from "../context/SocketMarketContext";
import Menssage from "./Message";

type Props = {
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
};
const Withdraw: React.FC<Props> = ({ handleClickOpen, handleClose, open }) => {
  const [loading, setLoading] = React.useState(true);
  const [withdraw, setWithdraw] = useState({});
  const { sendWithdraw } = useContext(context);
  const [maxAvailable, setMaxAvailable] = useState("");
  const { coin, setCoinPair1, setCoinPair2, coinPair2 } =
    useContext(socketMarketContex);
  const handleChange = (e: any) => {
    setWithdraw({
      ...withdraw,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeAmount = (e: any) => {
    setMaxAvailable(e.target.value);
    setWithdraw({
      ...withdraw,
      [e.target.name]: e.target.value,
    });
  };
  const handleAvailableClick = () => {
    setMaxAvailable(coinPair2?.Amount.toLocaleString("en-IN").replace(",", ""));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setWithdraw({
      ...withdraw,
      ["denom"]: "LUNC",
    });
    sendWithdraw(withdraw);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} maxWidth={"xs"}>
        <DialogTitle>Withdraw</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Menssage />
          </DialogContentText>
          <FormHelperText id="component-helper-text" sx={{ fontSize: 18 }}>
            Available{" "}
            {typeof coinPair2?.Amount === "number"
              ? coinPair2?.Amount.toLocaleString("en-IN")
              : null}{" "}
            LUNC
          </FormHelperText>
          <TextField
            autoFocus
            size="small"
            margin="dense"
            id="wallet"
            name="wallet"
            label="Wallet"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            size="small"
            margin="dense"
            id="memo"
            name="memo"
            label="Memo"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          {/* <TextField
            autoFocus
            size="small"
            name="amount"
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
          /> */}
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <Input
              fullWidth
              id="amount"
              type="number"
              name="amount"
              autoFocus
              onChange={handleChangeAmount}
              value={maxAvailable}
              endAdornment={
                <InputAdornment position="end">
                  {" "}
                  <Button size="small" onClick={handleAvailableClick}>
                    Max. Available
                  </Button>
                </InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Send</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default Withdraw;
