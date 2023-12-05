import api from "../utils/api";
import { useState, useEffect } from "react";
import useFlashMessage from "./useFlashMassage";
export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();
  const [autheticated, setAutheticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;

      setAutheticated(true);
      const objUser = async () => {
        const token = localStorage.getItem("token");
        let config = {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        };
        try {
          const data = await api
            .get("/user/checkUser", config)
            .then((response) => {
              // console.log(response.data);
              return setUser(response.data);
            });
        } catch (error) {
          console.log(error);
        }
      };
      objUser().catch(console.error);
      objUser();
    }
  }, []);
  async function register(user) {
    let msgText = "sucessc";
    let msgType = "success";
    try {
      const data = await api.post("/user/register", user).then((response) => {
        return response.data;
      });
      await authUser(data);
    } catch (error) {
      console.log(error);
      msgText = error?.response?.data?.message;
      msgType = "error";
    }
    setFlashMessage(msgText, msgType);
  }
  async function authUser(data) {
    setUser(data);
    setAutheticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));
  }
  function logout() {
    setAutheticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
  }
  async function login(user) {
    try {
      const data = await api.post("/user/login", user).then((response) => {
        return response.data;
      });
      await authUser(data);
    } catch (error) {
      setFlashMessage(error?.response?.data?.message, "error");
    }
  }
  return { autheticated, register, logout, login, user };
}
