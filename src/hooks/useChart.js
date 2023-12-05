import axios from "axios";
import candle from "../utils/candle";

export default function useChart() {
  async function getCandles(symbol = "LUNC/USDT", interval = "minute") {
    const response = await axios.get(
      `http://localhost:5000/charts/candlestick/?symbol=${symbol.toUpperCase()}&interval=${interval}`
    );

    const candles = response.data.map((k) => {
      return new candle(k.createdAt, k.open, k.high, k.low, k.close);
    });
    //console.log("map: ", candles);
    return candles;
  }

  return { getCandles };
}
