import api from "../utils/api";
import { useState } from "react";
export default function useMarketExecution() {
  const [token] = useState(localStorage.getItem("token") || "");

  async function findId(id) {
    try {
      const data = await api
        .get("/marketExecution/findIdMarket/?id=" + id, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
        .then((response) => {
          return response.data;
        });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return { findId };
}
