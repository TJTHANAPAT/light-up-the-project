module.exports = function(app) {

  const admin = require('firebase-admin');

  app.get('/regis', function (req, res) {
    var db = admin.firestore();
    var boothsRef = db.collection('booths').where('booth','==',true)
    db.collection('config').doc('isRegisAvailable').get()
      .then(doc1 => {
        if (!doc1.exists) {
          db.collection('config').doc('isRegisAvailable').set({isRegisAvailable:true});
          var settrue = true
          return;
        }
        if(doc1.data().isRegisAvailable || settrue){

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
              res.render('register',{
                title: 'Register - LightUptheProject',
                isRegis: true,
                booths: listofboothdetail
              })
              return null;
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          console.log('Register is not available.');
          res.render('error',{
            title:'Error - LightUpTheProject',
            ErrMessage: 'Register is currently unavailable. Contact admin for more information.'
          });
        }
        return null;
      })
      .catch(err => {
        console.log(err)
      })

  });



};
