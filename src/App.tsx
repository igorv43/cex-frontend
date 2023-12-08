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
function App() {
  return (
    <>
      <UserProvider>
        <SocketMarketProvider>
          <Container maxWidth={false}>
            {/* <Container maxWidth="xl"> */}

            <Grid container mb={12} spacing={1}>
              <Grid item xs={12} md={12} mb={1}>
                <CoinPrice />
              </Grid>

              {/* <Grid item xs={12} md={3} mb={1}>
                <Box></Box>
              </Grid> */}
              <Grid item xs={12} md={9} mb={1}>
                {/* Componente trade */}
                <ChartCandle />
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
              <Grid item xs={12} md={3} mb={1}>
                <Grid item xs={12} md={12} mb={1}>
                  <Login values={""} />
                </Grid>
                <Grid item xs={12} md={12} mb={1}>
                  <Card>
                    <CardContent>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          md={12}
                          mb={1}
                          sx={{ background: "#F7FFF8" }}
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
                          md={12}
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
                <Trade />
              </Grid>
            </Grid>
          </Container>
        </SocketMarketProvider>
      </UserProvider>
    </>
  );
}

export default App;
