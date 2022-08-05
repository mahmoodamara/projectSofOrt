const bcrypt = require("bcrypt");
const express = require("express");
const {User} = require("../models/user");
const jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

const router = express.Router();

router.get('/users', (req, res) => {
    User.find().sort({ username: -1 }).exec(function(err, docs) {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/users/shearchofemail', (req, res) => {

  const email = req.query.email;
  User.find({email:email},function(err,response){
      if(err)
      res.send(err);
      else
      res.send(response)
  })
});
router.post("/users/signup", async (req, res) => {
    const body = req.body;

    if (!( body.email && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }
    const user = new User(body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));


  });

  router.post("/users/login", async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        const token = jwt.sign({_id:user._id},'my_secret_key');
            res.json({
                token: token
            });

      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }

  });

  router.post('/users', (req, res) => {
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
    });
    user.save((err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log('Error in car Save :' + JSON.stringify(err, undefined, 2));
      }
    });
  });


  router.put('/users/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
    };
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2)); }
    });
  });

  router.delete('/users/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
  });


module.exports = router;
