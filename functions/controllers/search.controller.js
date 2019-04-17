module.exports = function(app) {
  
  app.get('/search', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    res.render('search', {
      'title' : 'Search'
    })
  });

  app.post('/search', function (req, res) {
    var db = admin.firestore();
    var usersRef = db.collection('users');
    var query = usersRef.where('userid', '==', req.body.userid).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          res.send('No matching doc.');
          return;
        }
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          console.log(doc.data().u_firstname);
          res.render('search', {
            'title' : 'Seatch',
            'showSearchResult' : true,
            'userid' : doc.data().userid,
            'u_firstname' : doc.data().u_firstname,
            'u_lastname' : doc.data().u_lastname,
            'u_class' : doc.data().u_class,
            'u_roll' : doc.data().u_roll
          })
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  });

};
