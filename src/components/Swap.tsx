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
import useCoinUser from "../hooks/useCoinUser";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { enUS } from "@mui/material/locale";

type Props = {
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
  askDenom: string;
  offerDenom: string;
};
const Swap: React.FC<Props> = ({
  handleClickOpen,
  handleClose,
  open,
  askDenom,
  offerDenom,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [swap, setSwap] = useState({
    askDenom: "",
    offerDenom: "",
    offerAmount: null,
  });
  const themeUS = createTheme({}, enUS);
  const { findDenom } = useCoinUser();
  const { switchCurrency } = useContext(context);
  const [maxAvailable, setMaxAvailable] = useState("");
  const [askAmount, setAskAmount] = useState(0);
  const { coin, setCoinPair1, setCoinPair2, coinPair2, coinPair1 } =
    useContext(socketMarketContex);
  const handleChange = (e: any) => {
    setSwap({
      ...swap,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeAmount = (e: any) => {
    setMaxAvailable(e.target.value);
    if (e.target.value.length == 0) {
      setAskAmount(0);
    } else {
      if (offerDenom === "USDT") {
        setAskAmount(e.target.value / coin.Price);
      } else {
        setAskAmount(e.target.value * coin.Price);
      }
    }
    //{ offerDenom, offerAmount, askDenom }
    setSwap({
      ...swap,
      [e.target.name]: e.target.value,
    });
  };
  const handleAvailableClick = () => {
    setMaxAvailable(coinPair2?.Amount.toLocaleString("en-IN").replace(",", ""));
    console.log(
      "amount dec",
      coinPair2,
      coinPair2?.Amount.toLocaleString("en-IN").replace(",", "")
    );
    if (offerDenom === "USDT") {
      setMaxAvailable(
        coinPair1?.Amount.toLocaleString("en-IN").replace(",", "")
      );
      setAskAmount(coinPair1?.Amount / coin.Price);
    } else {
      setMaxAvailable(
        coinPair2?.Amount.toLocaleString("en-IN").replace(",", "")
      );
      setAskAmount(coinPair2?.Amount * coin.Price);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSwap({
      ...swap,
      ["askDenom"]: askDenom,
      ["offerDenom"]: offerDenom,
    });
    if (swap.askDenom !== "" && swap.offerDenom !== "") {
      console.log(swap);
      const returnStatus = await switchCurrency(swap);
      if (returnStatus.status === "ok") {
        const data1 = await findDenom(offerDenom);
        if (data1) {
          setCoinPair1({ Amount: data1.Amount });
        }
        const data2 = await findDenom(askDenom);
        if (data2) {
          setCoinPair2({ Amount: data2.Amount });
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} maxWidth={"xs"}>
        <DialogTitle>Swap</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Menssage />
          </DialogContentText>
          <FormHelperText id="component-helper-text" sx={{ fontSize: 18 }}>
            Available{" "}
            {offerDenom === "USDT"
              ? typeof coinPair1?.Amount === "number"
                ? coinPair1.Amount.toLocaleString("en-IN")
                : null
              : typeof coinPair2?.Amount === "number"
              ? coinPair2?.Amount.toLocaleString("en-IN")
              : null}{" "}
            {offerDenom}
          </FormHelperText>
          <br></br>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel htmlFor="offerAmount">Amount</InputLabel>
            <ThemeProvider theme={themeUS}>
              <Input
                fullWidth
                id="offerAmount"
                type="number"
                name="offerAmount"
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
            </ThemeProvider>
          </FormControl>
          <br></br>
          <br></br>
          <FormHelperText id="component-helper-text" sx={{ fontSize: 18 }}>
            Max. swap {askAmount.toLocaleString("en-IN")} {askDenom}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default Swap;
