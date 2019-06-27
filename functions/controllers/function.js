/*
var AddUserRound4Ref = boothsRef.doc(ListUserBoothSorted[3])
if (ListUserBoothSorted[3] === B1boothid) {
  let newround4 = getBoothRound4(docB1)
  newround4 += 1;
  AddUserRound4Ref.update({round4: newround4});
  AddUserRound4Ref.collection('round4').doc(userid).set({
    userid:userid,
    u_firstname:u_firstname,
    u_lastname:u_lastname,
    u_class:u_class,
    u_roll:u_roll
  });
} else if (ListUserBoothSorted[3] === B2boothid) {
  let newround4 = getBoothRound4(docB2)
  newround4 += 1;
  AddUserRound4Ref.update({round4: newround4});
  AddUserRound4Ref.collection('round4').doc(userid).set({
    userid:userid,
    u_firstname:u_firstname,
    u_lastname:u_lastname,
    u_class:u_class,
    u_roll:u_roll
  });
} else if (ListUserBoothSorted[3] === B3boothid) {
  let newround4 = getBoothRound4(docB3)
  newround4 += 1;
  AddUserRound4Ref.update({round4: newround4});
  AddUserRound4Ref.collection('round4').doc(userid).set({
    userid:userid,
    u_firstname:u_firstname,
    u_lastname:u_lastname,
    u_class:u_class,
    u_roll:u_roll
  });
} else if (ListUserBoothSorted[3] === B4boothid) {
  let newround4 = getBoothRound4(docB4)
  newround4 += 1;
  AddUserRound4Ref.update({round4: newround4});
  AddUserRound4Ref.collection('round4').doc(userid).set({
    userid:userid,
    u_firstname:u_firstname,
    u_lastname:u_lastname,
    u_class:u_class,
    u_roll:u_roll
  });
}



// Add User to Round1
var AddUserRound1Ref = boothsRef.doc(ListUserBoothSorted[0]);
db.runTransaction(t => {
  return t.get(AddUserRound1Ref)
    .then(doc => {
      var NewRoundVal1 = parseInt(doc.data().round1) + 1;
      t.update(AddUserRound1Ref, {round1: NewRoundVal1});
      var NewBoothTotal1 = parseInt(doc.data().boothtotal) + 1;
      t.update(AddUserRound1Ref, {boothtotal: NewBoothTotal1});
      return null;
    })
    .catch(err => {
      console.log('Error: ', err);
    });
}).then(result => {
  console.log('Adding User to Round1 of ', ListUserBoothSorted[0]);
  AddUserRound1Ref.collection('round1').doc(userid).set({
    userid:userid,
    u_firstname:u_firstname,
    u_lastname:u_lastname,
    u_class:u_class,
    u_roll:u_roll
  });

  // Add User to Round2
  var AddUserRound2Ref = boothsRef.doc(ListUserBoothSorted[1]);
  db.runTransaction(t => {
    return t.get(AddUserRound2Ref)
      .then(doc => {
        var NewRoundVal2 = parseInt(doc.data().round2) + 1;
        t.update(AddUserRound2Ref, {round2: NewRoundVal2});
        var NewBoothTotal2 = parseInt(doc.data().boothtotal) + 1;
        t.update(AddUserRound2Ref, {boothtotal: NewBoothTotal2});
        return null;
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }).then(result => {
    console.log('Adding User to Round2 of ', ListUserBoothSorted[1]);
    AddUserRound2Ref.collection('round2').doc(userid).set({
      userid:userid,
      u_firstname:u_firstname,
      u_lastname:u_lastname,
      u_class:u_class,
      u_roll:u_roll
    });

    // Add User to Round3
    var AddUserRound3Ref = boothsRef.doc(ListUserBoothSorted[2]);
    db.runTransaction(t => {
      return t.get(AddUserRound3Ref)
        .then(doc => {
          var NewRoundVal3 = parseInt(doc.data().round1) + 1;
          t.update(AddUserRound3Ref, {round3: NewRoundVal3});
          var NewBoothTotal3 = parseInt(doc.data().boothtotal) + 1;
          t.update(AddUserRound3Ref, {boothtotal: NewBoothTotal3});
          return null;
        })
        .catch(err => {
          console.log('Error: ', err);
        });
    }).then(result => {
      console.log('Adding User to Round1 of ', ListUserBoothSorted[2]);
      AddUserRound3Ref.collection('round3').doc(userid).set({
        userid:userid,
        u_firstname:u_firstname,
        u_lastname:u_lastname,
        u_class:u_class,
        u_roll:u_roll
      });

      // Add User to Round4
      var AddUserRound4Ref = boothsRef.doc(ListUserBoothSorted[3]);
      db.runTransaction(t => {
        return t.get(AddUserRound4Ref)
          .then(doc => {
            var NewRoundVal4 = parseInt(doc.data().round4) + 1;
            t.update(AddUserRound4Ref, {round4: NewRoundVal4});
            var NewBoothTotal4 = parseInt(doc.data().boothtotal) + 1;
            t.update(AddUserRound4Ref, {boothtotal: NewBoothTotal4});
            return null;
          })
          .catch(err => {
            console.log('Error: ', err);
          });
      }).then(result => {
        console.log('Adding User to Round4 of ', ListUserBoothSorted[3]);
        AddUserRound4Ref.collection('round4').doc(userid).set({
          userid:userid,
          u_firstname:u_firstname,
          u_lastname:u_lastname,
          u_class:u_class,
          u_roll:u_roll
        });

        res.render('regis-dev',{
          title: 'Register',
          isRegisSuccess: true,
          userid:userid,
          u_firstname:u_firstname,
          u_lastname:u_lastname,
          u_class:u_class,
          u_roll:u_roll,
          round1: ListUserBoothSorted[0],
          round2: ListUserBoothSorted[1],
          round3: ListUserBoothSorted[2],
          round4: ListUserBoothSorted[3],
        })

        return null;
      }).catch(err => {
        console.log('Error: ', err)
      });

      return null;
    }).catch(err => {
      console.log('Error: ', err)
    });

    return null;
  }).catch(err => {
    console.log('Error: ', err)
  });

  return null;
}).catch(err => {
  console.log('Error: ', err)
});*/
