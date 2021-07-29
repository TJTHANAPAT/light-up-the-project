import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
  },
  manageButton: {
    marginLeft: 'auto',
    textDecoration: 'none',
  },
}));

export default function YearCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h6" component="h3">
          {props.yearName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.yearId}
        </Typography>
      </CardContent>
      <CardActions>

        <Button
          className={classes.manageButton}
          component={Link}
          to={props.manageLink}
          size="small"
          color="primary"
        >
          Manage
        </Button>
      </CardActions>
    </Card>
  );
}
