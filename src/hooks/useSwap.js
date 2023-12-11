import api from "../utils/api";
import { useState, useEffect } from "react";
import useFlashMessage from "./useFlashMassage";
export default function useSwap() {
  const { setFlashMessage } = useFlashMessage();

  const [token] = useState(localStorage.getItem("token") || "");
  async function switchCurrency(obj) {
    let msgText = "sucessc";
    let msgType = "success";

    try {
      const data = await api
        .post("/coinLiquidity/swap", obj, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
        .then(async (response) => {
          setFlashMessage(msgText, msgType);
          return { status: "ok" };
        });
      return data;
    } catch (error) {
      //console.log(error);
      msgText = error?.response?.data?.message;
      msgType = "error";
      setFlashMessage(msgText, msgType);
      return { status: "error" };
    }
  }
  return { switchCurrency };
}
