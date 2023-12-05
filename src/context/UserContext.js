import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import useWithdraw from "../hooks/useWithdraw";

const context = createContext();
function UserProvider({ children }) {
  const { autheticated, register, logout, login, user } = useAuth();
  const { sendWithdraw } = useWithdraw();
  return (
    <context.Provider
      value={{ autheticated, register, logout, login, user, sendWithdraw }}
    >
      {children}
    </context.Provider>
  );
}
export { context, UserProvider };
