const express = require("express");
const pg = require("pg");

const app = express();

// TODO: add SQL database
// - create database
// - create table(s)

// TODO: tasks
// - create task, as a user
// - get all user's tasks

/*
* Database node-postgres
*/


const { Pool } = pg;

const pool = new Pool({
    idleTimeoutMillis: 30000,
    connectionString: "postgres://default:F2uKehXtTqa3@ep-rapid-recipe-a4rrm165-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  })

/** queries */
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

/*
* Data
*/

let tasks = [
  {
    id: "1",
    title: "Discussion Post",
    dueDate: "2022-12-01",
    complete: false,
  },
  {
    id: "2",
    title: "Project Presentation",
    dueDate: "2022-12-05",
    complete: true,
  },
];

/*
* Middleware
*/
app.use(express.json());
app.use(requestLogger);

/*
* Routes
*/
app.get("/api/tasks", (request, response) => {
  response.json(tasks);
});

app.get("/api/tasks/:id", (request, response) => {
  const id = request.params.id;
  const task = tasks.find((task) => task.id === id);

  if (task) {
    response.json(task);
  } else {
    response.status(404).end();
  }
});

app.get("/api/users", getUsers);

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/tasks", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const task = {
    title: body.title,
    complete: Boolean(body.complete) || false,
    id: generateId(),
  };

  tasks = tasks.concat(task);

  response.json(task);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
