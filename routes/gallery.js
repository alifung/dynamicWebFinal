// all the ROUTES!

var express = require('express');
var router = express.Router();

var path = require('path');

var multer = require('multer'); 
var uploadPath = path.join(__dirname, '../public/uploads');
var upload = multer({ dest: uploadPath }); //

var galleryPost = require('../models/galleryPost'); //this connects back to the model gallerypost.js

router.get('/', function(req, res) {
    res.render('gallery'); //renders hbs file
});

router.get('/create', function(req, res) {
    res.render('create'); //renders hbs view create
});

//what does this do???
// router.get('/', function(req, res) {
//     var query = {}
//     if (submitted = true) {
//         query = { id: req.query.id}; //WHAT DO I DO HERE????
//     }
//     galleryPost.find(query, function(err, data) { // is this correct?
//         var pageData = {
//             galleryPost: data
//         };
//         res.render('/', pageData);
//     });
// });


router.post('/create', upload.single('image'), function(req, res) {
    var myFileName = undefined;
    // if there is a file...
    if (req.file) {
        myFileName = req.file.filename;
    }

//file in the things in the categories of the schema
    var newsketch = new galleryPost({

            filename: myFileName,
            //imageURL: ,
           // artist: username, //I need to define this? artist.username? how do I get it? 
            submitted: false,
            // new: Boolean
             //save the filename
    });

    console.log(myFileName);

    newsketch.save(function(err, data) {
        if (err) {
            console.log(err);

            return res.redirect(404, './create'); // if error, return to the main display. should I add flash message here to say there was an error?
        }

        return res.redirect('./'); //if success, return to the main gallery
        //return res.redirect('./individual-cheese' + data._id); //if success, return to the YOUR cheese
    });
});

router.get('/yoursketch:id', function(req, res) {
    Cheese.find({ '_id': req.params.id }, function(err, data) {
        if (err) {
            console.log(err);
        }
        var pageData = {
            galleryPost: data
        }
        console.log(data);
        return res.render('', pageData);
    });
});

//get image data, and then get image data to save as image file on server
    //var dataURL = canvas.toDataURL(); 
    //document.queryselector('canvas').toURL(); //maybe with cloudinary? its a base64 image. look at cloudinary's jquery plugin. - you have to store the image ID or URL in database
    //can also do base64 from the server or send from browser to cloudinary, get id from cloudinary, and save it to database. make sure that databse knows where to find data on cloudinary
    

router.get('/yoursketch', function(req, res) {
    //console.log(res.render(_id));

    var query = {}
    if (req.query.id) {
        query = { id: req.query.id };
    }
    yoursketch.find(query), (function(err, data) {
        var pageData = {
            cheeses: data
        };
        res.render('yoursketch' + data._id, pageData);
    });
});

module.exports = router;
