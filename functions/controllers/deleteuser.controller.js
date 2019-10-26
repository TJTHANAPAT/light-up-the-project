module.exports = function(app) {

  const admin = require('firebase-admin');

  app.get('/admin/user', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    res.render('admin_user', {
      'title' : 'Search - LightUpTheProject'
    })
  });

  app.post('/admin/user', function (req, res) {
    var db = admin.firestore();
    db.collection('users').doc(req.body.userid).get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No matching documents.');
          res.render('admin_user', {
            title: 'Admin - LightUpTheProject',
            showSearchError: true,
            ErrMessage: 'Error: ไม่พบ UserID: ' + req.body.userid + ' ที่คุณกรอกในฐานข้อมูล'
          })
          return;
        } else {
          res.render('admin_user', {
            title : 'Admin - LightUpTheProject',
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

  app.post('/admin/deleteuser', function (req, res) {
    var db = admin.firestore();
    var boothsRef = db.collection('booths');
    var usersRef = db.collection('users');
    var userid = req.body.userid;
    usersRef.doc(userid).get()
      .then(docUser => {
        let u_round1 = docUser.data().u_round1;
        let u_round2 = docUser.data().u_round1;
        let u_round3 = docUser.data().u_round1;
        let u_round4 = docUser.data().u_round1;
        console.log(userid)
        console.log(u_round1 +' ' +u_round2+' ' +u_round3+' ' +u_round4)
        boothsRef.doc(u_round1).get()
          .then(docR1 => {
            let newround1 = parseInt(docR1.data().round1);
            newround1 = newround1 - 1;
            boothsRef.doc(u_round1).update({round1: newround1});
            let newboothtotal1 = parseInt(docR1.data().boothtotal);
            newboothtotal1 = newboothtotal1 - 1;
            boothsRef.doc(u_round1).update({boothtotal: newboothtotal1});
            boothsRef.doc(u_round1).collection('round1').doc(userid).delete();
            return null;
          })
          .catch(err => {
            console.log(err);
          })
        boothsRef.doc(u_round2).get()
          .then(docR2 => {
            let newround2 = parseInt(docR2.data().round2);
            newround2 = newround2 - 1;
            boothsRef.doc(u_round2).update({round2: newround2});
            let newboothtotal2 = parseInt(docR2.data().boothtotal);
            newboothtotal2 = newboothtotal2 - 1;
            boothsRef.doc(u_round2).update({boothtotal: newboothtotal2});
            boothsRef.doc(u_round2).collection('round2').doc(userid).delete();
            return null;
          })
          .catch(err => {
            console.log(err);
          })
        boothsRef.doc(u_round3).get()
          .then(docR3 => {
            let newround3 = parseInt(docR3.data().round3);
            newround3 = newround3 - 1;
            boothsRef.doc(u_round3).update({round3: newround3});
            let newboothtotal3 = parseInt(docR3.data().boothtotal);
            newboothtotal3 = newboothtotal3 - 1;
            boothsRef.doc(u_round3).update({boothtotal: newboothtotal3});
            boothsRef.doc(u_round3).collection('round3').doc(userid).delete();
            return null;
          })
          .catch(err => {
            console.log(err);
          })
        boothsRef.doc(u_round4).get()
          .then(docR4 => {
            let newround4 = parseInt(docR4.data().round4);
            newround4 = newround4 - 1;
            boothsRef.doc(u_round4).update({round4: newround4});
            let newboothtotal4 = parseInt(docR4.data().boothtotal);
            newboothtotal4 = newboothtotal4 - 1;
            boothsRef.doc(u_round4).update({boothtotal: newboothtotal4});
            boothsRef.doc(u_round4).collection('round4').doc(userid).delete();
            return null;
          })
          .catch(err => {
            console.log(err);
          })

        usersRef.doc(userid).delete();
        res.render('admin_user',{
          title: 'Admin - LightUpTheProject',
          deleteUser: true,
          AlertMessage: 'UserID ' + req.body.userid + ' has been removed successfully'
        })
        return null;
      })
      .catch(err => {
        console.log(err);
      })
  });

};
