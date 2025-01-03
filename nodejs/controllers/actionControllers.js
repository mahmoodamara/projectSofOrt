const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {
  Action
} = require('../models/action');

var {
  UserinAuction
} = require('../models/usersInAuction');

//The function retrieves the vehicles that have an auction from the Auction DB
router.get('/action', (req, res) => {
  Action.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Action :' + JSON.stringify(err, undefined, 2));
    }
  });
});
// The function retrieves the Auction details according to the SerialNumber from the Auction DB.
router.get('/action/:serialNumber', (req, res) => {
  const serialNumber = req.params.serialNumber;
  Action.find({
    serialNumber: serialNumber
  }, function (err, response) {
    if (err)
      res.send(err);
    else
      res.send(response)
  })
});

// A function to add an Auction to the Auction's DB.
router.post('/action', (req, res) => {
  var ac = new Action({
    timeAction: req.body.timeAction,
    maxPrice: req.body.maxPrice,
    minPrice: req.body.minPrice,
    carPhoto: req.body.carPhoto,
    carModel: req.body.carModel,
    carType: req.body.carType,
    carKM: req.body.carKM,
    isButtonVisible: false,
    views: 0,
    serialNumber: req.body.serialNumber


  });
  ac.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Action Save :' + JSON.stringify(err, undefined, 2));
    }
  });
});
// A function to update Auction in the Auction DB.
router.put('/action/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  var ac = {
    timeAction: req.body.timeAction,
    maxPrice: req.body.maxPrice,
    minPrice: req.body.minPrice,
    carPhoto: req.body.carPhoto,
    carModel: req.body.carModel,
    carType: req.body.carType,
    carKM: req.body.carKM,
    isButtonVisible: req.body.isButtonVisible,
    views: req.body.views,
    serialNumber: req.body.serialNumber

  };
  Action.findByIdAndUpdate(req.params.id, {
    $set: ac
  }, {
    new: true
  }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Auction Update :' + JSON.stringify(err, undefined, 2));
    }
  });
});

//A function to delete an Auction from the Auction's DB.
router.delete('/action/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  Action.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});

// A function for adding additional time to the Auction after the end of the first time and closing the Auction after the end of the additional time.

function updateTimeAuction() {
  const d = new Date().getDate();
  const m = new Date().getMonth() + 1;
  const y = new Date().getFullYear();
  const h = new Date().getHours();
  const min = new Date().getMinutes();
  const s = new Date().getSeconds();

  time = `${m} ${d},${y} ${h}:${min}:${s}`;

  if (min + 3 < 60) {
    timeUpdate = `${m} ${d},${y} ${h}:${min+3}:${s}`;
  }
  if (min + 3 >= 60) {
    timeUpdate = `${m} ${d},${y} ${h+1}:${(min+3)-60}:${s}`;
  }

  Action.find({timeAction: time}, (err, docs) => {
    if (!err) {
      for (let i = 0; i < docs.length; i++) {
        if (docs[i].timeAction && docs[i].views == 0) {
          Action.updateOne({timeAction: time}, {
            $set: {
              timeAction: timeUpdate,
              views: 1
            }
          }, (err, doc) => {
            if (!err) {
              // res.send(doc)
            } else {
              console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
            }
          });
        }

        if(docs[i].views == 1){
          Action.updateOne({serialNumber:docs[i].serialNumber}, {$set: {isButtonVisible:true}}, (err, doc) => {
            if (!err) {
              return;
            } else {
              console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
            }
          });
        }

        Action.updateOne({timeAction: time}, {
          $set: {
            views: 2
          }
        }, (err, doc) => {
          if (!err) {
            // res.send(doc)
          } else {
            console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
          }
        });
        if(docs[i].views == 2){
          UserinAuction.updateOne({carNumber: docs[i].serialNumber}, {
            $set: {
              sendEmail: true
            }
          }, (err, doc) => {
            if (!err) {
              // res.send(doc)
            } else {
              console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
            }
          });
        }

      }
    } else {
      console.log('Error in Retriving Rent :' + JSON.stringify(err, undefined, 2));
    }
  });
}

setInterval(updateTimeAuction, 500);

module.exports = router;
