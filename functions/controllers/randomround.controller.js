module.exports = function(app) {
  app.post('/dev/randomround', (req,res) => {

    const admin = require('firebase-admin');
    const db = admin.firestore();
    const boothsRef = db.collection('booths');
    const usersRef = db.collection('users');

    function sortNumber(a, b) {
    // Function for sorting number in array correctly
      return a - b;
    }

    function getBoothWeight(doc) {
      let BoothRound = [doc.data().round1, doc.data().round2, doc.data().round3, doc.data().round4];
      let max = Math.max.apply(null, BoothRound);
      let min = Math.min.apply(null, BoothRound);
      return max - min;
    }
    function getBoothRound1(doc) {
      return doc.data().round1;
    }
    function getBoothRound2(doc) {
      return doc.data().round2;
    }
    function getBoothRound3(doc) {
      return doc.data().round3;
    }
    function getBoothRound4(doc) {
      return doc.data().round4;
    }
    function getBoothTotal(doc) {
      return doc.data().boothtotal;
    }

    function getListRoundSorted(doc) {
      let A = doc.data().round1;
      let B = doc.data().round2;
      let C = doc.data().round3;
      let D = doc.data().round4;

      let ListRound = ['R1','R2','R3','R4'];
      let ListRoundSorted = [];
      var ListRoundVal = [A, B, C, D];
      var ListRoundValSorted = ListRoundVal.sort(sortNumber);
      //console.log(doc.data().boothid);
      //console.log('R1:' + A +'| R2:' + B + ' | R3:' + C + ' | R4:'+ D);
      //console.log('RoundVal min to max '+ ListRoundValSorted);
      for (var i = 0; i < 4; i++) {

        if (ListRoundValSorted[i] === A) {
          if (ListRoundSorted.includes(ListRound[0]) === false) {
            ListRoundSorted.push(ListRound[0])
          }
        }
        if (ListRoundValSorted[i] === B) {
          if (ListRoundSorted.includes(ListRound[1]) === false) {
            ListRoundSorted.push(ListRound[1])
          }
        }
        if (ListRoundValSorted[i] === C) {
          if (ListRoundSorted.includes(ListRound[2]) === false) {
            ListRoundSorted.push(ListRound[2])
          }
        }
        if (ListRoundValSorted[i] === D) {
          if (ListRoundSorted.includes(ListRound[3]) === false) {
            ListRoundSorted.push(ListRound[3])
          }
        }


      }
      return ListRoundSorted;
    }


    let userid = req.body.userid;
    let u_firstname = req.body.u_firstname;
    let u_lastname = req.body.u_lastname;
    let u_class = req.body.u_class;
    let u_roll = req.body.u_roll;
    let selectedBooth = req.body.selection;

    boothsRef.doc(selectedBooth[0]).get() // Query Booth1
      .then(docB1 => {
        let B1Weight = getBoothWeight(docB1);
        let B1boothid = docB1.data().boothid;
        let B1RoundSorted = getListRoundSorted(docB1)

        boothsRef.doc(selectedBooth[1]).get() // Query Booth2
          .then(docB2 => {
            let B2Weight = getBoothWeight(docB2);
            let B2boothid = docB2.data().boothid;
            let B2RoundSorted = getListRoundSorted(docB2)

            boothsRef.doc(selectedBooth[2]).get() // Query Booth3
              .then(docB3 => {
                let B3Weight = getBoothWeight(docB3);
                let B3boothid = docB3.data().boothid;
                let B3RoundSorted = getListRoundSorted(docB3)

                boothsRef.doc(selectedBooth[3]).get() // Query Booth4
                  .then(docB4 => {
                    let B4Weight = getBoothWeight(docB4);
                    let B4boothid = docB4.data().boothid;
                    let B4RoundSorted = getListRoundSorted(docB4)

                    // Finish Query of 4 Selected Booths


                    let ListBoothWeight = [B1Weight, B2Weight, B3Weight, B4Weight];
                    let ListBoothWeightSorted = ListBoothWeight.sort(sortNumber).reverse()
                    console.log('ListBoothWeightSorted: ' + ListBoothWeightSorted);


                    // -- Sorting ListSelectedBooth by BoothWeight -- //
                    let ListSelectedBoothSorted = [];
                    var i;
                    for (i = 0; i < 4; i++) {
                      if (ListBoothWeightSorted[i] === B1Weight) {
                        if (ListSelectedBoothSorted.includes(B1boothid) === false) {
                          ListSelectedBoothSorted.push(B1boothid);
                        }
                      }
                      if (ListBoothWeightSorted[i] === B2Weight) {
                        if (ListSelectedBoothSorted.includes(B2boothid) === false) {
                          ListSelectedBoothSorted.push(B2boothid);
                        }
                      }
                      if (ListBoothWeightSorted[i] === B3Weight) {
                        if (ListSelectedBoothSorted.includes(B3boothid) === false) {
                          ListSelectedBoothSorted.push(B3boothid);
                        }
                      }
                      if (ListBoothWeightSorted[i] === B4Weight) {
                        if (ListSelectedBoothSorted.includes(B4boothid) === false) {
                          ListSelectedBoothSorted.push(B4boothid);
                        }
                      }
                    }
                    console.log('ListSelectedBoothSorted: ' + ListSelectedBoothSorted);
                    // -- End Sorting ListSelectedBooth by BoothWeight -- //

                    console.log('B1: '+ B1RoundSorted);
                    console.log('B2: '+ B2RoundSorted);
                    console.log('B3: '+ B3RoundSorted);
                    console.log('B4: '+ B4RoundSorted);

                    // -- Randoming Booth -- //
                    let ListUserRound = [];

                    function randombooth (boothid,ListRoundSorted) {
                      if (ListUserRound.includes(ListRoundSorted[0]) === false) {
                        ListUserRound.push(ListRoundSorted[0]);
                      } else if (ListUserRound.includes(ListRoundSorted[1]) === false) {
                        ListUserRound.push(ListRoundSorted[1]);
                      } else if (ListUserRound.includes(ListRoundSorted[2]) === false) {
                        ListUserRound.push(ListRoundSorted[2]);
                      } else if (ListUserRound.includes(ListRoundSorted[3]) === false) {
                        ListUserRound.push(ListRoundSorted[3]);
                      }
                      return null;
                    }
                    for (var j = 0; j < 4; j++) {
                      if(ListSelectedBoothSorted[j] === B1boothid){
                        randombooth(B1boothid,B1RoundSorted);
                      } else if (ListSelectedBoothSorted[j] === B2boothid) {
                        randombooth(B2boothid,B2RoundSorted);
                      } else if (ListSelectedBoothSorted[j] === B3boothid) {
                        randombooth(B3boothid,B3RoundSorted);
                      } else if (ListSelectedBoothSorted[j] === B4boothid) {
                        randombooth(B4boothid,B4RoundSorted);
                      }
                    }
                    console.log(ListSelectedBoothSorted)
                    console.log(ListUserRound);

                    // Sort the random booth from R1 - R4
                    let ListUserBoothSorted = [];
                    let ListUserRoundSorted = ['R1','R2','R3','R4'];
                    console.log(ListUserRoundSorted);
                    for (var k = 0; k < 4; k++) {
                      if (ListUserRoundSorted[k] === ListUserRound[0]) {
                        ListUserBoothSorted.push(ListSelectedBoothSorted[0]);
                      } else if (ListUserRoundSorted[k] === ListUserRound[1]) {
                        ListUserBoothSorted.push(ListSelectedBoothSorted[1]);
                      } else if (ListUserRoundSorted[k] === ListUserRound[2]) {
                        ListUserBoothSorted.push(ListSelectedBoothSorted[2]);
                      } else if (ListUserRoundSorted[k] === ListUserRound[3]) {
                        ListUserBoothSorted.push(ListSelectedBoothSorted[3]);
                      }
                    }
                    // "ListUserBoothSorted" is the list of random booth arranged from R1 - R4

                    // -- End Randoming Booth -- //


                    console.log(ListUserBoothSorted);
                    usersRef.doc(userid).set({
                      userid:userid,
                      u_firstname:u_firstname,
                      u_lastname:u_lastname,
                      u_class:u_class,
                      u_roll:u_roll,
                      u_round1:ListUserBoothSorted[0],
                      u_round2:ListUserBoothSorted[1],
                      u_round3:ListUserBoothSorted[2],
                      u_round4:ListUserBoothSorted[3]
                    }, {merge: true})
                      .then(ref =>{
                        console.log('Add User Successfully ', ref);
                        return null;
                      })
                      .catch(err => {
                        console.log('Error: ', err);
                      });

                    // --- Add User to Round1 --//
                    var AddUserRound1Ref = boothsRef.doc(ListUserBoothSorted[0])
                    if (ListUserBoothSorted[0] === B1boothid) {
                      let newround1 = getBoothRound1(docB1);
                      newround1 += 1;
                      AddUserRound1Ref.update({round1: newround1});
                      let newboothtotal1 = getBoothTotal(docB1);
                      newboothtotal1 += 1;
                      AddUserRound1Ref.update({boothtotal: newboothtotal1});
                      AddUserRound1Ref.collection('round1').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    } else if (ListUserBoothSorted[0] === B2boothid) {
                      let newround1 = getBoothRound1(docB2);
                      newround1 += 1;
                      AddUserRound1Ref.update({round1: newround1});
                      let newboothtotal1 = getBoothTotal(docB2);
                      newboothtotal1 += 1;
                      AddUserRound1Ref.update({boothtotal: newboothtotal1});
                      AddUserRound1Ref.collection('round1').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    } else if (ListUserBoothSorted[0] === B3boothid) {
                      let newround1 = getBoothRound1(docB3);
                      newround1 += 1;
                      AddUserRound1Ref.update({round1: newround1});
                      let newboothtotal1 = getBoothTotal(docB3);
                      newboothtotal1 += 1;
                      AddUserRound1Ref.update({boothtotal: newboothtotal1});
                      AddUserRound1Ref.collection('round1').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    } else if (ListUserBoothSorted[0] === B4boothid) {
                      let newround1 = getBoothRound1(docB4);
                      newround1 += 1;
                      AddUserRound1Ref.update({round1: newround1});
                      let newboothtotal1 = getBoothTotal(docB4);
                      newboothtotal1 += 1;
                      AddUserRound1Ref.update({boothtotal: newboothtotal1});
                      AddUserRound1Ref.collection('round1').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    }

                    // --- Add User to Round2 --//
                    var AddUserRound2Ref = boothsRef.doc(ListUserBoothSorted[1])
                    if (ListUserBoothSorted[1] === B1boothid) {
                      let newround2 = getBoothRound2(docB1);
                      newround2 += 1;
                      AddUserRound2Ref.update({round2: newround2});
                      let newboothtotal2 = getBoothTotal(docB1);
                      newboothtotal2 += 1;
                      AddUserRound2Ref.update({boothtotal: newboothtotal2});
                      AddUserRound2Ref.collection('round2').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    } else if (ListUserBoothSorted[1] === B2boothid) {
                      let newround2 = getBoothRound2(docB2)
                      newround2 += 1;
                      AddUserRound2Ref.update({round2: newround2});
                      let newboothtotal2 = getBoothTotal(docB2);
                      newboothtotal2 += 1;
                      AddUserRound2Ref.update({boothtotal: newboothtotal2});
                      AddUserRound2Ref.collection('round2').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    } else if (ListUserBoothSorted[1] === B3boothid) {
                      let newround2 = getBoothRound2(docB3);
                      newround2 += 1;
                      AddUserRound2Ref.update({round2: newround2});
                      let newboothtotal2 = getBoothTotal(docB3);
                      newboothtotal2 += 1;
                      AddUserRound2Ref.update({boothtotal: newboothtotal2});
                      AddUserRound2Ref.collection('round2').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    } else if (ListUserBoothSorted[1] === B4boothid) {
                      let newround2 = getBoothRound2(docB4);
                      newround2 += 1;
                      AddUserRound2Ref.update({round2: newround2});
                      let newboothtotal2 = getBoothTotal(docB4);
                      newboothtotal2 += 1;
                      AddUserRound2Ref.update({boothtotal: newboothtotal2});
                      AddUserRound2Ref.collection('round2').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    }

                    // --- Add User to Round3 --//
                    var AddUserRound3Ref = boothsRef.doc(ListUserBoothSorted[2])
                    if (ListUserBoothSorted[2] === B1boothid) {
                      let newround3 = getBoothRound3(docB1);
                      newround3 += 1;
                      AddUserRound3Ref.update({round3: newround3});
                      let newboothtotal3 = getBoothTotal(docB1);
                      newboothtotal3 += 1;
                      AddUserRound3Ref.update({boothtotal: newboothtotal3});
                      AddUserRound3Ref.collection('round3').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    } else if (ListUserBoothSorted[2] === B2boothid) {
                      let newround3 = getBoothRound3(docB2);
                      newround3 += 1;
                      AddUserRound3Ref.update({round3: newround3});
                      let newboothtotal3 = getBoothTotal(docB2);
                      newboothtotal3 += 1;
                      AddUserRound3Ref.update({boothtotal: newboothtotal3});
                      AddUserRound3Ref.collection('round3').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    } else if (ListUserBoothSorted[2] === B3boothid) {
                      let newround3 = getBoothRound3(docB3);
                      newround3 += 1;
                      AddUserRound3Ref.update({round3: newround3});
                      let newboothtotal3 = getBoothTotal(docB3);
                      newboothtotal3 += 1;
                      AddUserRound3Ref.update({boothtotal: newboothtotal3});
                      AddUserRound3Ref.collection('round3').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    } else if (ListUserBoothSorted[2] === B4boothid) {
                      let newround3 = getBoothRound3(docB4);
                      newround3 += 1;
                      AddUserRound3Ref.update({round3: newround3});
                      let newboothtotal3 = getBoothTotal(docB4);
                      newboothtotal3 += 1;
                      AddUserRound3Ref.update({boothtotal: newboothtotal3});
                      AddUserRound3Ref.collection('round3').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    }

                    // --- Add User to Round4 --//
                    var AddUserRound4Ref = boothsRef.doc(ListUserBoothSorted[3])
                    if (ListUserBoothSorted[3] === B1boothid) {
                      let newround4 = getBoothRound4(docB1);
                      newround4 += 1;
                      AddUserRound4Ref.update({round4: newround4});
                      let newboothtotal4 = getBoothTotal(docB1);
                      newboothtotal4 += 1;
                      AddUserRound4Ref.update({boothtotal: newboothtotal4});
                      AddUserRound4Ref.collection('round4').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    } else if (ListUserBoothSorted[3] === B2boothid) {
                      let newround4 = getBoothRound4(docB2);
                      newround4 += 1;
                      AddUserRound4Ref.update({round4: newround4});
                      let newboothtotal4 = getBoothTotal(docB2);
                      newboothtotal4 += 1;
                      AddUserRound4Ref.update({boothtotal: newboothtotal4});
                      AddUserRound4Ref.collection('round4').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    } else if (ListUserBoothSorted[3] === B3boothid) {
                      let newround4 = getBoothRound4(docB3);
                      newround4 += 1;
                      AddUserRound4Ref.update({round4: newround4});
                      let newboothtotal4 = getBoothTotal(docB3);
                      newboothtotal4 += 1;
                      AddUserRound4Ref.update({boothtotal: newboothtotal4});
                      AddUserRound4Ref.collection('round4').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    } else if (ListUserBoothSorted[3] === B4boothid) {
                      let newround4 = getBoothRound4(docB4);
                      newround4 += 1;
                      AddUserRound4Ref.update({round4: newround4});
                      let newboothtotal4 = getBoothTotal(docB4);
                      newboothtotal4 += 1;
                      AddUserRound4Ref.update({boothtotal: newboothtotal4});
                      AddUserRound4Ref.collection('round4').doc(userid).set({
                        userid:userid,
                        u_firstname:u_firstname,
                        u_lastname:u_lastname,
                        u_class:u_class,
                        u_roll:u_roll
                      });
                    }

                    res.render('dev-regis',{
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

















                    console.log('\n LightUpTheProject | Created by TJTHANAPAT')
                    console.log('\n Following is the list of booths user must attend each round.')
                    console.log('   Round1: ' + ListUserBoothSorted[0])
                    console.log('   Round2: ' + ListUserBoothSorted[1])
                    console.log('   Round3: ' + ListUserBoothSorted[2])
                    console.log('   Round4: ' + ListUserBoothSorted[3])

                    return null; // Return of Booth4 Query
                  }).catch(err => { // Catch Err of Booth4 Query
                    console.log('Error: ', err);
                  });
                return null; // Return of Booth3 Query
              }).catch(err => { // Catch Err of Booth3 Query
                console.log('Error: ', err);
              });
            return null; // Return of Booth2 Query
          }).catch(err => { // Catch Err of Booth2 Query
            console.log('Error: ', err);
          });
        return null; // Return of Booth1 Query
      }).catch(err => { // Catch Err of Booth1 Query
        console.log('Error: ', err);
      });

  });
};
