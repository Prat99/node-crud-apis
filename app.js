const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
const routes = require('./routes/routes');

app.use(routes);


app.listen(3002, (req, res) => {
   console.log('server is running on port 3002');
});


