import express from 'express';
const app = express();

const users = [
  { id: 1, name: 'Bobba', age: 34 },
  { id: 2, name: 'Ivan', age: 22 },
  { id: 3, name: 'Van', age: 24 },
  { id: 4, name: 'Karla', age: 42 },
  { id: 5, name: 'Antonia', age: 21 },
];

app.get('/', (request, response) => {
  response.send('Hello API! I hope this API has good documentation!');
});

app.get('/users', (request, response) => {
  const { name } = request.query;
  if (name) {
    const filteredUsers = users.filter((user) => user.name === name);
    response.json(filteredUsers);
  } else {
    response.json(users);
  }
});

app.get('/users/:id', (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  const user = users.find((user) => user.id === +id);
  response.json(user);
});

app.listen(8080, () => {
  // The server has started, what should it do now?
  console.log('Hello console, the server is now running.');
});
