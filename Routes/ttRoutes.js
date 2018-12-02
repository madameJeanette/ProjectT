var express = require('express');

var routes = function(Tarantula){
    var ttRouter = express.Router();
   
    ttRouter.route('/')
     .post(function (req,res) {
        var tarantula = new Tarantula(req.body);

        tarantula.save();
        res.status(201).send(tarantula);
    })
    .get(function (req,res) {
      
        var query = {};

        if(req.query.habitat)
        {
            query.habitat = req.query.habitat;
        }

       Tarantula.find(query, function(err,tarantulas){

        if(err)
          res.status(500).send(err);
        else 
         res.json(tarantulas);
    }); 
 });
 ttRouter.route.use('/:tarantulaId', function(req,res,next){
      
    Tarantula.findById(req.params.tarantulaId, function(err,tarantula){

        if(err)
          res.status(500).send(err);
        else  if(tarantula)
        {
            req.tarantula = tarantula;
            next();
        }
        else
        {
            res.status(404).send('No tarantula found...:(');
        }

        }); 

 });
 ttRouter.route('/:tarantulaId')
  .get(function (req,res) {
    
  res.json(req.tarantula);

})

.put(function(req,res){
           req.tarantula.name= req.body.name;
           req.tarantula.latinName= req.body.latinName;
            req.tarantula.habitat= req.body.habitat;
            req.tarantula.collected= req.body.collected;
            req.tarantula.save();
            res.json(req.tarantula);
        }); 

 return ttRouter;

};
 module.exports = routes;

