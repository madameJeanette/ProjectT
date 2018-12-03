var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/tarantulaAPI');

var Tarantula = require('./models/tarantulaModel');

var app = express();

var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

ttRouter = require('./Routes/ttRoutes')(Tarantula);

app.use('/api/tarantulas', ttRouter);

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

app.get('/', function(req, res, next) {
  res.send('welcome to my API');
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});


app.listen(port, function(){
 console.log('Running on PORT: ' + port);
});