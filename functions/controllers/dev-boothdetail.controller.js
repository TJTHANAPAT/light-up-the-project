module.exports = function(app) {

  const admin = require('firebase-admin');

  app.get('/dev/boothdetail', function (req, res) {
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
        res.render('dev-boothdetail',{
          title: 'Booth Details',
          booths: listofboothdetail
        })
        return null;
      })
      .catch(err => {
        console.log(err);
      })
  });

  app.post('/dev/boothdetail', function (req, res) {
    var db = admin.firestore();
    var boothsRef = db.collection('booths');

    boothsRef.where('booth','==',true).get()
      .then(snapshot => {
        if (snapshot.empty) {
          res.send('Error: No booth to select')
          return;
        }
        var listofboothdetail = [];
        snapshot.forEach(doc => {
          listofboothdetail.push(doc.data())
        });
        boothsRef.doc(req.body.selectedbooth).collection('round1').get()
          .then(snapshotR1 => {
            var BoothRound1 = [];
            snapshotR1.forEach(docR1 => {
              BoothRound1.push(docR1.data())
            });
            boothsRef.doc(req.body.selectedbooth).collection('round2').get()
              .then(snapshotR2 => {
                var BoothRound2 = [];
                snapshotR2.forEach(docR2 => {
                  BoothRound2.push(docR2.data())
                });
                boothsRef.doc(req.body.selectedbooth).collection('round3').get()
                  .then(snapshotR3 => {
                    var BoothRound3 = [];
                    snapshotR3.forEach(docR3 => {
                      BoothRound3.push(docR3.data())
                    });
                    boothsRef.doc(req.body.selectedbooth).collection('round4').get()
                      .then(snapshotR4 => {
                        var BoothRound4 = [];
                        snapshotR4.forEach(docR4 => {
                          BoothRound4.push(docR4.data())
                        });
                        boothsRef.doc(req.body.selectedbooth).get()
                          .then(docBooth => {
                            res.render('dev-boothdetail',{
                              title: 'Booth Details',
                              booths: listofboothdetail,
                              queryBoothDetail: true,
                              BoothRound1: BoothRound1,
                              BoothRound2: BoothRound2,
                              BoothRound3: BoothRound3,
                              BoothRound4: BoothRound4,
                              round1val: docBooth.data().round1,
                              round2val: docBooth.data().round2,
                              round3val: docBooth.data().round3,
                              round4val: docBooth.data().round4,
                              boothtotal: docBooth.data().boothtotal
                            });
                            return null;
                          })
                          .catch(err => {
                            console.log(err);
                          })

                        return null;
                      })
                      .catch(err => {
                        console.log(err);
                      })
                    return null;
                  })
                  .catch(err => {
                    console.log(err);
                  })
                return null;
              })
              .catch(err => {
                console.log(err);
              })
            return null;
          })
          .catch(err => {
            console.log(err);
          })
        return null;
      })
      .catch(err => {
        console.log(err);
      })
  });



};
