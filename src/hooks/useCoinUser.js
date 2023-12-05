import api from "../utils/api";
import { useState } from "react";
export default function useCoinUser() {
  const [token] = useState(localStorage.getItem("token") || "");
  async function findDenom(denom) {
    let config = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      params: {
        denom: denom,
      },
    };
    try {
      const data = await api
        .get("/coinUser/findDenom", config)
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
  async function find() {
    try {
      const data = await api
        .get("/coinUser/find", {
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
  return { findDenom, find };
}
