var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tarantulaModel = new Schema({
   
   name: {type: String, required: true},
   latinName: {type: String, required: true},
   habitat:{type: String, required: true},
   collected: {type: Boolean, default:false}
  
}
);

module.exports= mongoose.model('Tarantula', tarantulaModel);