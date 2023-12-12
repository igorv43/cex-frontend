import api from "../utils/api";
import { useState } from "react";
export default function useCoin() {
  const [symbol, setSymbol] = useState("LUNC/USDT");
  const [denom, setDenom] = useState("LUNC");
  async function find() {
    try {
      const data = await api.get("/coin/find").then((response) => {
        return response.data;
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  function splitSymbol(value) {
    const pair = value.split("/");
    const denom = pair[0];
    return denom;
  }
  return { find, symbol, setSymbol, denom, setDenom, splitSymbol };
}
