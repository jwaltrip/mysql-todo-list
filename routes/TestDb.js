const express = require("express");
const router = express.Router();

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
  // return all rows from mysql db 'todos' table
  return rows;
};

router.get("/todos", async (req, res) => {
  try {
    const allTodos = await getTodos();
    console.log(allTodos);
    
    return res.send(allTodos);
  } catch (e) {
    console.error(e.stack);
    
    return res.sendStatus(400).send(e);
  }
});

module.exports = router;
