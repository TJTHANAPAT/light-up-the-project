import React, { useState } from 'react';
import { useAuth } from './authentication';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
}));

const UserProfileSetting = () => {
  const auth = useAuth();
  const { user } = auth;
  const [displayName, setDisplayName] = useState(user.displayName);
  const handleChangeDisplayName = event => {
    setDisplayName(event.target.value);
  };
  const updateUserDisplayName = event => {
    event.preventDefault();
    auth
      .updateUserProfile({ displayName, admin: true })
      .then(() => {
        alert('saved');
      })
      .catch(err => {
        console.error(err.message);
      });
  };
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" component="h1">
        Your Profile
      </Typography>
      <form onSubmit={updateUserDisplayName} className={classes.root}>
        <Box mt={2}>
          <TextField id="email" value={user.email} disabled label="Email" />
          <TextField
            id="display_name"
            value={displayName}
            onChange={handleChangeDisplayName}
            required
            label="Display Name"
          />
        </Box>
        <Box mt={5}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};

export default UserProfileSetting;
