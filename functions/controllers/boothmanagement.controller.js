module.exports = function(app) {

  const admin = require('firebase-admin');

  app.get('/boothmanage', function (req,res) {
    var db = admin.firestore();
    var boothsRef = db.collection('booths').where('booth','==',true);
    boothsRef.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          res.send('No matching documents.')
          return;
        }
        var listofboothdetail = [];
        snapshot.forEach(doc => {
          listofboothdetail.push(doc.data())
        });
        res.render('boothmanage-index',{
          'title' : 'Booth Management',
          'booths': listofboothdetail,
        })
        return null;
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  });

  app.get('/boothmanage/addnew', function (req,res) {
    res.render('boothmanage-addnew',{
      'title' : 'Add New Booth',
      addNewBooth: true
    })
  });

  app.post('/boothmanage/addnew', function (req,res) {
    var db = admin.firestore();
    var boothsRef = db.collection('booths');
    boothsRef.doc(req.body.boothid).get()
      .then(doc => {
        if (doc.exists) {
          console.log(req.body.boothid + ' alreay exists!')
          res.send('This ID already exists.')
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
            boothsRef.doc('boothlist').get()
              .then(boothlist => {
                list = boothlist.data().list
                list.push(req.body.boothid)
                boothsRef.doc('boothlist').set({list:list},{merge: true})
                  .then(ref => {
                    res.render('boothmanage-addnew',{
                      title : 'Add New Booth',
                      boothname : req.body.boothname,
                      addNewBoothComplete: true
                    })
                    return null;
                  })
                  .catch(err => {
                    console.log('Error getting documents', err);
                  });
                return null;
              })
              .catch(err => {
                console.log('Error getting documents', err);
              });
            return null;
          })
          .catch(err => {
              console.log('Error getting documents', err);
          });
        return null;
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  });
};
