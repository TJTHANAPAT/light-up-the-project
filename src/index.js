import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import firebase from 'firebase/app';
import 'firebase/firestore'; // delete this line when deploy to production
import firebaseConfig from './firebase/firebaseConfig';
firebase.initializeApp(firebaseConfig);

// delete these when deploy to production
const db = firebase.firestore();
if (window.location.hostname === 'localhost') {
  db.useEmulator('localhost', 8080);
}

ReactDOM.render(
  <App />
  ,document.getElementById('root')
);
