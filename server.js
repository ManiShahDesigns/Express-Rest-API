
// Packages
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const uuid = require('uuid');

// Configure Express
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Data
let todos = [];

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Post
app.post('/todo', (req, res) => {
    let todo = req.body;
    todo = { ...todo, id: uuid.v4() }

    if (todo.title === '') {
        res.send('Todo cannot be empty. Don\'t be lazy! Go back and add something.')
        return;
    }

    todos.push(todo)
    res.redirect('/')
})

// Send All Todos
app.get('/todos', (req, res) => {
    res.json(todos)
})

// Delete Todo
app.delete('/todos/delete/:id', (req, res) => {
    todos = todos.filter(todo => todo.id !== req.params.id)
    res.send('Deleted Todo')
})

// Update Todo
app.post('/todos/edit/:id', (req, res) => {
    let todo = req.body;

    updatedTodo = { 'title': todo.title, id: req.params.id };

    todos = todos.filter(todo => todo.id !== req.params.id)

    todos.push(updatedTodo)

    res.redirect('/')
})

// Server running...
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})