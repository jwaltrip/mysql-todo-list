const express = require("express");
const router = express.Router();

// TODO - add better error handling throughout this file
// TODO - split this code up into different files

// async function to get all todos from the mysql db
const getTodos = async () => {
  // get the client
  const mysql = require("mysql2/promise");
  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB_NAME
  });
  // query database
  const [rows, fields] = await connection.execute("SELECT * FROM `todos`");
  // end connection
  await connection.end();
  // return all rows from mysql db 'todos' table
  return rows;
};

// GET route to get array of all todo objects in SQL db
router.get("/todos", async (req, res) => {
  try {
    const allTodos = await getTodos();
    console.log(allTodos);

    return res.send(allTodos);
  } catch (e) {
    console.error(e.stack);

    return res.sendStatus(400);
  }
});

// async function to ADD a todo to the mysql db
const addTodo = async todoText => {
  // get the client
  const mysql = require("mysql2/promise");
  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB_NAME
  });
  // query database
  const query = await connection.execute(
    "INSERT INTO `todos`(`todoText`, `isActive`) VALUES (?, '1')",
    [todoText]
  );
  // end connection
  await connection.end();
  // return all rows from mysql db 'todos' table
  return query;
};

// POST route to add a todo to SQL db
router.post("/todos/add", async (req, res) => {
  try {
    const insertQuery = await addTodo(req.body.todoText);
    console.log(insertQuery);

    return res.send(insertQuery);
  } catch (e) {
    console.error(e);

    return res.sendStatus(400);
  }
});


// async function to REMOVE a todo to the mysql db
// this actually doesn't delete the todo from the db
// but sets the isActive boolean to false
const removeTodo = async (id) => {
  // get the client
  const mysql = require("mysql2/promise");
  // create the connection
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB_NAME
  });
  // query database
  const query = await connection.execute(
    "UPDATE `todos` SET `isActive` = '0' WHERE `todos`.`id` = ?",
    [id]
  );
  // end connection
  await connection.end();
  // return all rows from mysql db 'todos' table
  return query;
};

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
