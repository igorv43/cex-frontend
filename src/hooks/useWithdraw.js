import api from "../utils/api";
import { useState, useEffect } from "react";
import useFlashMessage from "./useFlashMassage";
export default function useWithdraw() {
  const { setFlashMessage } = useFlashMessage();

  const [token] = useState(localStorage.getItem("token") || "");
  async function sendWithdraw(obj) {
    let msgText = "success";
    let msgType = "success";

    try {
      const data = await api
        .post("/bank/Withdraw", obj, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        })
        .then(async (response) => {
          setFlashMessage(msgText, msgType);
        });
      return data;
    } catch (error) {
      console.log(error);
      msgText = error?.response?.data?.message;
      msgType = "error";
      setFlashMessage(msgText, msgType);
    }
  }
  return { sendWithdraw };
}
