import * as React from "react";
import Paper from "@mui/material/Paper";
import useMarket from "../hooks/useMarket";
import { useCallback, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Orders } from "./Orders";
import { context } from "../context/UserContext";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
export default function Market() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [rowsOpenOrders, setRowsOpenOrders] = React.useState<any[]>([]);
  const [value, setValue] = React.useState("1");
  const { find, findOpenOrders } = useMarket();
  const { user: userAut } = useContext(context);
  const [userSocket, setUserSocket] = React.useState(false);
  const incrementfind = useCallback(() => {
    const objDenom = async () => {
      const data = await find();
      if (data) {
        setRows(data);
      }
    };
    objDenom().catch(console.error);
  }, []);
  const incrementfindOpenOrders = useCallback(() => {
    const objDenom = async () => {
      const data = await findOpenOrders();
      if (data) {
        setRowsOpenOrders(data);
      }
    };
    objDenom().catch(console.error);
  }, []);
  useEffect(() => {
    incrementfindOpenOrders();

    if (userAut.userId != null) {
      if (!userSocket) {
        console.log("autenticado", userAut);
        socket.emit("alertUser", userAut.userId);
        socket.on("alertUser", (obj) => {
          if (obj.type === "market") {
            incrementfindOpenOrders();
          }
        });
        setUserSocket(true);
      }
    }
  }, [userAut]);

  const handleChangex = (event: any, newValue: any) => {
    setValue(newValue);
    if (newValue == 2) {
      incrementfind();
    } else {
      incrementfindOpenOrders();
    }
  };
  // global._io
  // .to(market01.User._id)
  // .emit("alertUser", { type: "market", data: market01 });
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChangex}>
                <Tab label="Open Orders" value="1" />
                <Tab label="Orders History" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Orders rows={rowsOpenOrders} />
            </TabPanel>
            <TabPanel value="2">
              <Orders rows={rows} />
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
    </>
  );
}
