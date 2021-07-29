import { Switch, Route, useRouteMatch } from 'react-router-dom';
import UserProfileSetting from './auth/UserProfileSetting';
import YearConsole from './year-console/YearConsole';
import MenuBar from './components/MenuBar';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import MainConsole from './main-console/MainConsole';

export default function AdminConsole() {
  const match = useRouteMatch();

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
              <MainConsole/>
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
