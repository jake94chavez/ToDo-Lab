var express = require('express');
var router = express.Router();
var Todo = require('../models');
var mongoose = require('mongoose')
var db = require('../models')
mongoose.connect('mongodb://localhost/todo-app');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'To-do List', Todo: Todo, db: db });
});

module.exports = router;
