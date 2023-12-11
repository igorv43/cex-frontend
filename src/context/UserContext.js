import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import useWithdraw from "../hooks/useWithdraw";
import useSwap from "../hooks/useSwap";
const context = createContext();
function UserProvider({ children }) {
  const { autheticated, register, logout, login, user } = useAuth();
  const { sendWithdraw } = useWithdraw();
  const { switchCurrency } = useSwap();
  return (
    <context.Provider
      value={{
        autheticated,
        register,
        logout,
        login,
        user,
        sendWithdraw,
        switchCurrency,
      }}
    >
      {children}
    </context.Provider>
  );
}
export { context, UserProvider };
