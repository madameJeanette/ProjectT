
var ttController = function(Tarantula) {
  var post = function(req, res) {
    var tarantula = new Tarantula(req.body);

    if (!req.body.name) {
      res.status(400);
      res.send("Name is required");
    } else {
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
   
      console.log('show collection');
      if (err) res.status(500).send(err)
      else {
       tarantulas.forEach(function(element, index, array) {
        console.log('add taruntala');
        var newTarantula = element.toJSON();
        newTarantula.links = {};
        newTarantula.links.self =
        "http://" + req.headers.host + "/api/tarantulas/" + newTarantula._id;
        returnTarantulas.push(newTarantula);
       });
       var items = {
        items: returnTarantulas,
        _links:{self:{href:"http://cmgtdani.tk/api/tarantulas/"}
      },
      pagination: {
        currentPage: 10,
        totalPages: 10,
        totalItems: 10,
        _links: {    
          first: {
          page: 1,
          href: "http://amycmgt.tk/projects/?start=1&limit=0"
      },
      last: {
          "page": null,
          "href": "http://amycmgt.tk/projects/?start=NaN&limit=NaN"
      },
      "previous": {
          "page": 10000,
          "href": "http://amycmgt.tk/projects/?start=NaN&limit=NaN"
      },
      "next": {
          "page": null,
          "href": "http://amycmgt.tk/projects/?start=NaN&limit=NaN"
      }}

      }};
      res.json(items);
    }})}
    
  
  return {
    post: post,
    get: get
  };
}
  
module.exports = ttController;


  
