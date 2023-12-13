import Chart from "react-apexcharts";
import { useEffect, useState, useCallback, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { io } from "socket.io-client";
import candle from "../utils/candle";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { context } from "../context/CoinContext";
const socket = io("http://localhost:5000");

/**
 *
 * @param {data} props
 * @returns
 */
let globalInterval = "15_minute";
export const ChartCandle = () => {
  const [interval, setInterval] = useState("15_minute");
  const [candlestick, setCandlestick] = useState([]);
  const [listSymbol, setListSymbol] = useState([]);
  const { find, symbol, setSymbol, denom, setDenom, splitSymbol } =
    useContext(context);
  function onSymbolChange(event) {
    setSymbol(event.target.value);
    setDenom(splitSymbol(event.target.value));
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

    socket.emit("candlestick", {
      Denom: symbol,
      Interval: event.target.value,
    });
  }
  const incrementCallback = useCallback(() => {
    const obj = async () => {
      const data = await find();

      setListSymbol(data);
    };
    obj().catch(console.error);
  }, []);
  useEffect(() => {
    incrementCallback();
    if (candlestick.length == 0) {
      socket.emit("candlestick", {
        Denom: symbol,
        Interval: interval,
      });
    }

    socket.on("candlestick", (list) => {
      const candles = list?.map((k) => {
        return new candle(k._id.time, k.open, k.high, k.low, k.close);
      });

      setCandlestick(candles);
    });
  }, []);

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
              {listSymbol?.map((i) => {
                return (
                  <MenuItem value={i.Denom}>
                    {i.Denom.replace("/", "")}
                  </MenuItem>
                );
              })}
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
              <MenuItem value={"1_minute"}>1 minute</MenuItem>
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
            height={400}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};
