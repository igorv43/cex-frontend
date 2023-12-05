import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CreateUser from "./CreateUser";
import { useContext } from "react";
import { context } from "../context/UserContext";
import Menssage from "./Message";
type Props = {
  values: any;
};

const Login: React.FC<Props> = ({ values }) => {
  const [open, setOpen] = React.useState(false);
  const { autheticated, logout, user: userAut } = useContext(context);
  const [user, setUser] = useState({});
  const { login } = useContext(context);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);

    login(user);
  };
  return (
    <>
      {autheticated ? (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            ></Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Wallet:{userAut.wallet}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Memo: {userAut.userId}
            </Typography>
            <button onClick={logout}>logout</button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Container>
                <Menssage />
                <Box
                  sx={{
                    marginTop: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h3" variant="h5">
                    Sign in {autheticated}
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      size="small"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoFocus
                      onChange={handleChange}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      onChange={handleChange}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      size="small"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      {/* <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                      <Grid item>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={handleClickOpen}
                        >
                          {"Don't have an account?"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </CardContent>
          </Card>
          <CreateUser
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            open={open}
          />
        </>
      )}
    </>
  );
};

export default Login;
