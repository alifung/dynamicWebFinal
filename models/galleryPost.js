//SCHEMAS

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var galleryPostSchema = new Schema({ 

	filename: String,
	//imageURL: String,
	artist: String, //work with session to further define this?
	submitted: Boolean,
	new: Boolean
}); 

var Picture = mongoose.model('Picture', galleryPostSchema);
module.exports = Picture;


//list of questions: does the passport part take care of the artist portion?
//is there any way to save files off of p5 onto the server instead of the user's computer?
//