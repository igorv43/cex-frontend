import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useCallback, useContext, useEffect, useState } from "react";
import { context } from "../context/UserContext";
import useMarket from "../hooks/useMarket";
import { context as socketMarketContex } from "../context/SocketMarketContext";
import useCoinUser from "../hooks/useCoinUser";
import Divider from "@mui/material/Divider";
import Withdraw from "./Withdraw";
import Swap from "./Swap";
import { context as coinContex } from "../context/CoinContext";
export const Sell = () => {
  const { findDenom } = useCoinUser();
  const [open, setOpen] = useState(false);
  const [openSwap, setOpenSwap] = useState(false);
  const { autheticated } = useContext(context);
  const { sell } = useMarket();
  const [market, setMarket] = useState({});
  const [valueInput, setValueInput] = useState(0);

  const [valueInputPrice, setValueInputPrice] = useState(0);
  const { symbol, denom } = useContext(coinContex);

  const [inputEvent, setInputEvent] = useState({
    label: "USDT price",
    variant: "filled" as any,
    disabled: false,
    value: null,
    type: "price",
    buttonColorLimit: "inherit" as any,
    buttonColorMarket: "primary" as any,
  });
  const handleChangeTypeLimit = (e: any) => {
    setInputEvent({
      label: "USDT price",
      variant: "filled" as any,
      disabled: false,
      value: null,
      type: "price",
      buttonColorLimit: "inherit" as any,
      buttonColorMarket: "primary" as any,
    });
    setValueInputPrice(0);
  };
  const handleChangeTypeMarket = (e: any) => {
    setInputEvent({
      label: "USDT market price",
      variant: "filled" as any,
      disabled: true,
      value: null,
      type: "marketPrice",
      buttonColorLimit: "primary" as any,
      buttonColorMarket: "inherit" as any,
    });
    setValueInputPrice(0);

    if (valueInput > 0) {
      setAmountPair(valueInput * coin.Price);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseSwap = () => {
    setOpenSwap(false);
  };
  const handleClickOpenSwap = () => {
    setOpenSwap(true);
  };

  const { coin, setCoinPair1, setCoinPair2, coinPair2 } =
    useContext(socketMarketContex);
  const [amountPair, setAmountPair] = useState(0);
  const [errInput, setErrInput] = useState({ input: false, text: "" });
  const handleChange = (e: any) => {
    if (!coinPair2) {
      setErrInput({ input: true, text: "insufficient amount" });
      return;
    }

    if (coinPair2?.Amount === 0) {
      setErrInput({ input: true, text: "insufficient amount" });
    } else {
      if (e.target.value < 0) {
        e.target.value = 1;
      }
      if (e.target.value > coinPair2?.Amount) {
        setErrInput({ input: true, text: "insufficient amount" });
      } else {
        setErrInput({ input: false, text: "" });
      }
      if (e.target.value.length == 0) {
        setAmountPair(0);
      } else {
        if (e.target.value > 0) {
          if (inputEvent.type === "price") {
            setAmountPair(e.target.value * valueInputPrice);
          } else {
            setAmountPair(e.target.value * coin.Price);
          }
        } else {
          setAmountPair(0);
        }
      }
    }
    setValueInput(e.target.value);
    setMarket({ ...market, [e.target.name]: e.target.value });
  };
  const handleChangePrice = (e: any) => {
    if (e.target.value.length == 0) {
      setAmountPair(0);
    } else {
      setValueInputPrice(e.target.value);
      if (valueInput > 0 && valueInputPrice > 0) {
        setAmountPair(valueInput * valueInputPrice);
      } else {
        setAmountPair(0);
      }
    }
    setValueInputPrice(e.target.value);
    setMarket({ ...market, [e.target.name]: e.target.value });
  };
  const incrementfindDenom = useCallback(() => {
    const objDenomx = async () => {
      const data2 = await findDenom(denom);

      if (data2) {
        setCoinPair2({ Amount: data2.Amount });
      } else {
        setCoinPair2({ Amount: 0 });
      }
    };
    objDenomx().catch(console.error);
  }, []);
  useEffect(() => {
    incrementfindDenom();
  }, [incrementfindDenom]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);
    if (coinPair2?.Amount === 0) {
      alert("insufficient amount");
    } else {
      const xData = { ...market, denom: symbol } as any;
      const dataSell = await sell(xData);
      setValueInput(0);
      if (dataSell?.data?.newMarket?.Denom) {
        const pair = dataSell?.data?.newMarket?.Denom.split("/");
        const data1 = await findDenom(pair[1]);
        if (data1) {
          setCoinPair1({ Amount: data1.Amount });
        } else {
          setCoinPair1({ Amount: 0 });
        }
        const data2 = await findDenom(pair[0]);
        if (data2) {
          setCoinPair2({ Amount: data2.Amount });
        } else {
          setCoinPair2({ Amount: 0 });
        }
      }
    }
  };
  return (
    <>
      <Box component="form" name="sell" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Button
              size="small"
              variant="outlined"
              color={inputEvent.buttonColorLimit}
              onClick={handleChangeTypeLimit}
              disabled={autheticated ? errInput.input : true}
            >
              Limit
            </Button>{" "}
            <Button
              size="small"
              variant="outlined"
              color={inputEvent.buttonColorMarket}
              onClick={handleChangeTypeMarket}
              disabled={autheticated ? errInput.input : true}
            >
              Market
            </Button>{" "}
            <Button
              size="small"
              color="info"
              variant="contained"
              onClick={handleClickOpenSwap}
              disabled={autheticated ? errInput.input : true}
            >
              Swap
            </Button>{" "}
            <Button
              size="small"
              color="success"
              variant="contained"
              onClick={handleClickOpen}
              disabled={autheticated ? errInput.input : true}
            >
              Withdraw
            </Button>
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "100%" },
              }}
            >
              <FormHelperText id="component-helper-text">
                Available{" "}
                {typeof coinPair2?.Amount === "number"
                  ? coinPair2?.Amount.toLocaleString("en-IN")
                  : null}{" "}
                {denom}
              </FormHelperText>
              <TextField
                id="price"
                name="price"
                size="small"
                type="number"
                label={inputEvent.label}
                disabled={inputEvent.disabled}
                value={valueInputPrice}
                onChange={handleChangePrice}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "100%" },
              }}
            >
              <TextField
                error={errInput.input}
                id="amount"
                name="amount"
                type="number"
                size="small"
                inputProps={{
                  step: 1,
                  min: 1,
                }}
                label={"Amount " + denom}
                disabled={!autheticated}
                onChange={handleChange}
                helperText={errInput.text}
                value={valueInput}
              />
              <FormHelperText id="component-helper-text">
                Max. Sell{" "}
                {typeof amountPair === "number"
                  ? amountPair.toLocaleString("en-IN")
                  : null}{" "}
                USDT
              </FormHelperText>
              <FormHelperText id="component-helper-text">
                Est. Fee{" "}
                {typeof amountPair === "number"
                  ? (amountPair * coin?.Fee).toLocaleString("en-IN")
                  : null}{" "}
                USDT
              </FormHelperText>
            </Box>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="error"
          sx={{ mt: 3, mb: 2 }}
          disabled={autheticated ? errInput.input : true}
        >
          Sell {denom}
        </Button>
      </Box>
      <Swap
        handleClickOpen={handleClickOpenSwap}
        handleClose={handleCloseSwap}
        open={openSwap}
        offerDenom={denom}
        askDenom="USDT"
      />
      <Withdraw
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};
