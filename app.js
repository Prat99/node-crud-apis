const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');


app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
   // these headers help to communicate servers on diff domain.
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
   // this header helps to allow set header from client side and their type.
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
})

app.use(routes);
console.log('process', process.env.user);
console.log('process', process.env.userId);


app.listen(3002, (req, res) => {
   console.log('server is running on port 3002');
});


