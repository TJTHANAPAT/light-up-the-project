import { AuthProvider, useAuth } from './auth/authentication';
import SignUpForm from './auth/SignUpForm';
import SignInForm from './auth/SignInForm';
import SignOutBtn from './auth/SignOupBtn';
import UserProfileSetting from './auth/UserProfileSetting';

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
    return <>{!!auth.user ? <AdminPage /> : <SignInPage />}</>;
  }
};

const AdminPage = () => {
  const auth = useAuth();
  return (
    <>
      <p>
        Signed in as {auth.user.displayName} ({auth.user.email})
      </p>
      <SignOutBtn />
      <UserProfileSetting />
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
