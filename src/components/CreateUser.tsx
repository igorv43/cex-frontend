import {
  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useState } from "react";
import { context } from "../context/UserContext";
import Menssage from "./Message";
type Props = {
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
};
const CreateUser: React.FC<Props> = ({
  handleClickOpen,
  handleClose,
  open,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = useState({});
  const { register } = useContext(context);

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    register(user);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} maxWidth={"xs"}>
        <DialogTitle>Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Menssage />
          </DialogContentText>
          <TextField
            autoFocus
            size="small"
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            size="small"
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            size="small"
            name="password"
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            size="small"
            margin="dense"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default CreateUser;
