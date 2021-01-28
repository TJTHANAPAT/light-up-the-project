import React, { useState, useEffect, useContext } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { adminStore, AdminProvider } from './store';

function checkAuthState() {
  const auth = firebase.auth();
  return new Promise(resolve => {
    auth.onAuthStateChanged(user => {
      resolve(user);
    });
  });
}

const Admin = () => {
  return (
    <AdminProvider>
      <Main />
    </AdminProvider>
  );
};

const Main = () => {
  const adminState = useContext(adminStore);
  const [isLoading, setIsLoading] = useState(true);
  const auth = firebase.auth();
  const { dispatch } = adminState;
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log('CurrentUser:', user);
      dispatch({ type: 'setUser', user: user });
      setIsLoading(false);
    });
  }, []);

  const user = adminState.state.user;

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (!!user) {
    return (
      <div>
        <p>Signed in as {user.displayName} ({user.email})</p>
        <SignOutBtn />
      </div>
    );
  } else {
    return (
      <div>
        <p>Please sign in</p>
        <SignInForm />
        <br />
        <p>or create a new accout</p>
        <SignUpForm />
      </div>
    );
  }
};

const SignOutBtn = () => {
  const adminState = useContext(adminStore);
  const { dispatch } = adminState;
  const signOut = () => {
    const auth = firebase.auth();
    auth
      .signOut()
      .then(() => {
        console.log('Signed out.');
        dispatch({ type: 'setUser', user: null });
      })
      .catch(err => {
        console.error(err.message);
      });
  };
  return <button onClick={signOut}>Sign out</button>;
};

function signInWithEmailAndPassword(email, password) {
  return new Promise((resolve, reject) => {
    const auth = firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log('Signed in.');
        resolve(response.user);
      })
      .catch(err => {
        reject(err.message);
      });
  });
}

const SignInForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const handleChangeInput = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const adminState = useContext(adminStore);
  const signIn = event => {
    event.preventDefault();
    const { email, password } = formState;
    const { dispatch } = adminState;
    signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: 'setUser', user: user });
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

function createNewUser(email, password, displayName) {
  return new Promise((resolve, reject) => {
    const auth = firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        user.updateProfile({ displayName: displayName }).then(() => {
          console.log('Create user suscessfully!');
          resolve(user);
        });
      })
      .catch(err => {
        reject(err);
      });
  });
}

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
  const adminState = useContext(adminStore);
  const signUp = event => {
    event.preventDefault();
    const { dispatch } = adminState;
    const { email, password, name_first, name_last } = formState;
    const displayName = `${name_first} ${name_last}`;
    createNewUser(email, password, displayName)
      .then(user => {
        dispatch({ type: 'setUser', user: user });
      })
      .catch(err => {
        console.error(err);
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

export default Admin;
