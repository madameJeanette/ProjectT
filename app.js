var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;
if(process.env.ENV == 'Test')
db = mongoose.connect('mongodb://localhost/tarantulaAPI');

else{

db = mongoose.connect('mongodb://localhost/tarantulaAPI');

}

var Tarantula = require('./models/tarantulaModel');

var app = express();

var port = process.env.PORT || 8000;

app.options("/api/tarantulas", function(req, res, next){
  res.header('Access-Control-Allow-Origin', null);
  res.header('Allow', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

app.options("/api/tarantulas/:tarantulaId", function(req, res, next){
  res.header('Access-Control-Allow-Origin', null);
  res.header('Allow', 'GET,OPTIONS,PUT,DELETE');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

ttRouter = require('./Routes/ttRoutes')(Tarantula);

app.use(function(req,res,next) {
  if  (req.accepts('json')){next();
    return} 
    res.sendStatus(404);
})
app.use('/api/tarantulas', ttRouter);

app.get('/api', function(req, res, next) {
  res.send('welcome to my API');
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});


app.listen(port, function(){
 console.log('Running on PORT: ' + port);
});

module.exports = app;