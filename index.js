const express = require("express");
const { Client } = require("pg");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const jsonParser = express.json();
const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));
app.get("/", function (request, response) {
  response.sendFile(path.join(publicPath, "index.html"));
});

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// client.connect();

app.get("/top10", function (request, response) {
  // //client.connect();
  // client.query(`SELECT id, username, total FROM result`, (err, res) => {
  //   if (err) response.sendStatus(400);
  //   response.json(res.rows);
  //   //client.end();
  // });
  const rows = [
    { id: 1, username: "name1", total: 100 },
    { id: 2, username: "name2", total: 50 },
    { id: 3, username: "name3", total: 150 },
  ];
  response.json(rows);
});

app.post("/add", jsonParser, function (request, response) {
  //client.connect();
  if (!request.body || !request.body.username || !request.body.total) return response.sendStatus(400);
  // const query = {
  //   text: "INSERT INTO result(username, total) VALUES($1, $2)",
  //   values: [request.body.username, request.body.total],
  // };
  // client.query(query, (err, res) => {
  //   if (err) response.sendStatus(400);
  //   response.sendStatus(200);
  //   //client.end();
  // });
  response.json(request.body);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
