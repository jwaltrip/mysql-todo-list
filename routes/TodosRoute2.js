const express = require("express");
const router = express.Router();
const Todo = require("../models/TodoModel");

// TODO - add better error handling throughout this file
// TODO - split this code up into different files

//Generic Error Handler
const errHandler = err => {
  //Catch and log any error.
  console.error("Error: ", err);
};

// async function to get all todos from the mysql db
const getTodos = async () => {
  return await Todo.findAll();
}

// GET route to get array of all todo objects in SQL db
router.get("/todos", async (req, res) => {
  try {
    const allTodos = await getTodos();
    console.log(allTodos);

    return res.send(allTodos);
  } catch (e) {
    console.error("Error: ", e);

    return res.sendStatus(400);
  }
});

// async function to ADD a todo to the mysql db
const addTodo = async (todoText) => {
  //create returns a promise which gets resolved to the user instance
  //We also use await, you can use standard then callback.
  const todo = await Todo.create({
    todoText,
    isActive: 1
  });
  
  return todo;
}

// POST route to add a todo to SQL db
router.post("/todos/add", async (req, res) => {
  try {
    const insertQuery = await addTodo(req.body.todoText);
    console.log(insertQuery);

    return res.send(insertQuery);
  } catch (e) {
    console.error("Error: ", e);

    return res.sendStatus(400);
  }
});


// async function to REMOVE a todo to the mysql db
// this actually doesn't delete the todo from the db
// but sets the isActive boolean to false
const removeTodo = async (id) => {
  const todo = Todo.update({ isActive: 0 }, {
    where: { id: parseInt(id, 10) }
  })
  
  return todo;
}

// POST route to remove task from DB
router.post("/todos/remove", async (req, res) => {
  try {
    const query = await removeTodo(req.body.id);
    console.log(`remove todo query: ${query}`)
    
    return res.send(query)
  } catch (e) {
    console.error(`remove todo error: ${e}`)
    
    return res.sendStatus(400)
  }
})

module.exports = router;
