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
apiRouter.use('/fields', require('./wells'));
apiRouter.use('/fields', require('./sensors'));
apiRouter.use('/users', require('./users'));
apiRouter.use('/emergencies', require('./emergencies'));
apiRouter.use('/reports', require('./reports'));
apiRouter.use('/zones', require('./zones'));
module.exports = apiRouter;
