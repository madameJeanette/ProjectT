var express = require("express");

var routes = function(Tarantula) {
  var ttRouter = express.Router();

  var ttController = require("../Controllers/ttController.js")(Tarantula);
  ttRouter
    .route("/")
    .post(ttController.post)
    .get(ttController.get);

  ttRouter.use("/:tarantulaId", function(req, res, next) {
    Tarantula.findById(req.params.tarantulaId, function(err, tarantula) {
      if (err) res.status(500).send(err);
      else if (tarantula) {
        req.tarantula = tarantula;
        next();
      } else {
        res.status(404).send("No tarantula found...:(");
      }
    });
  });
  ttRouter
    .route("/:tarantulaId")
    .get(function(req, res) {
      res.json(req.tarantula);
    })

    .put(function(req, res, next) {
      req.tarantula.name = req.body.name;
      req.tarantula.latinName = req.body.latinName;
      req.tarantula.habitat = req.body.habitat;

      if (req.body.name || req.body.latinName || req.body.habitat)
        req.tarantula.save(function(err) {
          if (err) res.status(500).send(err);
          else {
            res.json(req.tarantula);
          }
        })
        else{
          res.sendStatus(400)
        } 
        
    })

    .patch(function(req, res) {
      if (req.body._id) delete req.body._id;
      for (var p in req.body) {
        req.tarantula[p] = req.body[p];
      }
      req.tarantula.save(function(err) {
        if (err) res.status(500).send(err);
        else {
          res.json(req.tarantula);
        }
      });
    })
    .delete(function(req, res) {
      req.tarantula.remove(function(err) {
        if (err) res.status(500).send(err);
        else {
          res.status(204).send("Removed");
        }
      });
    });

  return ttRouter;
};

module.exports = routes;
