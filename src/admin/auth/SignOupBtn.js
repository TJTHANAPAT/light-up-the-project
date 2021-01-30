import { useAuth } from './authentication';

const SignOutBtn = () => {
  const auth = useAuth();
  return <button onClick={auth.signOut}>Sign out</button>;
};

export default SignOutBtn;
