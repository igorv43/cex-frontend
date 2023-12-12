import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
} from "@mui/material";
import { Trade } from "./components/Trade";
import { Buy } from "./components/Buy";
import { Sell } from "./components/Sell";
import Login from "./components/Login";
import { UserProvider } from "./context/UserContext";
import { CoinPrice } from "./components/CoinPrice";
import { SocketMarketProvider } from "./context/SocketMarketContext";
import Market from "./components/Market";
import { ChartCandle } from "./components/ChartCandle";
import { CoinProvider } from "./context/CoinContext";
function App() {
  return (
    <>
      <CoinProvider>
        <UserProvider>
          <SocketMarketProvider>
            <Container maxWidth={false}>
              {/* <Container maxWidth="xl"> */}

              <Grid container mb={12} spacing={1}>
                <Grid item xs={12} md={12} mb={1}>
                  <CoinPrice />
                </Grid>
                <Grid item xs={12} md={9} mb={1}>
                  <ChartCandle />
                </Grid>
                <Grid item xs={12} md={3} mb={1} sx={{ minHeight: 400 }}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    mb={1}
                    sx={{ background: "#FFFFFF", minHeight: 510 }}
                  >
                    <Trade />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={7} mb={1}>
                  {/* Componente trade */}

                  <Box>
                    <Grid container mb={12} spacing={2}>
                      <Grid item xs={12} md={12} mb={1}>
                        <Box>
                          <Market />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} md={5} mb={1}>
                  <Grid item xs={12} md={12} mb={1}>
                    <Card>
                      <CardContent>
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            md={6}
                            mb={1}
                            sx={{ background: "#F7FFF8", minHeight: 510 }}
                          >
                            <Box
                              sx={{
                                padding: 2,
                                display: "flex",
                              }}
                            >
                              <Buy />
                            </Box>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            md={6}
                            mb={1}
                            sx={{ background: "#FEF6F4" }}
                          >
                            <Box
                              sx={{
                                padding: 2,
                                display: "flex",
                              }}
                            >
                              <Sell />
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </SocketMarketProvider>
        </UserProvider>
      </CoinProvider>
    </>
  );
}

export default App;
