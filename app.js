var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/tarantulaAPI');

var Tarantula = require('./models/tarantulaModel');

var app = express();

var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

ttRouter = require('./Routes/tarantulaRoutes')(Tarantula);

app.use('/api', ttRouter);
 

app.get('/', function(req, res){
  res.send('welcome to my API');
});

app.listen(port, function(){
 console.log('Running on PORT: ' + port);
});