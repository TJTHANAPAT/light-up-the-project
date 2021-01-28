import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  const { Provider } = authContext;
  return <Provider value={auth}>{children}</Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isConnecting, setConnecting] = useState(true);
  const firebaseAuth = firebase.auth();

  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          setUser(response.user);
          resolve(response.user);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  };

  const signOut = () => {
    return new Promise((resolve, reject) => {
      firebaseAuth
        .signOut()
        .then(() => {
          setUser(null);
          resolve();
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  };

  const signUp = (email, password, displayName) => {
    return new Promise((resolve, reject) => {
      firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          let user = userCredential.user;
          user
            .updateProfile({ displayName })
            .then(() => {
              setUser(user);
              resolve(user);
            })
            .catch(err => {
              console.error(err);
              reject(err);
            });
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  };

  const updateUserProfile = (profile = { displayName: '' }) => {
    return new Promise((resolve, reject) => {
      user
        .updateProfile(profile)
        .then(() => {
          setUser({ ...user, ...profile });
          resolve(user);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setConnecting(false);
    });
    return () => unsubscribe();
  }, []);

  return {
    isConnecting,
    user,
    signIn,
    signOut,
    signUp,
    updateUserProfile,
  };
}
