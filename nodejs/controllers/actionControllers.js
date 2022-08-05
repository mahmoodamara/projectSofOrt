const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {
  Action
} = require('../models/action');

// => localhost:3000/Action/
router.get('/action', (req, res) => {
  Action.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Action :' + JSON.stringify(err, undefined, 2));
    }
  });
});

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


router.delete('/action/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  Action.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});


let count = 0

function updateTimeAuction() {


  const d = new Date().getDate();
  const m = new Date().getMonth() + 1;
  const y = new Date().getFullYear();

  const h = new Date().getHours();
  const min = new Date().getMinutes();
  const s = new Date().getSeconds();
  //2022-07-19T21:59
  //7 24,2022 18:26:10
  time = `${m} ${d},${y} ${h}:${min}:${s}`;



  if (min + 3 < 60) {
    timeUpdate = `${m} ${d},${y} ${h}:${min+3}:${s}`;
  }
  if (min + 3 >= 60) {
    timeUpdate = `${m} ${d},${y} ${h+1}:${(min+3)-60}:${s}`;
  }

  //timeUpdate = `${y}-${m}-${d}T${h}:${min+3}:${s}`;

  //console.log(time)
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

      }
    } else {
      console.log('Error in Retriving Rent :' + JSON.stringify(err, undefined, 2));
    }
  });
}

setInterval(updateTimeAuction, 1000);

module.exports = router;
