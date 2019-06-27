module.exports = function(app) {

  const admin = require('firebase-admin');

  app.get('/dev/regis', function (req, res) {
    var db = admin.firestore();
    var boothsRef = db.collection('booths').where('booth','==',true)
    boothsRef.get()
      .then(snapshot => {
        if (snapshot.empty) {
          res.send('Error: No booth to select')
          return;
        }
        var listofboothdetail = [];
        snapshot.forEach(doc => {
          listofboothdetail.push(doc.data())
        });
        res.render('dev-regis',{
          title: 'Register',
          isRegis: true,
          booths: listofboothdetail
        })
        return null;
      })
      .catch(err => {
        console.log(err);
      })
  });



};
