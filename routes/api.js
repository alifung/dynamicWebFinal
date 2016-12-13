var express = require('express');
var router = express.Router();

var Picture = require('../models/galleryPost');

// router.get('/', function(req, res) {
// 	res.json({
// 		status:'ok'
// 	});
// 	 if( req.session.treat){
//        return res.render('view', {
//          msg: 'You have a treat: ' + req.session.treat
//         });
//     }
//     return res.render('view', {
//         msg: 'No treats.'
// });
// app.get('/', function (req, res) {

//     });
// });

//testing to see if this is the problem
router.get('/galleryPost', function(req, res) {
	res.json({
		status:'ok'
	});
});

router.post('/galleryPost', function(req, res, next) {
	var makeNew = new Picture({
		//include parameters here from schema - what goes where so like
		//don't include filename or file image
		artist: user.username,  //how do I grab the name of the person? if not using oauth? arist.username?
		submitted: false 
	});
	//does this automatically make it false and then I change it later in a function like if submittted submitted.state = "true"?

	makeNew.save(function(err,data) {
		if (err) {
			console.log(err);
			res.status(500);
			return res.json({
				status: 'error',
				message: 'there was an error in saving your sketch :( ',
				error: err
			});
		}
		//success function
		return res.json({
			status: 'a-ok',
			message: 'sketch successfully saved!',
			sketch: data //still confused about what this does
		});
	});
});

//first find - by saving ID, find it, and then change the values and save. two step process
// sketch.findByIdAndUpdate(id, { $push: {sketch: data}}, function(err, sketch){
// 	if (err) return handleError(err);
// 	res.send(sketch);
// });

// //submit - update the sketch AND update the submitted state to TRUE! 
// sketch.findByIdAndUpdate(id, { $push: {sketch: data}}, {submitted: true}, function(err, sketch) {
// 	if (err) return handleError(err);
// 	res.send(sketch);
// })
// //set new = true - check out the options on the mongoose.js docs //how do I add this???

// //so save automatically, also need route to SUBMIT! //probs need to use ajax to gather info from form


router.get('/galleryPost', function (req, res, next) {
	sketch.find({submitted: true}, function(err, data) {
		if (err) {
			res.status(500);
			return res.json({
				status: 'error',
				message: 'gallery images could not be found :( '
			});
		}
		return res.json(data);
	});
});

module.exports = router;