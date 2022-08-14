const express = require('express');
const {
  asyncScheduler
} = require('rxjs');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {
  Rent
} = require('../models/rent');

var {
  Cars
} = require('../models/cars');

// The function retrieves rented vehicles from the Rents DB
router.get('/rent', (req, res) => {
  Rent.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Rent :' + JSON.stringify(err, undefined, 2));
    }
  });
});
// A function that retrieves the vehicle according to the rental serial number from the Rents DB
router.get('/rent/serialNumber', (req, res) => {
  const serialnumber = req.query.serialNumber;
  Rent.find({
    serialNumber: serialnumber
  }, function (err, response) {
    if (err)
      res.send(err);
    else
      res.send(response)
  })
});


// A function to add Rent to the Rent DB.
router.post('/rent', async (req, res) => {
  const rentOne = await Rent.findOne({
    serialNumber: req.body.serialNumber
  });

  var rent = new Rent({
    serialNumber: req.body.serialNumber,
    img: req.body.img,
    type: req.body.type,
    KM: req.body.KM,
    price: req.body.price,

  });
  rentUser = {
    email: req.body.email,
    checkOut: req.body.checkOut,
    checkIn: req.body.checkIn,
    location: req.body.location,
    sendEmail: false

  }
  rent.rent.push(rentUser);

  if (!rentOne) {
    rent.save((err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log('Error in Rent Save :' + JSON.stringify(err, undefined, 2));
      }
    });
  } else {
    Rent.updateOne({
      serialNumber: req.body.serialNumber
    }, {
      $push: {
        rent: rentUser
      }
    }, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2));
      }
    });
  }
});
// A function to update Rent in the Rent DB.
router.put('/rent/:email', (req, res) => {


    rentUser = {
      email: req.body.email,
      checkOut: req.body.checkOut,
      checkIn: req.body.checkIn,
      location: req.body.location,
    }
  Rent.findOneAndUpdate({"rent.email":req.params.email}, {
    '$set': {
      'rent.$': rentUser,
  }
  }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
    }
  });
});


// A function to update the rental statuses for each vehicle according to the time the vehicle was rented and returned.
function updateRent() {


  const d = new Date().getDate();
  const m = new Date().getMonth() + 1;
  const y = new Date().getFullYear();

  const h = new Date().getHours();
  const min = new Date().getMinutes();
  const s = new Date().getSeconds();


  let time
  if (d < 10 && m < 10) {
    time = `${y}-0${m}-0${d}`
  }
  if (d >= 10 && m < 10) {
    time = `${y}-0${m}-${d}`
  }
  if (d < 10 && m > 10) {
    time = `${y}-${m}-0${d}`
  }
  if (d >= 10 && m >= 10) {
    time = `${y}-${m}-${d}`
  }
  //console.log(time)
  Rent.find({
    "rent.checkIn": time
  }, function (err, docs) {
    if (!err) {
      for (let i = 0; i < docs.length; i++) {
        for (let j = 0; j < docs[i].rent.length; j++) {
          if (docs[i].rent[j].checkIn == time) {
            if (h >= 10 && h < 18) {
              Cars.updateOne({
                serialNumber: docs[i].serialNumber
              }, {
                $set: {
                  isRent: true
                }
              }, (err, doc) => {
                if (!err) {

                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              });

            }
          }
          if (docs[i].rent[j].checkOut == time) {
            if (h >= 18 && h < 24) {
              Cars.updateOne({
                serialNumber: docs[i].serialNumber
              }, {
                $set: {
                  isRent: false
                }
              }, (err, doc) => {
                if (!err) {
                  return;
                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              });

              Rent.updateOne({
                serialNumber: docs[i].serialNumber
              }, {
                $set: {
                  "rent.$.sendEmail": false
                }
              }, (err, doc) => {
                if (!err) {
                  return;
                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              });


              Rent.findOneAndUpdate({
                serialNumber: docs[i].serialNumber
              }, {
                $pull: {
                  rent: {
                    email: docs[i].rent[j].email
                  }
                }
              }, {
                new: true
              }, (err, doc) => {
                if (!err) {
                  if (docs[i].rent.length == 0) {
                    Cars.updateOne({
                      serialNumber: docs[i].serialNumber
                    }, {
                      $set: {
                        isRent: false
                      }
                    }, (err, doc) => {
                      if (!err) {
                        return;
                      } else {
                        console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                      }
                    });
                    Rent.findOneAndRemove({
                      serialNumber: docs[i].serialNumber
                    }, (err, doc) => {
                      if (!err) {
                        res.send(doc);
                      } else {
                        console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
                      }
                    });
                  }

                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              })
            }

          }
        }
      }
    } else {
      console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
    }
  })






  Rent.find({
    "rent.checkOut": time
  }, function (err, docs) {
    if (!err) {
      for (let i = 0; i < docs.length; i++) {
        for (let j = 0; j < docs[i].rent.length; j++) {
          // if (docs[i].rent[j].checkIn == time) {
          //   if (h >= 10 && h < 18) {
          //     Cars.updateOne({
          //       serialNumber: docs[i].serialNumber
          //     }, {
          //       $set: {
          //         isRent: true
          //       }
          //     }, (err, doc) => {
          //       if (!err) {

          //       } else {
          //         console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
          //       }
          //     });

          //   }
          // }
          if (docs[i].rent[j].checkOut == time) {
            if (h >= 16 && h < 24) {
              Cars.updateOne({
                serialNumber: docs[i].serialNumber
              }, {
                $set: {
                  isRent: false
                }
              }, (err, doc) => {
                if (!err) {
                  return;
                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              });
            }
          }


          Rent.findOneAndUpdate({
            "rent.email": docs[i].rent[j].email
          }, {
              '$set': {
                'rent.$.sendEmail': false,

            }
          }, (err, doc) => {
            if (!err) {
              console.log(doc)
            } else {
              console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
            }
          });

              Rent.findOneAndUpdate({
                serialNumber: docs[i].serialNumber
              }, {
                $pull: {
                  rent: {
                    email: docs[i].rent[j].email
                  }
                }
              }, {
                new: true
              }, (err, doc) => {
                if (!err) {

                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              })
            }



      }
    } else {
      console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
    }
  })

  Rent.find({}, function (err, docs) {
    if (!err) {
        for(let car of docs){
          if(car.rent.length==0){
            Cars.updateOne({
              serialNumber: car.serialNumber
            }, {
              $set: {
                isRent: false
              }
            }, (err, doc) => {
              if (!err) {
                console.log(doc)
              } else {
                console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
              }
            });
            Rent.findOneAndRemove({
              serialNumber: car.serialNumber
            }, (err, doc) => {
              if (!err) {
               return;
              } else {
                console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
              }
            });
          }
        }
    }
  })
}
setInterval(updateRent, 1000);



// Function to delete a user from renting a car.
router.get('/rent/:serialNumber/:email', (req, res) => {

  Rent.findOneAndUpdate({
    serialNumber: req.params.serialNumber
  }, {
    $pull: {
      rent: {
        email: req.params.email
      }
    }
  }, {
    new: true
  }, (err, doc) => {
    if (!err) {
      if (doc.rent.length == 0) {
        Rent.findOneAndRemove({
          serialNumber: req.params.serialNumber
        }, (err, doc) => {
          if (!err) {
            res.send(doc);
          } else {
            console.log('Error in Rent Delete :' + JSON.stringify(err, undefined, 2));
          }
        });
      }

    } else {
      console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
    }
  })
});

router.delete('/rent/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  Rent.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
      Cars.updateOne({
        serialNumber: doc.serialNumber
      }, {
        $set: {
          isRent: false
        }
      }, (err, doc) => {
        if (!err) {
          return;
        } else {
          console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
        }
      });
    } else {
      console.log('Error in Rent Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
});




module.exports = router;
