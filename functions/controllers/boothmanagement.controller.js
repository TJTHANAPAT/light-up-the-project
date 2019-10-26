module.exports = function(app) {

  const admin = require('firebase-admin');

  app.get('/admin/boothmanage', function (req,res) {
    var db = admin.firestore();
    var boothsRef = db.collection('booths').where('booth','==',true);
    boothsRef.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          res.render('error',{
            title:'Error - LightUpTheProject',
            ErrMessage: 'Error: No booth is found in database. To Add new booth, visit /admin/boothmanage/addnew'
          });
          return;
        }
        var listofboothdetail = [];
        snapshot.forEach(doc => {
          listofboothdetail.push(doc.data())
        });
        res.render('boothmanage-index',{
          'title' : 'Booth Management - LightUpTheProject',
          'booths': listofboothdetail,
        })
        return null;
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  });

  app.get('/admin/boothmanage/addnew', function (req,res) {
    res.render('boothmanage-addnew',{
      'title' : 'Booth Management - LightUpTheProject',
      addNewBooth: true
    })
  });

  app.post('/admin/boothmanage/addnew', function (req,res) {
    var db = admin.firestore();
    var boothsRef = db.collection('booths');
    boothsRef.doc(req.body.boothid).get()
      .then(doc => {
        if (doc.exists) {
          console.log(req.body.boothid + ' already exists!')
          res.render('error',{
            title:'Error - LightUpTheProject',
            ErrMessage: 'Error: ' + req.body.boothid + ' already exists!',
            showBackButton: true
          });
          return;
        }
        boothsRef.doc(req.body.boothid).set({
          boothid:req.body.boothid,
          boothname:req.body.boothname,
          boothdescription:req.body.boothdescription,
          booth: true,
          round1:0,
          round2:0,
          round3:0,
          round4:0,
          boothtotal:0
        })
          .then(ref => {
            res.render('boothmanage-addnew',{
              title : 'Booth Management - LightUpTheProject',
              boothname : req.body.boothname,
              addNewBoothComplete: true
            });
            return null;
          })
          .catch(err => {
              console.log('Error ', err);
          });
        return null;
      })
      .catch(err => {
        console.log('Error ', err);
      });
  });
};
