import { useState } from "react";
import { io } from "socket.io-client";
import candle from "../utils/candle";
const socket = io("http://localhost:5000");
socket.on("connect", () => {
  console.log("conectado");
});
let globalMarket = [];
let globalPrice = 0;
let globalCandlestick = [];
let globalInterval = "";
export default function useSocketMarket() {
  const [coin, setCoin] = useState({});
  const [market, setMarket] = useState([]);
  const [candlestick, setCandlestick] = useState([]);
  const [statusTrade, setStatusTrade] = useState("I");
  function executePriceCoin(denom) {
    if (denom != null) {
      socket.emit("price_" + denom, { Denom: denom });
      socket.on("price_" + denom, (msg) => {
        setCoin(msg);

        if (
          (typeof msg?.Price === "number" ? msg.Price.toFixed(6) : 0) ===
          globalPrice
        ) {
          console.log("status I " + msg?.Price + ", " + globalPrice);
          setStatusTrade("I");
        } else {
          if (
            (typeof msg?.Price === "number" ? msg.Price.toFixed(6) : 0) >
            globalPrice
          ) {
            //console.log("status U " + msg?.Price + ", " + globalPrice);
            setStatusTrade("U");
          } else {
            //console.log("status D " + msg?.Price + ", " + globalPrice);
            setStatusTrade("D");
          }
        }
        globalPrice = msg?.Price;
      });
    }
  }
  function executeCandlestick(denom, interval) {
    if (denom != null) {
      if (globalInterval === "") {
        globalInterval = interval;
      } else {
        if (globalInterval !== interval) {
          globalInterval = interval;
          globalCandlestick = [];
          //setCandlestick([]);
        }
      }
      socket.emit("candlestick_" + denom, { Denom: denom, Interval: interval });
      socket.on("candlestick_" + denom, (list) => {
        const candles = list.map((k) => {
          return new candle(k._id.time, k.open, k.high, k.low, k.close);
        });

        if (globalCandlestick.length === 0) {
          globalCandlestick = candles;
          setCandlestick(globalCandlestick);
        } else {
          if (candles.length === 1) {
            if (
              globalCandlestick[globalCandlestick.length - 1].y[0] ===
              candles[0].y[0]
            ) {
              globalCandlestick.shift();
              globalCandlestick.push(candles[0]);

              setCandlestick(globalCandlestick);
              console.log("emit -1:", candlestick);
              // console.log("emit c:", globalCandlestick);
              //globalCandlestick[globalCandlestick.length - 1] = candles[0];
            } else {
              globalCandlestick.push(candles[0]);
              // console.log("emit 2:", globalCandlestick);
              setCandlestick(globalCandlestick);
            }
          }
        }
      });
    }
  }
  function executePriceMarket(denom) {
    if (denom != null) {
      socket.emit("market_" + denom, { Denom: denom });
      socket.on("market_" + denom, (msg) => {
        if (globalMarket.length === 0) {
          globalMarket = msg;
          setMarket(msg);
        } else {
          setMarket(null);
          globalMarket.unshift(msg[0]);
          if (globalMarket.length > 15) {
            globalMarket.pop();
          }

          setMarket(globalMarket);
        }
      });
    }
  }

  return {
    executePriceMarket,
    market,
    executePriceCoin,
    coin,
    statusTrade,
    executeCandlestick,
    candlestick,
  };
}
