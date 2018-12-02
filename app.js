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

app.get('/', function(req, res){
  res.send('welcome to my API');
});

app.listen(port, function(){
 console.log('Running on PORT: ' + port);
});