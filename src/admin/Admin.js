import { AuthProvider, useAuth } from './auth/authentication';
import SignUpForm from './auth/SignUpForm';
import SignInForm from './auth/SignInForm';

import { AdminStoreProvider } from './adminStore';
import AdminConsole from './AdminConsole';

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
    return (
      <>
        {!!auth.user ? (
          <AdminStoreProvider>
            <AdminConsole />
          </AdminStoreProvider>
        ) : (
          <SignInPage />
        )}
      </>
    );
  }
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
