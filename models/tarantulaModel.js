var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tarantulaModel = new Schema({
   name: {type: String},
   latinName: {type: String},
   habitat:{type: String},
   collected: {type: Boolean, default:false}
});

module.exports= mongoose.model('Tarantula', tarantulaModel);