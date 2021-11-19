const express = require('express');
const { Client } = require('pg');
const path = require('path');
const PORT = process.env.PORT || 5000;
const publicPath = path.join(__dirname, 'public');

const app = express();
app.use(express.static(publicPath));
app.use(express.json());

app.get('/', function (request, response) {
  response.sendFile(path.join(publicPath, 'index.html'));
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

app.get('/top10', function (request, response) {
  client.query(
    'select id, username, total from results order by total DESC LIMIT 10',
    (err, res) => {
      if (err) response.sendStatus(400);
      response.json(res.rows);
    }
  );
  // const rows = [
  //   { id: 1, username: "name1", total: 100 },
  //   { id: 2, username: "name2", total: 50 },
  //   { id: 3, username: "name3", total: 10 },
  //   { id: 4, username: "name4", total: 110 },
  //   { id: 5, username: "name7", total: 30 },
  //   { id: 6, username: "name6", total: 15 },
  //   { id: 7, username: "name5", total: 240 },
  //   { id: 8, username: "name8", total: 5 },
  //   { id: 9, username: "name10", total: 120 },
  //   { id: 10, username: "name9", total: 101 },
  // ];
  // response.json(rows);
});

app.post('/add', function (request, response) {
  if (!request.body || !request.body.username || !request.body.total)
    return response.sendStatus(400);
  const query = {
    text: 'INSERT INTO results(username, total) VALUES($1, $2)',
    values: [request.body.username, request.body.total],
  };
  client.query(query, (err, res) => {
    if (err) response.sendStatus(400);
    response.sendStatus(200);
  });
  // response.json(request.body);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
