var express = require('express');

// create a new Router
var apiRouter = express.Router();

// test route to make sure everything is working 
apiRouter.get('/', function(req, res) {
  res.json({
    message: 'Welcome to our API.'
  }); 
});

// set subroutes on the other files
apiRouter.use('/fields', require('./fields'));
apiRouter.use('/wells', require('./wells'));
apiRouter.use('/sensors', require('./sensors'));
apiRouter.use('/users', require('./users'));
apiRouter.use('/emergencies', require('./emergencies'));
apiRouter.use('/reports', require('./reports'));
apiRouter.use('/regions', require('./regions'));
apiRouter.use('/records', require('./records'));
module.exports = apiRouter;
