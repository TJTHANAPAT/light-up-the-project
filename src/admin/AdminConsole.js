import { useEffect } from 'react';
import Loading from './components/Loading';
import { getSystemConfig, getAllYears } from './store/functions';

import { Switch, Route, useRouteMatch } from 'react-router-dom';
import UserProfileSetting from './auth/UserProfileSetting';
import YearConsole from './year-console/YearConsole';
import MenuBar from './components/MenuBar';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import MainConsole from './main-console/MainConsole';
import Typography from '@material-ui/core/Typography';

import { useAdminStore } from './store/store';

export default function AdminConsole() {
  const match = useRouteMatch();
  const adminStore = useAdminStore();
  const { state, dispatch } = adminStore;

  useEffect(() => {
    const fetchSystemConfig = async () => {
      try {
        dispatch({ type: 'loading', payload: true });
        if (!state.systemConfig && !state.years) {
          const systemConfig = await getSystemConfig();
          const years = await getAllYears();
          dispatch({ type: 'systemConfig', payload: systemConfig });
          dispatch({ type: 'years', payload: years });
        }
        dispatch({ type: 'loading', payload: false });
      } catch (err) {
        dispatch({ type: 'loading', payload: false });
        dispatch({ type: 'error', payload: err.message });
      }
    };
    fetchSystemConfig();
  }, []);

  if (state.loading || !!state.error) {
    return (
      <>
        <MenuBar />
        <Container maxWidth={false}>
          <Box my={5}>
            {state.loading && (
              <Box>
                <Loading />
              </Box>
            )}
            {state.error && (
              <Box>
                <Typography variant="body1">Error: {state.error}</Typography>
              </Box>
            )}
          </Box>
        </Container>
      </>
    );
  }
  return (
    <>
      <MenuBar />
      <Container maxWidth={false}>
        <Box my={5}>
          <Switch>
            <Route path={`${match.path}/userprofile`} exact>
              <UserProfileSetting />
            </Route>
            <Route path={`${match.path}/year/:yearId`} exact>
              <YearConsole />
            </Route>
            <Route path={`${match.path}`} exact>
              <MainConsole />
            </Route>
            <Route path={`${match.path}`}>
              <p>Opps! Page not found.</p>
            </Route>
          </Switch>
        </Box>
      </Container>
    </>
  );
}
