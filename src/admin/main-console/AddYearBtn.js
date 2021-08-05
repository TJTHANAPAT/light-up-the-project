import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

export default function AddYearBtn() {
  const classes = useStyles();
  return (
    <Button className={classes.root} variant="outlined">
      <AddIcon />
    </Button>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    minHeight: '136px',
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.5)',
  },
}));
