var express = require('express');

var routes = function(Tarantula){
    var ttRouter = express.Router();
   
    ttRouter.route('/Tarantulas')
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

 ttRouter.route('/Tarantulas/:tarantulaId')
  .get(function (req,res) {
      
    Tarantula.findById(req.params.tarantulaId, function(err,tarantula){

    if(err)
      res.status(500).send(err);
    else 
     res.json(tarantula);
    }); 
});

 return ttRouter;
};

module.exports = routes;