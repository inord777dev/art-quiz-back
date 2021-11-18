const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();

const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.get('/', function(request, response){
  response.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/top10', function(request, response){
  response.redirect('https://data.heroku.com/dataclips/jwlflqszgedmzgpymdmhivgaoifj.json');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
