import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import useUser from 'store/modules/user/useUser';

export default function FormDialog({
  open,
  setOpen,
  signIn,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  signIn: boolean;
}) {
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');

  const { login } = useUser();

  const handleSubmit = () => {
    if (!signIn)
      fetch('http://localhost:1337/api/auth/local/register', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          password: pass,
          email,
          username: user,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem('token', res.jwt);
          console.log('가입', res);
          login(res.user);
        })
        .finally(() => setOpen(false));
    else
      fetch('http://localhost:1337/api/auth/local', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          password: pass,
          identifier: email, //user || email,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem('token', res.jwt);
          console.log('로긘', res);
          if (res.error) {
            alert(res.error.message);
          } else {
            login(res.user);
          }
        })
        .finally(() => {
          setOpen(false);
        });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {signIn ? 'Login' : 'Register'}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>Please provide details</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {!signIn && (
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="email"
              fullWidth
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          )}
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
