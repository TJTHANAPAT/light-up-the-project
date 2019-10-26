module.exports = function(app) {

  const admin = require('firebase-admin');

  app.get('/search/user', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    res.render('search_user', {
      'title' : 'Search - LightUpTheProject'
    })
  });

  app.post('/search/user', function (req, res) {
    var db = admin.firestore();
    db.collection('users').doc(req.body.userid).get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No matching documents.');
          res.render('search_user', {
            title: 'Search - LightUpTheProject',
            showSearchError: true,
            ErrMessage: 'Error: ไม่พบ UserID: ' + req.body.userid + ' ที่คุณกรอกในฐานข้อมูล'
          })
          return;
        } else {
          res.render('search_user', {
            title : 'Search - LightUpTheProject',
            showSearchResult: true,
            userid: doc.data().userid,
            u_firstname: doc.data().u_firstname,
            u_lastname: doc.data().u_lastname,
            u_class: doc.data().u_class,
            u_roll: doc.data().u_roll,
            u_round1: doc.data().u_round1,
            u_round2: doc.data().u_round2,
            u_round3: doc.data().u_round3,
            u_round4: doc.data().u_round4
          })
        }
        return null;
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  });

};
