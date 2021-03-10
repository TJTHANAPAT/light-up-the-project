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
  const [boothGroupsStore, setBoothGroupsStore] = useState({});

  const getYearConfig = yearId => {
    console.log('Call getYearConfig');
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
      console.log(boothGroupsStore);
      if (boothGroupsStore[yearId] !== undefined) {
        console.log('Get from state');
        resolve(boothGroupsStore[yearId]);
      } else {
        db.collection(`years/${yearId}/boothGroups`)
          .get()
          .then(querySnapshot => {
            let queryBoothGroups = [];
            querySnapshot.forEach(doc => {
              queryBoothGroups.push(doc.data());
            });
            console.log('Get from Firestore');
            boothGroupsStore[yearId] = queryBoothGroups;
            setBoothGroupsStore({ ...boothGroupsStore });
            resolve(boothGroupsStore[yearId]);
          })
          .catch(err => {
            reject(err);
          });
      }
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

  function boothGroup(yearId) {
    const db = firebase.firestore();

    const add = boothGroup => {
      const boothGroupRef = db
        .collection(`years/${yearId}/boothGroups`)
        .doc(boothGroup.groupId);
      return new Promise((resolve, reject) => {
        boothGroupRef
          .get()
          .then(doc => {
            if (doc.exists) {
              const err = new Error(
                `Cannot add booth group with ID ${boothGroup.groupId}. This ID is already taken by another booth group.`
              );
              console.error(err);
              reject(err);
            } else {
              boothGroupRef
                .set(boothGroup)
                .then(() => {
                  boothGroupsStore[yearId] = [
                    ...boothGroupsStore[yearId],
                    boothGroup,
                  ];
                  setBoothGroupsStore({ ...boothGroupsStore });
                  console.log('Added new booth group successfully.');
                  resolve();
                })
                .catch(err => {
                  console.error(err);
                });
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    };

    const remove = groupId => {
      const boothGroupRef = db
        .collection(`years/${yearId}/boothGroups`)
        .doc(groupId);
      return new Promise((resolve, reject) => {
        boothGroupRef
          .delete()
          .then(() => {
            const boothGroups = boothGroupsStore[yearId];
            for (let i = 0; i < boothGroups.length; i++) {
              const boothGroup = boothGroups[i];
              if (boothGroup.groupId === groupId) {
                boothGroups.splice(i, 1);
                break;
              }
            }
            boothGroupsStore[yearId] = boothGroups;
            setBoothGroupsStore({ ...boothGroupsStore });
            console.log('Deleted booth group successfully.');
            resolve();
          })
          .catch(err => {
            console.error(err);
            reject(err);
          });
      });
    };

    const update = boothGroup => {
      const boothGroupRef = db
        .collection(`years/${yearId}/boothGroups`)
        .doc(boothGroup.groupId);
      return new Promise((resolve, reject) => {
        boothGroupRef
          .get()
          .then(doc => {
            if (doc.exists) {
              const updateBoothGroupData = {
                groupName: boothGroup.groupName,
                groupDescription: boothGroup.groupDescription,
              };
              boothGroupRef
                .update(updateBoothGroupData)
                .then(() => {
                  const boothGroups = boothGroupsStore[yearId];
                  for (let i = 0; i < boothGroups.length; i++) {
                    if (boothGroups[i].groupId === boothGroup.groupId) {
                      boothGroups[i] = boothGroup;
                      break;
                    }
                  }
                  boothGroupsStore[yearId] = boothGroups;
                  setBoothGroupsStore({ ...boothGroupsStore });
                  console.log('Updated booth group successfully.');
                  resolve();
                })
                .catch(err => {
                  console.error(err);
                });
            } else {
              const err = new Error(
                `Booth group with ID ${boothGroup.groupId} is not existed.`
              );
              console.error(err);
              reject(err);
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    };

    return { add, remove, update };
  }

  return {
    currentYear,
    yearConfigs,
    isLoading,
    getYearConfig,
    getBoothGroups,
    boothGroup,
    boothGroupsStore
  };
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
