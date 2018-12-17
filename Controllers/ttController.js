
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
      res.json(returnTarantulas);
    }})}
    
  
  return {
    post: post,
    get: get
  };
}
  
module.exports = ttController;


  
