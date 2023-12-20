import { Card, CardContent, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useContext, useEffect, useState } from "react";
import { context as socketMarketContex } from "../context/SocketMarketContext";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { context as coinContex } from "../context/CoinContext";
import Login from "./Login";
let priceDefault = 0;
export const CoinPrice = () => {
  const { executePriceCoin, coin, statusTrade } =
    useContext(socketMarketContex);
  const { symbol, denom } = useContext(coinContex);

  useEffect(() => {
    executePriceCoin(symbol);
  }, [symbol]);

  return (
    <>
      <Grid container spacing={0} sx={{ background: "#FFFFFF" }}>
        <Grid item xs={12} md={1} mb={1} sx={{ margin: 1 }}>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            {symbol}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ minHeight: 20 }} />
        <Grid item xs={12} md={1} mb={1} sx={{ margin: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontSize: 15 }}
            color={
              statusTrade === "I"
                ? "text.primary"
                : statusTrade === "U"
                ? "green"
                : "red"
            }
            gutterBottom
          >
            {typeof coin?.Price === "number" ? coin.Price.toFixed(6) : null}
            {/* {statusTrade === "U" ? <TrendingUpIcon color="success" /> : ""}
            {statusTrade === "D" ? <TrendingDownIcon color="error" /> : ""} */}
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            $ {typeof coin?.Price === "number" ? coin.Price.toFixed(6) : null}
          </Typography>{" "}
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ minHeight: 20 }} />
        <Grid item xs={12} md={1} mb={1} sx={{ margin: 1 }}>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Supply({denom})
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
            {typeof coin?.Supply === "number"
              ? coin.Supply.toLocaleString("en-IN")
              : null}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ minHeight: 20 }} />
        <Grid item xs={12} md={1} mb={1} sx={{ margin: 1 }}>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Amount Buy
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
            {typeof coin?.TotalBuy === "number"
              ? coin.TotalBuy.toLocaleString("en-IN")
              : null}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ minHeight: 20 }} />
        <Grid item xs={12} md={1} mb={1} sx={{ margin: 1 }}>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Price Buy
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
            ${" "}
            {typeof coin?.TotalPriceBuy === "number"
              ? coin.TotalPriceBuy.toFixed(6).toLocaleString("en-IN")
              : null}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ minHeight: 20 }} />
        <Grid item xs={12} md={1} mb={1} sx={{ margin: 1 }}>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Amount Sell
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
            {typeof coin?.TotalSell === "number"
              ? coin.TotalSell.toLocaleString("en-IN")
              : null}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ minHeight: 20 }} />
        <Grid item xs={12} md={1} mb={1} sx={{ margin: 1 }}>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Price Sell
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
            ${" "}
            {typeof coin?.TotalPriceSell === "number"
              ? coin.TotalPriceSell.toFixed(2)
              : null}
          </Typography>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ minHeight: 20 }} />
        <Grid item xs={12} md={4} mb={1} sx={{ margin: 1 }}>
          <Login values={""} />
        </Grid>
      </Grid>
    </>
  );
};
//https://www.youtube.com/watch?v=n0XTxlp68wc
