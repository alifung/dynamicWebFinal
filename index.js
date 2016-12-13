var express = require('express');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
// var path = require('')
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express(); //express examples uses var router

require('dotenv').config(); //attach to .env that has database stuff

mongoose.connect(process.env.DB_URL);

var options = {};

var portNum = 8000;
app.set('port', portNum);

//session stuff 
//req.session.treat

app.use(session({
	secret:process.env.cookieSecret,
	cookie: {
		httpOnly: true,
		maxAge: 1000 * 60 * 24 * 7
	},
	resave: true,
	saveUninitialized: true,
    store: new MongoStore({ //PROBLEM!!
        url: process.env.DB_URL,
        update: MongoStore.update
    })
}));

// var router = express.Router();

// router.get('/', function(req, res){
// 	res.send('it works!');
// })

//tell express to use handlebars
app.engine('handlebars', hbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

//the app.use is middleware that is speciic to the router
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json //use with multer?
app.use(bodyParser.json());

//to connect to the routes
var api = require('./routes/api');
app.use('/api', api);


var gallery = require('./routes/gallery') 
app.use('/gallery', gallery); //connecting to the gallery.js -- so you know where to get the routes


// app.use(express.static(path.join(__dirname + '/public')) );

//SESSION STUFF!!!!!!

//creating session



app.use(function(req, res, next){
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

var auth = require('./lib/auth')(app, options);
auth.init();
auth.registerRoutes();
// home page


// cookie creation
app.get('/treat', function (req, res) {
    req.session.treat = 'candy corn'
    req.session.flash = {
        type: 'positive',
        header: 'You got a treat',
        body: 'the treat is ' + req.session.treat
    };
        //    res.cookie('treat', 'candy corn',{
        //        httpOnly: true,
        ////        signed: true
        //    });
    res.redirect('/');
});

// cookie deletion
app.get('/clear', function (req, res) {
    delete req.session.treat;
    //res.clearCookie('treat');
    req.session.flash = {
        type: 'negative',
        header: 'No treat',
        body: 'Your bag is empty'
    };
    //delete req.cookies.treat;
    res.redirect('/');
});


// start server
app.listen(portNum, function() {
  console.log('listening on port ', portNum);
});