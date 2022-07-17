const express = require('express');
const { asyncScheduler } = require('rxjs');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Rent } = require('../models/rent');

router.get('/rent', (req, res) => {
    Rent.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Rent :' + JSON.stringify(err, undefined, 2)); }
    });
});

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

router.get('/rentSort', (req, res) => {
    Rent.find().sort({checkOut: 1}).exec(function (err, docs) {
      if (!err) {
        res.send(docs);
      } else {
        console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2));
      }
    });
  });

router.post('/rent',  async (req, res) => {
  const rentOne = await Rent.findOne({serialNumber: req.body.serialNumber});

    var rent = new Rent({
        serialNumber: req.body.serialNumber,
    });
    rentUser = {
      email: req.body.email,
      checkOut: req.body.checkOut,
      checkIn: req.body.checkIn,
      location:req.body.location
    }
    rent.rent.push(rentUser);

    if(!rentOne){
    rent.save((err, doc) => {
    if (!err) { res.send(doc); }
        else { console.log('Error in Rent Save :' + JSON.stringify(err, undefined, 2)); }
    });
  }else{
    Rent.updateOne({serialNumber:req.body.serialNumber},{$push: {rent : rentUser}},(err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2));
      }
    });
  }
});

router.put('/rent/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var rent = {
        car : req.body.car ,
        checkOut:req.body.checkOut ,
        checkIn:req.body.checkIn ,
        email:req.body.email ,
        isRent : req.body.isRent,
        isShow:req.body.isShow,
    };
    Rent.findByIdAndUpdate(req.params.id, { $set: rent }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2)); }
    });
  });


  function timer() {

    const d = new Date().getDate();
    const m = new Date().getMonth() + 1;
    const y = new Date().getFullYear();
    const h = 'T18:00';

    let time=`${y}-${m}-${d}${h}`

    Rent.find({checkOut: time}, function (err, docs) {
        if (!err) {
        for(let dos of docs ){
            router.delete(`/home/:${dos._id}`)
            if (!ObjectId.isValid(docs._id))
                return res.status(400).send(`No record with given id : ${docs._id}`);

    Rent.findByIdAndRemove(docs._id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
   }
 }
});



  }
module.exports = router;
