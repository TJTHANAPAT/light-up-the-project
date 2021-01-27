import React, { useState, useEffect, useContext } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { adminStore, AdminProvider } from './store';

function checkAuthState() {
  const auth = firebase.auth();
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      resolve(user);
    });
  });
}

function signInWithEmailAndPassword(email, password) {
  return new Promise((resolve, reject) => {
    const auth = firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('Signed in.');
        resolve(response.user);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}

function createNewAdmin(email, password, displayName) {
  return new Promise((resolve, reject) => {
    const auth = firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.updateProfile({ displayName: displayName }).then(() => {
          console.log('Create user suscessfully!');
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Fetching configs.
 */
function fetchData() {
  const db = firebase.firestore();
  const ref = db.collection('config');
  return new Promise((resolve, reject) => {
    ref
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        resolve(arr);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
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
    auth.onAuthStateChanged((user) => {
      console.log('CurrentUser:', user);
      dispatch({ type: 'setUser', user: user });
      setIsLoading(false)
    });
  }, []);

  const user = adminState.state.user;

  if (isLoading){
    return <p>Loading...</p>
  } else if (!!user) {
    return (
      <div>
        <p>Signed in as {user.email}</p>
        <SignOutBtn />
      </div>
    );
  } else {
    return (
      <div>
        <p>Please sign in.</p>
        <SignInForm />
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
      .catch((err) => {
        console.error(err.message);
      });
  };
  return <button onClick={signOut}>Sign out</button>;
};

const SignInForm = () => {
  const [loginState, setLoginState] = useState({ email: '', password: '' });
  const handleChangeInput = (event) => {
    setLoginState({ ...loginState, [event.target.id]: event.target.value });
  };

  const adminState = useContext(adminStore);
  const signIn = (event) => {
    event.preventDefault();
    const { email, password } = loginState;
    const { dispatch } = adminState;
    signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({ type: 'setUser', user: user });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={signIn}>
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        id="email"
        placeholder="example@mail.com"
        value={loginState.email}
        onChange={handleChangeInput}
        required
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        placeholder="password"
        value={loginState.password}
        onChange={handleChangeInput}
        required
      />
      <button type="submit">Sign in</button>
    </form>
  );
};

export default Admin;

// function Admin2() {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [displayName, setDisplayName] = useState();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     console.log(email, password, displayName);
//     createNewAdmin(email, password, displayName);
//   };

//   useEffect(async () => {
//     const currentUser = await checkAuthState();
//     console.log(user);
//     if (!!user) {
//       setDisplayName(displayName);
//     }
//     setUser(currentUser);
//   });
//   const EditProfilePanel = () => {
//     if (!!user) {
//       return (
//         <form>
//           <input
//             type="text"
//             id="displayName"
//             value={displayName}
//             onChange={(event) => {
//               console.log(`displayName: ${event.target.value}`);
//             }}
//           />
//         </form>
//       );
//     }
//   };
//   return (
//     <div className="container-fluid">
//       <h1>Admin</h1>
//       <hr />
//       <p>{!!user ? `Signed in with email ${user.email}` : 'Not signed in.'}</p>
//       {EditProfilePanel()}
//       <h2>Sign Up for Admin</h2>
//       <form>
//         <div className="mb-3">
//           <label htmlFor="inputDisplayName" className="form-label">
//             Display Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="inputDisplayName"
//             onChange={(e) => {
//               setDisplayName(e.target.value);
//             }}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="inputEmail" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="inputEmail"
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="inputPassword" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="inputPassword"
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary"
//           onClick={handleSignup}
//         >
//           Sign up
//         </button>
//       </form>
//     </div>
//   );
// }
