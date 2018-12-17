
var ttController = function(Tarantula) {
  var post = function(req, res) {
    var tarantula = new Tarantula(req.body);

    if (!req.body.name) {
      res.status(400);
      res.send("Name is required");
    } else {
      console.log(tarantula)
      tarantula._links.self.href = "http://cmgtdani.tk/api/tarantulas/" + tarantula._id
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
       var items = {
        items: tarantulas,
        _links:{self:{href:"http://cmgtdani.tk/api/tarantulas/"}
      },
      pagination: {
        currentPage: 10,
        totalPages: 10,
        totalItems: 10,
        _links: {    
          first: {
          page: 1,
          href: "http://cmgtdani.tk/tarantulaAPI/?start=1&limit=0"
      },
      last: {
          "page": null,
          "href": "http://cmgtdani.tk/tarantulaAPI/?start=NaN&limit=NaN"
      },
      "previous": {
          "page": 10000,
          "href": "http://cmgtdani.tk/tarantulaAPI/?start=NaN&limit=NaN"
      },
      "next": {
          "page": null,
          "href": "http://cmgtdani.tk/tarantulaAPI/?start=NaN&limit=NaN"
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


  
