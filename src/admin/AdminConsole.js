import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { useAuth } from './auth/authentication';
import { useAdminStore } from './adminStore';
import SignOutBtn from './auth/SignOupBtn';
import UserProfileSetting from './auth/UserProfileSetting';
import BoothGroupConfig from './year-console/BoothGroupConfig';
import YearConsole from './year-console/YearConsole';

const AdminConsole = () => {
  const auth = useAuth();
  let match = useRouteMatch();
  return (
    <>
      <span>
        Signed in as {auth.user.displayName} ({auth.user.email}) <SignOutBtn />
      </span>

      <ul>
        <li>
          <Link to={`${match.path}/`}>Home</Link>
        </li>
        <li>
          <Link to={`${match.path}/userprofile`}>User Profile Setting</Link>
        </li>
      </ul>
      <hr />

      <Switch>
        <Route path={`${match.path}/userprofile`} exact>
          <UserProfileSetting />
        </Route>
        <Route path={`${match.path}/year/:yearId`} exact>
          <YearConsole/>
        </Route>
        <Route path={`${match.path}`} exact>
          <h1>Admin Console</h1>
          <YearSelector />
        </Route>
        <Route path={`${match.path}`}>
          <p>Opps! Page not found.</p>
        </Route>
      </Switch>
    </>
  );
};

export default AdminConsole;

const YearSelector = () => {
  let match = useRouteMatch();
  const adminStore = useAdminStore();
  const { currentYear, yearConfigs } = adminStore;
  if (adminStore.isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <p>CurrentYear: {currentYear}</p>
        {yearConfigs.map(year => (
          <div key={year.yearId}>
            <h4>{year.yearName}</h4>
            <span>ID: {year.yearId}</span>
            <br />
            <Link to={`${match.path}/year/${year.yearId}`}>
              Go to year console
            </Link>
            <br />
            <br />
          </div>
        ))}
      </>
    );
  }
};
