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
        // <Card sx={{ minWidth: 275 }}>
        //   <CardContent>
        <Grid container spacing={0}>
          <Grid item xs={10}>
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
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={logout}
              size="small"
              variant="contained"
              color="warning"
            >
              logout
            </Button>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Menssage />
                <TextField
                  size="small"
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  onChange={handleChange}
                />{" "}
                <TextField
                  required
                  size="small"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                />{" "}
                <Button type="submit" size="small" variant="contained">
                  Sign In
                </Button>
                {/* <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Link href="#" variant="body2" onClick={handleClickOpen}>
                {"Don't have an account?"}
              </Link>
            </Grid>
          </Grid>

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
