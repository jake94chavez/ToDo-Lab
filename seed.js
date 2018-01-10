var db = require('./models');

var todos_list = [
	{
		task: 'Make a todo list',
		description: 'Create a functional to do list with a database'
	}
];

db.Todo.remove({}, function(err, todos){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all todos');

    // create new records based on the array todos_list
    db.Todo.create(todos_list, function(err, todos){
      if (err) { return console.log('err', err); }
      console.log("created", todos.length, "todos");
      process.exit();
    });
  }
});