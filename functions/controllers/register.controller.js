module.exports = function(app) {

  const admin = require('firebase-admin');

  app.get('/regis', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    res.render('regis-step1', {
      title : 'Register'
    })
  });

  app.post('/regis/step2', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    var db = admin.firestore();

    u_class = req.body.u_class
    u_roll = req.body.u_roll
    if ((u_roll > 45 || u_roll < 1 ) || (u_class > 13 || u_class < 1)) {
      res.send('Your class or roll is incorrect!')
      console.log('Error')
      return;
    }

    if (u_class < 10) {
      var zero = '0'
      var u_class = zero.concat(u_class.toString())
    } else {
      var u_class = u_class.toString()
    }
    if (u_roll < 10) {
      var zero = '0'
      var u_roll = zero.concat(u_roll.toString())
    } else {
      var u_roll = u_roll.toString()
    }
    var year = '18'
    generateduserid = year.concat(u_class,u_roll)
    console.log('AutoUserID: ', generateduserid)

    var usersRef = db.collection('users').doc(generateduserid)
    usersRef.get()
      .then(doc =>{
        if (doc.exists) {
          res.render('regis-step2',{
            title : 'Register',
            userid : generateduserid,
            u_class : req.body.u_class,
            u_roll : req.body.u_roll,
            isUserIDValid : false
          })
          return;
        }
        var boothsRef = db.collection('booths').where('booth','==',true)
        boothsRef.get()
          .then(snapshot => {
            if (snapshot.empty) {
              res.send('There is some error')
              return;
            }
            var listofboothdetail = [];
            snapshot.forEach(doc => {
              listofboothdetail.push(doc.data())
            });
            res.render('regis-step2',{
              title : 'Register',
              userid : generateduserid,
              u_class : req.body.u_class,
              u_roll : req.body.u_roll,
              isUserIDValid : true,
              booths : listofboothdetail
            })
          })

      });
  });

  app.post('/regis/step3', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    var db = admin.firestore();
    //Create new user document to users collection
    db.collection('users').doc(req.body.userid).set({
      userid:req.body.userid,
      u_firstname:req.body.u_firstname,
      u_lastname:req.body.u_lastname,
      u_class:req.body.u_class,
      u_roll:req.body.u_roll,
    }).then(ref => {
      //Create new user document to userselection collection
      db.collection('userselection').doc(req.body.userid).set({
        userid:req.body.userid,
        selection:req.body.selection
      }).then(ref =>{
        db.collection('userselection').doc(req.body.userid).get()
          .then(doc => {
            var selection = doc.data().selection
            console.log(selection);
          })
        res.render('regis-step3',{
          title : 'Register',
          userid : req.body.userid,
          u_firstname : req.body.u_firstname,
          u_lastname : req.body.u_lastname,
          u_class : req.body.u_class,
          u_roll : req.body.u_roll,
          isRegistrationComplete : true
        })
      })
    })
  });


  app.get('/regis/test', function (req, res) {
    res.send('Testing')

    var db = admin.firestore();
    var userid = '180203'

    db.collection('userselection').doc(userid).get()
      .then(doc1 => {
        var selection = doc1.data().selection
        console.log(selection)
        db.collection('booths').doc('boothlist').get()
          .then(doc2 => {
            var userid = doc1.data().userid
            var boothlist = doc2.data().list
            var boothlistlength = boothlist.length
            var roundcal = []
            for(i=0;i<4;i++) {
              console.log('I: It is ' + i + '.')
              console.log('now it is '+ selection[i])
              for(j=0;j<boothlistlength;j++){
                console.log('Booth name: ' + boothlist[j])
                if (selection[i]==boothlist[j]) {
                  console.log('Matching')
                  db.collection('booths').doc(boothlist[j]).get()
                    .then(doc3 => {
                      var boothround = []
                      boothround.push(doc3.data().round1,doc3.data().round2,doc3.data().round3,doc3.data().round4)
                      var max = Math.max(...boothround)
                    })
                  //db.collection('booths').doc(boothlist[j]).collection('round').add({
                  //  userid: userid
                  //}).then(ref2 => {
                  //  console.log('Matching!! Adding ' + userid + ' to ' + boothlist[j])
                  //})
                  break;
                }
              }
            }
          })
      })

  });



};
