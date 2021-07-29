import { AuthProvider, useAuth } from './auth/authentication';
import { AdminStoreProvider } from './adminStore';
import AdminConsole from './AdminConsole';
import SignInPage from './auth/SignInPage';
import LoadingCover from './components/LoadingCover';
import { Route, Switch, Redirect } from 'react-router-dom';

export default function Admin() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

const AdminRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/admin/signin',
            }}
          />
        )
      }
    />
  );
};

const Main = () => {
  const auth = useAuth();
  if (auth.isInitialConnecting) {
    return <LoadingCover />;
  } else {
    console.log('Current User: ', auth.user);
    return (
      <Switch>
        <Route exact path="/admin/signin">
          <SignInPage />
        </Route>

        <AdminRoute path="/admin">
          <AdminStoreProvider>
            <AdminConsole />
          </AdminStoreProvider>
        </AdminRoute>
      </Switch>
    );
  }
};
