var express = require('express');
var router = express.Router();
var Todo = require('../models');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-app');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'To-do List' });
});

module.exports = router;
