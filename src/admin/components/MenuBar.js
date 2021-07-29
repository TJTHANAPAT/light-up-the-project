import { Link } from 'react-router-dom';
import { useAuth } from '../auth/authentication';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
  },
}));

export default function MenuBar() {
  const auth = useAuth();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to={`/admin`}
            color="inherit"
            variant="h6"
            className={classes.title}
          >
            LightUpTheProject
          </Typography>
          <Hidden mdUp>
            <IconButton
              component={Link}
              to="/admin/userprofile"
              color="inherit"
              aria-label="profile"
            >
              <PersonIcon />
            </IconButton>
          </Hidden>
          <Hidden smUp>
            <IconButton
              color="inherit"
              aria-label="sign out"
              onClick={auth.signOut}
            >
              <ExitToAppIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown>
            <Button
              component={Link}
              to="/admin/userprofile"
              color="inherit"
              startIcon={<PersonIcon />}
            >
              {auth.user.displayName}
            </Button>
          </Hidden>
          <Hidden xsDown>
            <Button color="inherit" onClick={auth.signOut} startIcon={<ExitToAppIcon />}>
              Sign Out
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
