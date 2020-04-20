var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser'); 
var cors = require('cors'); 
var mongoose = require('mongoose'); 
var PORT = 4000; 

var todoRoutes = express.Router(); 
//code below is bringing in the schema set in todo.model.js
let Todo = require('./todo.model'); 

app.use(cors()); 
app.use(bodyParser.json()); 

mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true}); 
var connection = mongoose.connection; 

connection.once('open', function(){
    console.log("MongoDB Database Connected");
})

//lines 24 - 79 are the end points to communicate with mongo

todoRoutes.route('/').get(function(req, res) {

    Todo.find(function(err, todos) {
        if (err){ 
            console.log(err); 
        
        } 
        else { 
            res.json(todos); 
        }
    });
});

//code below is getting the specific todo item by its ID within the DB
todoRoutes.route('/:id').get(function(req, res) {

    let id = req.params.id
    Todo.findById(id, function(err, todo) {

        res.json(todo); 
    });
});


todoRoutes.route('/add').post(function(req, res) {

    let todo = new Todo(req.body); 
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'}); 
        })

        .catch(err => {
            res.status(400).send('adding new todo failed'); 
        })
})

todoRoutes.route('/update/:id').post(function(req, res){
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found'); 
            //code below is what is going to update the todo task whenever they hit edit 
        else 
            todo.todo_description = req.body.todo_description; 
            todo.todo_responsible = req.body.todo_responsible; 
            todo.todo_priority = req.body.todo_priority; 
            todo.todo_completed = req.body.todo_completed; 

            todo.save().then(todo => {
                res.json('Todo Updated'); 
            })
            .catch(err => {
                res.status(400).send("Update Not Possible"); 
            });
    });
});



app.use('/todos', todoRoutes); 

app.listen(PORT, function(){

    console.log("Server Is Running on Port: " + PORT); 
});


