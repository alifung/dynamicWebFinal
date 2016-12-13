var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Treat = new Schema ({
	candy: String

});


module.exports = mongoose.model('Treat', Treat); 
//export model called 'User' with User schema 