import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/authentication';
import SignUpForm from './auth/SignUpForm';
import SignInForm from './auth/SignInForm';
import SignOutBtn from './auth/SignOupBtn';
import UserProfileSetting from './auth/UserProfileSetting';
import BoothGroupConfig from './BoothGroupConfig';

const Admin = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

const Main = () => {
  const auth = useAuth();
  console.log('Current User: ', auth.user);
  if (auth.isInitialConnecting) {
    return <p>Loading...</p>;
  } else {
    return <>{!!auth.user ? <AdminConsole /> : <SignInPage />}</>;
  }
};

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
        <li>
          <Link to={`${match.path}/config/boothgroups`}>
            Booth Groups Config
          </Link>
        </li>
      </ul>
      <hr />

      <Switch>
        <Route path={`${match.path}/userprofile`} exact>
          <UserProfileSetting />
        </Route>
        <Route path={`${match.path}/config/boothgroups`} exact>
          <BoothGroupConfig />
        </Route>
        <Route path={`${match.path}`} exact>
          <h1>Admin Console</h1>
        </Route>
        <Route path={`${match.path}`}>
          <p>Opps! Page not found.</p>
        </Route>
      </Switch>
    </>
  );
};

const SignInPage = () => {
  return (
    <>
      <SignInForm />
      <p>or create a new account.</p>
      <SignUpForm />
    </>
  );
};

export default Admin;
