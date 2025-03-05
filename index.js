const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));  

app.use('/',express.static(path.join(__dirname, 'public')))

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('App running at http://localhost:3000');
});
