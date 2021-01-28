import React, { useState } from 'react';
import { AuthProvider, useAuth } from './authentication';

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
  if (auth.isConnecting) {
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

const SignOutBtn = () => {
  const auth = useAuth();
  return <button onClick={auth.signOut}>Sign out</button>;
};

const SignInForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const handleChangeInput = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const auth = useAuth();
  const signIn = event => {
    event.preventDefault();
    const { email, password } = formState;
    auth
      .signIn(email, password)
      .then(user => {
        console.log(`Signed In as ${user.displayName}`);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={signIn}>
      <label htmlFor="signin_email">Email: </label>
      <input
        type="email"
        id="signin_email"
        name="email"
        placeholder="example@mail.com"
        value={formState.email}
        onChange={handleChangeInput}
        required
      />
      <br />
      <label htmlFor="signin_password">Password: </label>
      <input
        type="password"
        id="signin_password"
        name="password"
        placeholder="password"
        value={formState.password}
        onChange={handleChangeInput}
        required
      />
      <br />
      <button type="submit">Sign in</button>
    </form>
  );
};

const SignUpForm = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name_first: '',
    name_last: '',
  });

  const handleChangeInput = event => {
    console.log(`${event.target.name}: ${event.target.value}`);
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const auth = useAuth();
  const signUp = event => {
    event.preventDefault();
    const { email, password, name_first, name_last } = formState;
    const displayName = `${name_first} ${name_last}`;
    auth
      .signUp(email, password, displayName)
      .then(() => {
        console.log('Created account successfully.');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={signUp}>
      <label htmlFor="signup_name_first">First Name: </label>
      <input
        type="text"
        id="signup_name_first"
        name="name_first"
        placeholder="First Name"
        value={formState.name_first}
        onChange={handleChangeInput}
        required
      />
      <label htmlFor="signup_name_last">Last Name: </label>
      <input
        type="text"
        id="signup_name_last"
        name="name_last"
        placeholder="Last Name"
        value={formState.name_last}
        onChange={handleChangeInput}
        required
      />
      <br />
      <label htmlFor="signup_email">Email: </label>
      <input
        type="email"
        id="signup_email"
        name="email"
        placeholder="example@mail.com"
        value={formState.email}
        onChange={handleChangeInput}
        required
      />
      <label htmlFor="signup_password">Password: </label>
      <input
        type="password"
        id="signup_password"
        name="password"
        placeholder="password"
        value={formState.password}
        onChange={handleChangeInput}
        required
      />
      <br />
      <button type="submit">Sign up</button>
    </form>
  );
};

const UserProfileSetting = () => {
  const auth = useAuth();
  const { user } = auth;
  const [displayName, setDisplayName] = useState(user.displayName);
  const handleChangeDisplayName = event => {
    setDisplayName(event.target.value);
  };
  const updateUserDisplayName = event => {
    event.preventDefault();
    auth
      .updateUserProfile({ displayName })
      .then(() => {
        alert('saved');
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  return (
    <form onSubmit={updateUserDisplayName}>
      <label htmlFor="display_name">Change your display name: </label>
      <br />
      <input
        type="text"
        id="display_name"
        name="displayName"
        value={displayName}
        onChange={handleChangeDisplayName}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default Admin;
