module.exports = function(app) {
  app.get('/regis', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    res.render('regis', {
      'title' : 'Register'
    })
  });

  app.post('/regis/step2', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    var db = admin.firestore();
    var usersRef = db.collection('users').doc(req.body.userid)
    usersRef.get()
      .then((docSnapshot)=>{
        if (docSnapshot.exists) {
          res.render('regis-step2',{
            'title' : 'Register',
            'userid' : req.body.userid,
            'u_class' : req.body.u_class,
            'u_roll' : req.body.u_roll,
            isUserIDValid : false
          })
        } else {
          res.render('regis-step2',{
            'title' : 'Register',
            'userid' : req.body.userid,
            'u_class' : req.body.u_class,
            'u_roll' : req.body.u_roll,
            isUserIDValid : true
          })
        }
      });
  });

  app.post('/regis/step3-2', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    var db = admin.firestore();
    db.collection('users').doc(req.body.userid).set({
      userid:req.body.userid,
      u_firstname:req.body.u_firstname,
      u_lastname:req.body.u_lastname,
      u_class:req.body.u_class,
      u_roll:req.body.u_roll,
    }).then(ref => {

      res.render('regis-step3',{
        'title' : 'Register',
        'userid' : req.body.userid,
        'u_firstname' : req.body.u_firstname,
        'u_lastname' : req.body.u_lastname,
        'u_class' : req.body.u_class,
        'u_roll' : req.body.u_roll,
        isRegistrationComplete : true
      })
    })
  });

  app.post('/regis/step3', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    var db = admin.firestore();
    db.collection('users').doc(req.body.userid).set({
      userid:req.body.userid,
      u_firstname:req.body.u_firstname,
      u_lastname:req.body.u_lastname,
      u_class:req.body.u_class,
      u_roll:req.body.u_roll,
    }).then(ref => {
      db.collection('userselection').doc(req.body.userid).set({
        userid:req.body.userid,
        selection:req.body.selection
      }).then(ref =>{
        res.render('regis-step3',{
          'title' : 'Register',
          'userid' : req.body.userid,
          'u_firstname' : req.body.u_firstname,
          'u_lastname' : req.body.u_lastname,
          'u_class' : req.body.u_class,
          'u_roll' : req.body.u_roll,
          isRegistrationComplete : true
        })
      })
    })
  });

};
