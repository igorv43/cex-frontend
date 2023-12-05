import Chart from "react-apexcharts";
import { useEffect, useState, useContext, useCallback } from "react";
import useChart from "../hooks/useChart";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
//import { context as socketMarketContex } from "../context/SocketMarketContext";
import Grid from "@mui/material/Grid";
import { io } from "socket.io-client";
import candle from "../utils/candle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
const socket = io("http://localhost:5000");

/**
 *
 * @param {data} props
 * @returns
 */
let globalCandlestickPage = [];
let globalInterval = "15_minute";
export const ChartCandle = () => {
  const [data, setData] = useState([]);
  const [symbol, setSymbol] = useState("LUNC/USDT");
  const [interval, setInterval] = useState("15_minute");
  const { getCandles } = useChart();
  const [candlestick, setCandlestick] = useState([]);

  function onSymbolChange(event) {
    //alert(event.target.value);
    setSymbol(event.target.value);
    setCandlestick([]);
  }
  function onIntervalChange(event) {
    socket.emit("uncandlestick", {
      Denom: symbol,
      Interval: globalInterval,
    });
    globalInterval = event.target.value;
    setInterval(event.target.value);
    setCandlestick([]);
    globalCandlestickPage = [];

    socket.emit("candlestick", {
      Denom: symbol,
      Interval: event.target.value,
    });
  }

  useEffect(() => {
    console.log("conta: ", candlestick.length);
    if (candlestick.length == 0) {
      socket.emit("candlestick", {
        Denom: symbol,
        Interval: interval,
      });
    }
    // console.log("candlestick_" + symbol + "_" + interval);
    socket.on("candlestick", (list) => {
      //if (Denom === aDenom && Intervalx === globalInterval) {
      const candles = list.map((k) => {
        return new candle(k._id.time, k.open, k.high, k.low, k.close);
      });
      console.log(list);
      setCandlestick(candles);
      // }

      // if (globalCandlestickPage.length === 0) {
      //   globalCandlestickPage = candles;
      //   setCandlestick(globalCandlestickPage);
      // } else {
      //   if (candles.length === 1) {
      //     if (
      //       globalCandlestickPage[globalCandlestickPage.length - 1].y[0] ===
      //       candles[0].y[0]
      //     ) {
      //       // globalCandlestickPage.shift();
      //       globalCandlestickPage[globalCandlestickPage.length - 1].y[0] =
      //         candles[0];
      //       // globalCandlestickPage.push(candles[0]);
      //       console.log("xx ", globalCandlestickPage.length);
      //       //setCandlestick(candlestick);
      //       setCandlestick(globalCandlestickPage);
      //     } else {
      //       globalCandlestickPage.push(candles[0]);
      //       setCandlestick(globalCandlestickPage);
      //     }
      //   }
      // }
    });
    //JSON.stringify(candlestick)
  }, []);
  //console.log("inbterval: ", candlestick);
  //executeCandlestick(symbol, interval);
  //incrementSocket();
  const series = [
    {
      data: candlestick,
    },
  ];
  const options = {
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Grid item xs={12} md={12} mb={1}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Pair</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Pair"
              value={symbol}
              onChange={onSymbolChange}
            >
              <MenuItem value={"LUNC/USDT"}>LUNCUSDT</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Time</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Time"
              value={interval}
              onChange={onIntervalChange}
            >
              <MenuItem value={"15_minute"}>15 minute</MenuItem>
              <MenuItem value={"30_minute"}>30 minute</MenuItem>
              <MenuItem value={"1_hour"}>1 hour</MenuItem>
              <MenuItem value={"1_day"}>day</MenuItem>
            </Select>
          </FormControl>

          <Chart
            options={options}
            series={series}
            type="candlestick"
            width={"100%"}
            height={420}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};
