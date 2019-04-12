// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'jade')
app.set('views','./views');

app.get('/', function (req, res) {
  res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
  res.render('comingsoon', {})
});

//app.get('/', function (req, res) {
//  res.render('index', {
//    Title: 'Hey',
//    H1: 'Hello there!',
//    H2:'DEMO VERSION' })
//})

app.get('/timestamp', (request, response) => {
  response.send(`${Date.now()}`);
});

app.get('/timestamp-cached', (request, response) => {
  response.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
  response.send(`${Date.now()}`);
});

exports.app = functions.https.onRequest(app);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref.toString());
  });
});
