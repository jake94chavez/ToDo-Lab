var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo-app");

module.exports.Todo = require("./todo.js");