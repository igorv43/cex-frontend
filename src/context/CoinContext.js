import { createContext } from "react";
import useCoin from "../hooks/useCoin";
const context = createContext();
function CoinProvider({ children }) {
  const { find, symbol, setSymbol, denom, setDenom, splitSymbol } = useCoin();

  return (
    <context.Provider
      value={{
        find,
        symbol,
        setSymbol,
        denom,
        setDenom,
        splitSymbol,
      }}
    >
      {children}
    </context.Provider>
  );
}
export { context, CoinProvider };
