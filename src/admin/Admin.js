import { AuthProvider, useAuth } from './auth/authentication';
import { AdminStoreProvider } from './store/store';
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

const SignInRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() =>
        auth.user ? (
          <Redirect
            to={{
              pathname: '/admin',
            }}
          />
        ) : (
          children
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
        <SignInRoute exact path="/admin/signin">
          <SignInPage />
        </SignInRoute>

        <AdminRoute path="/admin">
          <AdminStoreProvider>
            <AdminConsole />
          </AdminStoreProvider>
        </AdminRoute>
      </Switch>
    );
  }
};
