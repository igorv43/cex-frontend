import { createContext, useState } from "react";
import useSocketMarket from "../hooks/useSocketMarket";

const context = createContext();
function SocketMarketProvider({ children }) {
  const [coinPair1, setCoinPair1] = useState({
    Amount: 0,
  });
  const [coinPair2, setCoinPair2] = useState({
    Amount: 0,
  });
  const {
    executePriceMarket,
    market,
    setMarket,
    executePriceCoin,
    coin,
    statusTrade,
    executeCandlestick,
    candlestick,
  } = useSocketMarket();
  return (
    <context.Provider
      value={{
        executePriceMarket,
        market,
        setMarket,
        executePriceCoin,
        coin,
        coinPair1,
        setCoinPair1,
        coinPair2,
        setCoinPair2,
        statusTrade,
        executeCandlestick,
        candlestick,
      }}
    >
      {children}
    </context.Provider>
  );
}
export { context, SocketMarketProvider };
