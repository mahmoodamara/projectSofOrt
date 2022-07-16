const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mongoose } = require('./db');
PORT=3000;
var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

var userControllers = require('./controllers/userControllers.js');
var actionControllers = require('./controllers/actionControllers.js');
var usersInAuction = require('./controllers/usersInAuction.js');
var carsControllers = require('./controllers/carsControllers.js');
var rentControllers = require('./controllers/rentControllers.js');
var homeControllers = require('./controllers/homeControllers.js');
var teamControllers = require('./controllers/teamControllers.js');
var contactController = require('./controllers/contactController.js');
var messageController = require('./controllers/messageController.js');
var carTreatmentControllers = require('./controllers/carTreatmentControllers.js');



app.listen(PORT, () => console.log('Server started at port : 8000'));



app.use('/api', userControllers);
app.use('/api', actionControllers);
app.use('/api', usersInAuction);
app.use('/api', carsControllers);
app.use('/api', rentControllers);
app.use('/api', homeControllers);
app.use('/api', teamControllers);
app.use('/api', contactController);
app.use('/api', messageController);
app.use('/api', carTreatmentControllers);




