var createError = require('http-errors'); 
var express = require('express'); 
var path = require('path'); 
var cookieParser = require('cookie-parser'); 
var logger = require('morgan'); 
var http = require("http"); 
var socketio = require("socket.io"); 
var app = express(); 


// Create the http server 
const server = require('http').createServer(app); 

// Create the Socket IO server on 
// the top of http server 
const io = socketio(server); 


var indexRouter = require('./routes/index')(io); 
var usersRouter = require('./routes/users'); 



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.use("/mdbootstrap", express.static(__dirname + "/node_modules/mdbootstrap"));// module mbd bootstrap

app.use("/jquery", express.static(__dirname + "/node_modules/jquery"));// module mbd bootstrap



app.use('/', indexRouter); 
app.use('/users', usersRouter); 

// Catch 404 and forward to error handler 
app.use(function (req, res, next) { 
	next(createError(404)); 
}); 

// Error handler 
app.use(function (err, req, res, next) { 

	// Set locals, only providing error 
	// in development 
	res.locals.message = err.message; 
	res.locals.error = req.app.get('env') 
			=== 'development' ? err : {}; 

	// render the error page 
	res.status(err.status || 500); 
	res.render('error'); 
}); 


// start listening with socket.io
io.on('connection', function(socket){  
    console.log('a user connected');
});


// start listening with socket.io
io.emit('users',{  
	id: "kone"
});



module.exports = { app: app, server: server }; 
