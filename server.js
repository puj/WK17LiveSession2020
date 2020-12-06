import express from "express";
const app = express();
const PORT = process.env.PORT || 8080;

const users = [
  { id: 3, name: "Bob", age: 34 },
  { id: 2, name: "Ivan", age: 22 },
  { id: 4, name: "Van", age: 34 },
  { id: 1, name: "Karl", age: 42 },
  { id: 0, name: "Anton", age: 21 },
];

app.get("/", (request, response) => {
  response.send("Welcome to our API");
});

app.get("/users", (request, response) => {
  const { name } = request.query;
  if (name) {
    const filteredUsers = users.filter((user) => user.name === name);
    response.json(filteredUsers);
  }
  response.json(users);
});

app.get("/users/:id", (request, response) => {
  const { id } = request.params;
  const user = users.find((user) => user.id === +id);
  response.json(user);
});

app.listen(PORT, () => {
  console.log("Hello console, the server is running");
});
