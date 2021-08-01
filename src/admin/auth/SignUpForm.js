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

const SignUpForm = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name_first: '',
    name_last: '',
  });
  const [formError, setFormError] = useState(null);
  const handleChangeInput = event => {
    console.log(`${event.target.name}: ${event.target.value}`);
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const auth = useAuth();
  const history = useHistory();

  const signUp = event => {
    event.preventDefault();
    const { email, password, name_first, name_last } = formState;
    const displayName = `${name_first} ${name_last}`;
    auth
      .signUp(email, password, displayName)
      .then(() => {
        history.replace({ pathname: '/admin' });
        console.log('Created account successfully.');
      })
      .catch(err => {
        console.log(err);
        setFormError(err.message);
      });
  };

  const classes = useStyles();

  return (
    <form onSubmit={signUp} className={classes.root}>
      <Box mt={2} display="flex" flexDirection="column" alignItems="center">
        <TextField
          type="text"
          name="name_first"
          value={formState.name_first}
          onChange={handleChangeInput}
          required
          label="First Name"
          fullWidth
        />
        <TextField
          type="text"
          name="name_last"
          value={formState.name_last}
          onChange={handleChangeInput}
          required
          label="Last Name"
          fullWidth
        />
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
          Sign Up
        </Button>
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color="error">
          {formError}
        </Typography>
      </Box>
    </form>
  );
};

export default SignUpForm;
