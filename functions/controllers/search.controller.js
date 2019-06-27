module.exports = function(app) {

  const admin = require('firebase-admin');

  app.get('/search', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    res.render('search', {
      'title' : 'Search - LightUpTheProject'
    })
  });

  app.post('/search', function (req, res) {
    var db = admin.firestore();
    db.collection('users').doc(req.body.userid).get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No matching documents.');
          res.send('No matching doc.');
          return;
        } else {
          res.render('search', {
            title : 'Search - LightUpTheProject',
            showSearchResult: true,
            userid: doc.data().userid,
            u_firstname: doc.data().u_firstname,
            u_lastname: doc.data().u_lastname,
            u_class: doc.data().u_class,
            u_roll: doc.data().u_roll
          })
        }
        return null;
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  });

};
