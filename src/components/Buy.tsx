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
import useCoinUser from "../hooks/useCoinUser";
import React from "react";
import { context as socketMarketContex } from "../context/SocketMarketContext";
import Swap from "./Swap";
export const Buy = () => {
  const { autheticated } = useContext(context);
  const { coin, setCoinPair1, coinPair1, setCoinPair2 } =
    useContext(socketMarketContex);
  const { buy } = useMarket();
  const { findDenom } = useCoinUser();
  const [market, setMarket] = useState({});
  const [amountPair, setAmountPair] = useState(0);
  const [valueInput, setValueInput] = useState(0);
  const [typeN, setTypeN] = useState("limit");
  const [errInput, setErrInput] = useState({ input: false, text: "" });
  const [valueInputPrice, setValueInputPrice] = useState(0);
  const [open, setOpen] = useState(false);
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
      setAmountPair(valueInput / coin.Price);
    }
  };

  const handleChange = (e: any) => {
    if (!coinPair1) {
      setErrInput({ input: true, text: "insufficient amount" });
      return;
    }
    if (coinPair1?.Amount === 0) {
      setErrInput({ input: true, text: "insufficient amount" });
    } else {
      if (e.target.value < 0) {
        e.target.value = 1;
      }
      if (e.target.value > coinPair1?.Amount) {
        setErrInput({ input: true, text: "insufficient amount" });
      } else {
        setErrInput({ input: false, text: "" });
      }
      if (e.target.value.length == 0) {
        setAmountPair(0);
      } else {
        if (e.target.value > 0) {
          if (inputEvent.type === "price") {
            setAmountPair(e.target.value / valueInputPrice);
          } else {
            setAmountPair(e.target.value / coin.Price);
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
        setAmountPair(valueInput / valueInputPrice);
      } else {
        setAmountPair(0);
      }
    }
    setValueInputPrice(e.target.value);
    setMarket({ ...market, [e.target.name]: e.target.value });
  };
  const incrementfindDenom = useCallback(() => {
    const objDenom = async () => {
      const data = await findDenom("USDT");
      if (data) {
        setCoinPair1({ Amount: data.Amount });
      } else {
        setCoinPair1({ Amount: 0 });
      }
    };
    objDenom().catch(console.error);
  }, []);
  useEffect(() => {
    incrementfindDenom();
  }, [incrementfindDenom]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (coinPair1?.Amount === 0) {
      alert("insufficient amount");
    } else {
      const xData = { ...market, denom: "LUNC/USDT" };
      const dataSell = await buy(xData);

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
      {" "}
      <Box component="form" name="buy" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Button
              size="small"
              variant="outlined"
              color={inputEvent.buttonColorLimit}
              onClick={handleChangeTypeLimit}
            >
              Limit
            </Button>{" "}
            <Button
              size="small"
              variant="outlined"
              color={inputEvent.buttonColorMarket}
              onClick={handleChangeTypeMarket}
            >
              Market
            </Button>{" "}
            <Button
              size="small"
              color="info"
              variant="contained"
              onClick={handleClickOpen}
            >
              Swap
            </Button>
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "100%" },
              }}
            >
              <FormHelperText id="component-helper-text">
                Available{" "}
                {typeof coinPair1?.Amount === "number"
                  ? coinPair1?.Amount.toLocaleString("en-IN")
                  : null}{" "}
                USDT
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
                label="Amount USDT"
                disabled={!autheticated}
                onChange={handleChange}
                helperText={errInput.text}
                value={valueInput}
              />

              <FormHelperText id="component-helper-text">
                Max. Buy{" "}
                {typeof amountPair === "number"
                  ? amountPair.toLocaleString("en-IN")
                  : null}{" "}
                LUNC
              </FormHelperText>
            </Box>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 3, mb: 2 }}
          disabled={autheticated ? errInput.input : autheticated}
        >
          Buy LUNC
        </Button>
      </Box>
      <Swap
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        offerDenom="USDT"
        askDenom="LUNC"
      />
    </>
  );
};
