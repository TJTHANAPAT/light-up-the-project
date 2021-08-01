import React, { useState } from 'react';
import { useAuth } from './authentication';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default function SignInForm() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState(null)
  const handleChangeInput = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const auth = useAuth();
  const history = useHistory();

  const signIn = event => {
    event.preventDefault();

    const { email, password } = formState;
    console.log(email);
    auth
      .signIn(email, password)
      .then(user => {
        console.log(`Signed In as ${user.displayName}`);
        history.replace({ pathname: "/admin" });
      })
      .catch(err => {
        console.error(err);
        setFormError(err.message)
      });
  };

  const classes = useStyles();

  return (
    <form onSubmit={signIn} className={classes.root}>
      <Box mt={2} display="flex" flexDirection="column" alignItems="center">
        <TextField
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChangeInput}
          required
          label="Email"
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChangeInput}
          required
          label="Password"
          fullWidth
        />
      </Box>
      <Box mt={4}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
        >
          Sign in
        </Button>
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color="error">{formError}</Typography>
      </Box>
    </form>
  );
}
