import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const adminStoreContext = createContext();

export const AdminStoreProvider = ({ children }) => {
  const adminStore = useProvideAdminStore();
  const { Provider } = adminStoreContext;
  return <Provider value={adminStore}>{children}</Provider>;
};

export function useAdminStore() {
  return useContext(adminStoreContext);
}

function useProvideAdminStore() {
  const [currentYear, setCurrentYear] = useState(null);
  const [yearConfigs, setYearConfigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getYearConfig = yearId => {
    let config = null;
    for (let i = 0; i < yearConfigs.length; i++) {
      if (yearConfigs[i].yearId === yearId) {
        config = yearConfigs[i];
        break;
      }
    }
    return config;
  };

  const getBoothGroups = yearId => {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection(`years/${yearId}/boothGroups`)
        .get()
        .then(querySnapshot => {
          let boothGroups = [];
          querySnapshot.forEach(doc => {
            boothGroups.push(doc.data());
          });
          resolve(boothGroups);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  useEffect(() => {
    getSystemConfig()
      .then(config => {
        setCurrentYear(config.currentYear);
        console.log(config);
        getYearConfigs().then(yearConfigs => {
          console.log(yearConfigs);
          setYearConfigs(yearConfigs);
          setIsLoading(false);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return { currentYear, yearConfigs, isLoading, getYearConfig, getBoothGroups };
}

function getSystemConfig() {
  const db = firebase.firestore();
  return new Promise((resolve, reject) => {
    db.collection('system')
      .doc('config')
      .get()
      .then(doc => {
        resolve(doc.data());
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getYearConfigs() {
  const db = firebase.firestore();
  return new Promise((resolve, reject) => {
    db.collection('years')
      .orderBy('yearId', 'desc')
      .get()
      .then(querySnapshot => {
        let yearConfigs = [];
        querySnapshot.forEach(doc => {
          yearConfigs.push(doc.data());
        });
        resolve(yearConfigs);
      })
      .catch(err => {
        reject(err);
      });
  });
}
