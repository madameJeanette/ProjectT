var ttController = function(Tarantula) {
    
  var post = function(req, res) {
    var tarantula = new Tarantula(req.body);

    if(!req.body.title){
        res.status(400);
        res.send('Name is required');
    }
    else{
    tarantula.save();
    res.status(201)
    res.send(tarantula);

  }
}

  var get = function(req, res) {
    var query = {};

    if (req.query.habitat) {
      query.habitat = req.query.habitat;
    }

    Tarantula.find(query, function(err, tarantulas) {
      let allTarantulas = [];
      if (err) res.status(500).send(err);
      else
        for (i = 0; i < tarantulas.length; i++) {
          let element = tarantulas[i];
          allTarantulas.push(element);
        }
      let response = {
        items: allTarantulas,
        pagination: {
          currentPage: 1,
          currentItems: tarantulas.length,
          totalPages: 1,
          totalItems: 10,
          _links: {
            first: {
              page: 1,
              href: "http://CMGTDani.tk/api/tarantulas"
            },
            last: {
              page: 1,
              href: "http://CMGTDani.tk/api/tarantulas"
            },
            previous: {
              page: 1,
              href: "http://CMGTDani.tk/api/tarantulas"
            },
            next: {
              page: 1,
              href: "http://CMGTDani.tk/api/tarantulas"
            }
          }
        }
      }
      res.json(response);
    });
  }
    return {
        post: post,
        get: get
      }
  }

module.exports = ttController;
