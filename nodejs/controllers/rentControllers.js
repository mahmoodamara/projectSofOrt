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
router.get('/rent', (req, res) => {
  Rent.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Rent :' + JSON.stringify(err, undefined, 2));
    }
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
  Rent.find().sort({
    "rent.checkOut": -1
  }).exec(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.post('/rent', async (req, res) => {
  const rentOne = await Rent.findOne({
    serialNumber: req.body.serialNumber
  });

  var rent = new Rent({
    serialNumber: req.body.serialNumber,
    img:req.body.img,
    type:req.body.type,
    KM: req.body.KM,
    price : req.body.price,
  });
  rentUser = {
    email: req.body.email,
    checkOut: req.body.checkOut,
    checkIn: req.body.checkIn,
    location: req.body.location,

  }
  rent.rent.push(rentUser);

  if (!rentOne ) {
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

router.put('/rent/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  var rent = {
    checkOut: req.body.checkOut,
    checkIn: req.body.checkIn,
    email: req.body.email,
  };
  Rent.findByIdAndUpdate(req.params.id, {$set: rent}, {new: true}, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
    }
  });
});


function timer() {

  const d = new Date().getDate();
  const m = new Date().getMonth() + 1;
  const y = new Date().getFullYear();

  let time = `${y}-${m}-${d}`

  Rent.find({
    "rent.checkIn": time
  }, function (err, docs) {
    if (!err) {
      for (let dos of docs) {
        router.delete(`/home/:${dos._id}`)
        if (!ObjectId.isValid(docs._id))
          return res.status(400).send(`No record with given id : ${docs._id}`);

        Rent.findByIdAndRemove(docs._id, (err, doc) => {
          if (!err) {
            res.send(doc);
          } else {
            console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
          }
        });
      }
    }
  });

}

function updateRent() {


  const d = new Date().getDate();
  const m = new Date().getMonth() + 1;
  const y = new Date().getFullYear();

  const h = new Date().getHours();
  const min = new Date().getMinutes();
  const s = new Date().getSeconds();


  let time
  if(d<10 && m<10){
    time = `${y}-0${m}-0${d}`
  }
  if(d>=10 && m<10){
    time = `${y}-0${m}-${d}`
  }
  if(d<10 && m>10){
    time = `${y}-${m}-0${d}`
  }
  if(d>=10 && m>=10){
    time = `${y}-${m}-${d}`
  }
//console.log(time)
  Rent.find({"rent.checkIn": time}, function (err, docs) {
    if (!err) {
      for(let i=0;i<docs.length;i++){
        for(let j=0;j<docs[i].rent.length;j++){
          if(docs[i].rent[j].checkIn == time){
             if(h>=10 && h<18){
              Cars.updateOne({serialNumber:docs[i].serialNumber}, {$set: {isRent:true}}, (err, doc) => {
                if (!err) {

                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              });

             }
          }
          if(docs[i].rent[j].checkOut == time){
            if(h>=18 && h<24){
              Cars.updateOne({serialNumber:docs[i].serialNumber}, {$set: {isRent:false}}, (err, doc) => {
                if (!err) {
                  return;
                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              });


       Rent.findOneAndUpdate({ serialNumber: docs[i].serialNumber },{ $pull: { rent: { email: docs[i].rent[j].email } } },{ new: true },(err, doc) => {
         if (!err) {
            if(docs[i].rent.length==0){
              Cars.updateOne({serialNumber:docs[i].serialNumber}, {$set: {isRent:false}}, (err, doc) => {
                if (!err) {
                  return;
                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              });
          Rent.findOneAndRemove({serialNumber: docs[i].serialNumber}, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
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
}
setInterval(updateRent, 1000);




router.get('/rent/:serialNumber/:email', (req, res) => {

  Rent.findOneAndUpdate({ serialNumber: req.params.serialNumber },{ $pull: { rent: { email: req.params.email } } },{ new: true },(err, doc) => {
    if (!err) {
        if(doc.rent.length==0){
          Rent.findOneAndRemove({serialNumber:req.params.serialNumber}, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
        });
        }

    } else {
      console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
    }
  })
});




// router.delete('/rent/:id/:serialNumber', (req, res) => {
//   if (!ObjectId.isValid(req.params.id))
//       return res.status(400).send(`No record with given id : ${req.params.id}`);

//       Cars.updateOne({serialNumber:req.params.serialNumber}, {$set: {isRent:false}}, (err, doc) => {
//         if (!err) {
//           return;
//         } else {
//           console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
//         }
//       });

//   Rent.findByIdAndRemove(req.params.id, (err, doc) => {
//       if (!err) { res.send(doc); }
//       else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
//   });
// });



module.exports = router;
