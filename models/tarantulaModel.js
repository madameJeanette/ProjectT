var mongoose = require('mongoose'),
    Schema = mongoose.Schema();

var tarantulaModel = new Schema({
   name: {type: String},
   'Latin name':{type: String},
   Habitat:{type: String},
   'In collection': {type: Boolean, default:false}

});

module.exports= mongoose.model('Tarantula', tarantulaModel);