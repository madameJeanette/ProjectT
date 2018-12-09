var ttController = function(Tarantula) {
  var post = function(req, res) {
    var tarantula = new Tarantula(req.body);

    if (!req.body.name) {
      res.status(400);
      res.send("Name is required");
    } 
    else {
      tarantula.save();
      res.status(201);
      res.send(tarantula);
    }
  }

  var get = function(req, res) {
    var query = {};

    if (req.query.habitat) {
      query.habitat = req.query.habitat;
    }
    
    Tarantula.find(query, function(err, tarantulas) {
      var returnTarantulas = [];
      if (err) res.status(500).send(err);
      else {
        
        tarantulas.forEach(function(element, index, array) {
          var newTarantula = element.toJSON();
          newTarantula.links = {};
          newTarantula.links.self =
            "http://" + req.headers.host + "/api/tarantulas" + newTarantula._id
          returnTarantulas.push(newTarantula);
        }); 
        res.json(returnTarantulas);
        }
      });
    }
      //for (i = 0; i < tarantulas.length; i++) {
      //let element = tarantulas[i];
      // returnTarantulas.push(element);
      // }
      // let response = {
      //   items: returnTarantulas,
      //  pagination: {
      //   currentPage: 1,
      //   currentItems: tarantulas.length,
      //  totalPages: 1,
      //   totalItems: 10,
      //  _links: {
      //    first: {
      //     page: 1,
      //   href: "http://CMGTDani.tk/api/tarantulas"
      //   },
      //   last: {
      //     page: 1,
      //      href: "http://CMGTDani.tk/api/tarantulas"
      //    },
      //    previous: {
      //      page: 1,
      //     href: "http://CMGTDani.tk/api/tarantulas"
      //   },
      //   next: {
      //     page: 1,
      //     href: "http://CMGTDani.tk/api/tarantulas"
      //   }
      // }
      // }
      
  

 return {
 post: post,
  get: get
 }

}
module.exports = ttController;
