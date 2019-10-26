module.exports = function(app) {

  const admin = require('firebase-admin');

  app.get('/search/class', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    res.render('search_class', {
      title: 'Search Class - LightUpTheProject'
    })
  });

  app.post('/search/class', function (req, res) {
    var db = admin.firestore();
    db.collection('users').where('u_class','==',req.body.u_class).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          res.render('search_class', {
            title: 'Search - LightUpTheProject',
            showSearchError: true,
            ErrMessage: 'Error: Not found any users in class ' + req.body.u_class + '.'
          })
        }
        var listofuserinclass = [];
        snapshot.forEach(doc => {
          listofuserinclass.push(doc.data())
        });
        res.render('search_class',{
          title: 'Search Class - LightUpTheProject',
          showSearchResult: true,
          u_class: req.body.u_class,
          users: listofuserinclass,
        })
        return null;
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  });

};
