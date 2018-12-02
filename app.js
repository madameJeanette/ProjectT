var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/tarantulaAPI');

var Tarantula = require('./models/tarantulaModel');

var app = express();
var port = process.env.PORT || 3000;

var ttRouter = express.Router();

ttRouter.route('/Tarantulas')
 .get(function (req,res) {
    Tarantula.find(function(err,tarantulas){
        if(err)
          console.log(err)
        else 
         res.json(tarantulas);
    }); 
 });

app.use('/api', ttRouter);
 

app.get('/', function(req, res){
  res.send('welcome to my API');
});

app.listen(port, function(){
 console.log('Running on PORT: ' + port);
});