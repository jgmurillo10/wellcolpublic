var express = require('express');
var users    = require('../../../data').users;

var router = express.Router();

// on routes that end in /users
// ----------------------------------------------------
router.route('/')

  // get all users
  .get(function(req, res) {
    res.json(users);
  })

  // create new user
  .post(function(req, res) {

    var id = req.body.id;
    var exists = false;

    for (var i = 0; i < users.length; i++) {
      if(users[i].id === id) {
        exists = true;
        break;
      };
    }
    
    if(!exists) {
      // add user into users array
      users.push({
        'name': req.body.name,
        'status': req.body.status,
        'id': req.body.id
      });

      res.json('User created.');
    } else {
      res.json('There already is an user with that id.');
    }
  })

router.route('/:user_id')

  // get all users
  .get(function(req, res) {
    
    var id = req.params.user_id;
    var found = false;

    var i = 0;
    for (; i < users.length; i++) {
      if(users[i].id === id) {
        found = true;
        break;
      }
    }

    if(found) {
      res.json(users[i]);
    } else {
      res.json('There is not an user with that id.');
    }

  })

  // create new user
  .put(function(req, res) {

    var id = req.params.user_id;
    var found = false;

    var i = 0;
    for (; i < users.length; i++) {
      if(users[i].id === id) {
        found = true;
        break;
      };
    }
    
    if(found) {

      // update user data
      if(req.body.name) {
        users[i].name = req.body.name;
      }
      if(req.body.status) {
        users[i].status = req.body.status;
      }

      res.json('User updated.');
    } else {
      res.json('There is not an user with that id.');
    }
  })

  .delete(function(req, res) {

    var id = req.params.user_id;
    var found = false;

    var i = 0;
    for (; i < users.length; i++) {
      if(users[i].id === id) {
        found = true;
        break;
      };
    }
    
    if(found) {
      users.splice(i,1);

      res.json('User deleted.');
    } else {
      res.json('There is not an user with that id.');
    }
  })

module.exports = router;