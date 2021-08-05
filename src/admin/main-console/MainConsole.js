import { useAdminStore } from '../store/store';
import { useRouteMatch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import YearCard from './YearCard';
import AddYearBtn from './AddYearBtn';

export default function MainConsole() {
  const match = useRouteMatch();
  const classes = useStyles();

  const adminStore = useAdminStore();
  const { state } = adminStore;

  return (
    <>
      <Box className={classes.root} mb={3}>
        <Grid container spacing={2}>
          {state.years &&
            state.years.map(year => {
              return (
                <Grid item xs={12} sm={6} md={3} key={year.yearId}>
                  <YearCard
                    yearId={year.yearId}
                    yearName={year.yearName}
                    manageLink={`${match.path}/year/${year.yearId}`}
                  />
                </Grid>
              );
            })}
          <Grid item xs={12} sm={6} md={3}>
            <AddYearBtn />
          </Grid>
        </Grid>
      </Box>
      {state.systemConfig && (
        <Typography variant="body1">
          CurrentYear: {state.systemConfig.currentYear}
        </Typography>
      )}
    </>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));
