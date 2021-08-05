import firebase from 'firebase/app';
import 'firebase/firestore';

export const getSystemConfig = () => {
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
};

export const getAllYears = () => {
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
};

export const getBoothGroups = yearId => {
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
