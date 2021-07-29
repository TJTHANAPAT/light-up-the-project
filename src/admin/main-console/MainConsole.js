import { useAdminStore } from '../adminStore';
import { useRouteMatch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import YearCard from './YearCard';
import Loading from '../components/Loading';

export default function MainConsole() {
  const match = useRouteMatch();
  const adminStore = useAdminStore();
  const { currentYear, yearConfigs } = adminStore;
  const classes = useStyles();

  if (adminStore.isLoading) {
    return (
      <Loading/>
    );
  } else {
    return (
      <>
        <Box className={classes.root} mb={3}>
          <Grid container spacing={2}>
            {yearConfigs.map(year => (
              <Grid item xs={12} sm={6} md={3} key={year.yearId}>
                <YearCard
                  yearId={year.yearId}
                  yearName={year.yearName}
                  manageLink={`${match.path}/year/${year.yearId}`}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Typography variant="body1">CurrentYear: {currentYear}</Typography>
      </>
    );
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));
