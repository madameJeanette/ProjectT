var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/tarantulaAPI');

var Tarantula = require('./models/tarantulaModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var ttRouter = express.Router();

ttRouter.route('/Tarantulas')
 .post(function (req,res) {
   var tarantula = new Tarantula(req.body);

   tarantula.save();
   res.status(201).send(tarantula);
     
 })
 .get(function (req,res) {
    Tarantula.find(function(err,tarantulas){
        if(err)
          res.status(500).send(err);
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