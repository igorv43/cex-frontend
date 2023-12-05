import api from "../utils/api";
import { useState } from "react";
import useCoinUser from "./useCoinUser";
export default function useMarket() {
  const [token] = useState(localStorage.getItem("token") || "");
  const [userCoins, setUserCoins] = useState([]);
  const { find: findCoinUser } = useCoinUser();
  async function buy(market) {
    // let msgText = "sucessc";
    // let msgType = "success";
    //console.log(market);
    try {
      const data = await api
        .post("/market/buy", market, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
        .then(async (response) => {
          const findx = await findCoinUser();

          return { data: response.data, userCoins: findx };
        });
      return data;
    } catch (error) {
      console.log(error);
      // msgText = error?.response?.data?.message;
      // msgType = "error";
    }
  }
  async function sell(market) {
    // let msgText = "sucessc";
    // let msgType = "success";
    //console.log(market);
    try {
      const data = await api
        .post("/market/sell", market, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
        .then(async (response) => {
          const findx = await findCoinUser();

          return { data: response.data, userCoins: findx };
        });
      return data;
    } catch (error) {
      console.log(error);
      // msgText = error?.response?.data?.message;
      // msgType = "error";
    }
  }
  async function find() {
    try {
      const data = await api
        .get("/market/find", {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
        .then((response) => {
          return response.data;
        });
      return data;
    } catch (error) {
      console.log(error);
      // msgText = error?.response?.data?.message;
      // msgType = "error";
    }
  }
  return { buy, sell, find };
}
