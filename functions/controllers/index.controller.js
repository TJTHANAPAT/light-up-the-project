module.exports = function(app) {
  app.get('/', function (req, res) {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    res.render('comingsoon', {})


    const admin = require('firebase-admin');
    const db = admin.firestore();

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



    let selectedBooth = ['G01','G02','G03','G04'];
    db.collection('booths').doc(selectedBooth[0]).get() // Query Booth1
      .then(docB1 => {
        let B1Weight = getBoothWeight(docB1);
        let B1boothid = docB1.data().boothid;
        let B1RoundSorted = getListRoundSorted(docB1)

        db.collection('booths').doc(selectedBooth[1]).get() // Query Booth2
          .then(docB2 => {
            let B2Weight = getBoothWeight(docB2);
            let B2boothid = docB2.data().boothid;
            let B2RoundSorted = getListRoundSorted(docB2)

            db.collection('booths').doc(selectedBooth[2]).get() // Query Booth3
              .then(docB3 => {
                let B3Weight = getBoothWeight(docB3);
                let B3boothid = docB3.data().boothid;
                let B3RoundSorted = getListRoundSorted(docB3)

                db.collection('booths').doc(selectedBooth[3]).get() // Query Booth4
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

                    for (var j = 0; j < 4; i++) {
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

                    //console.log(ListSelectedBoothSorted)
                    //console.log(ListUserRound);

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

                    console.log('\n LightUpTheProject | Created by TJTHANAPAT')
                    console.log('\n Following is the list of booths user must attend each round.')
                    console.log('   Round1: ' + ListUserBoothSorted[0])
                    console.log('   Round2: ' + ListUserBoothSorted[1])
                    console.log('   Round3: ' + ListUserBoothSorted[2])
                    console.log('   Round4: ' + ListUserBoothSorted[3])

                    return null; // Return of Booth4 Query
                  })
                  .catch(err => { // Catch Err of Booth4 Query
                    console.log('Error ', err);
                  });
                return null; // Return of Booth3 Query
              })
              .catch(err => { // Catch Err of Booth3 Query
                console.log('Error ', err);
              });
            return null; // Return of Booth2 Query
          })
          .catch(err => { // Catch Err of Booth2 Query
            console.log('Error ', err);
          });
        return null; // Return of Booth1 Query
      })
      .catch(err => { // Catch Err of Booth1 Query
        console.log('Error ', err);
      });

  });

};
