var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var ttRouter = express.Router();

ttRouter.route('/Tarantulas')
 .get(function (req,res) {
    var responseJson = {hello: "This is my API"}; 

    res.json(responseJson);
 });

app.use('/api', ttRouter);


app.get('/', function(req, res){
  res.send('welcome to my API');
});

app.listen(port, function(){
 console.log('Running on PORT: ' + port);
});