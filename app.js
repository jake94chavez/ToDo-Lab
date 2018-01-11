var db = require('./models')
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-app');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// get all todos
app.get('/api/todos', function todosIndex (req, res) {
	//find all todos in db
	db.Todo.find(function (err, todos) {
		if (err) {
			console.log('index error: ' + err);
			res.sendStatus(500);
		}
		res.json(todos);
	});
});

// get one todo
app.get('/api/todos/:id', function (req, res) {
	//get todo id from url params ('req.params')
	var todoId = req.params.id;

	//find todo in db by id
	db.Todo.findOne({ _id: todoId }, function (err, foundTodo) {
		res.json(foundTodo);
	});
});

// create new todo
app.post('/api/todos', function todosCreate(req, res) {
	// create new todo with form data ('req.body')
	var newTodo = new Todo(req.body);

	//save new todo in db
	newTodo.save(function handleDBTodoSaved(err, savedTodo) {
		res.json(savedTodo);
	});
});

// update todo
app.put('/api/todos/:id', function (req, res) {
	// get todo id from url params ('req.params')
	var todoId = req.params.id;

	//find todo in db by id
	Todo.findOne({ _id: todoId}, function (err, foundTodo) {
		//update the todo's attributes
		foundTodo.task = req.body.task;
		foundTodo.description = req.body.description;

		//save updated todo in db
		foundTodo.save(function (err, savedTodo) {
			res.json(savedTodo);
		});
	});
});

// delete todo
app.delete('/api.todos/:id', function (req, res) {
	//get todo id from url params ('req.params')
	var todoId = req.params.id;

	//find todo in db and remove
	Todo.findOneAndRemove({ _id: todoId }, function (err, deletedTodo) {
		res.json(deletedTodo);
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
