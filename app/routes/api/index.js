var express = require('express');
var jwt     = require('jsonwebtoken');
var config  = require('../../../config');

var superSecret = config.secret;

// create a new Router
var apiRouter = express.Router();

// test route to make sure everything is working 
apiRouter.get('/', function(req, res) {
  res.json({
    message: 'Welcome to our API.'
  }); 
});


// route middleware to verify a token
var middleware = function(req, res, next) {
  // do logging
  console.log('Somebody just came to our app!');

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, superSecret, function(err, decoded) {      

      if (err) {

        console.log(err);

        res.status(403).send({ 
          success: false, 
          message: 'Failed to authenticate token.' 
        });      
      } else { 
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        console.log(decoded);
            
        next(); // make sure we go to the next routes and don't stop here
      }
    });

  } else {

    // if there is no token
    // return an HTTP response of 403 (access forbidden) and an error message
    res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
    });
    
  }
};

apiRouter.use('/users', require('./users'));

// set subroutes on the other files
apiRouter.use('/me', middleware, require('./me'));
apiRouter.use('/fields', middleware, require('./fields'));
apiRouter.use('/wells', middleware, require('./wells'));
apiRouter.use('/sensors', middleware, require('./sensors'));
apiRouter.use('/emergencies', middleware, require('./emergencies'));
apiRouter.use('/reports', middleware, require('./reports'));
apiRouter.use('/regions', middleware, require('./regions'));
apiRouter.use('/sensors', middleware, require('./records'));
module.exports = apiRouter;
