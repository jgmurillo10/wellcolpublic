var express = require('express');
var users   = require('../../../data').users;
var query   = require('pg-query');

var router = express.Router();

// on routes that end in /users
// ----------------------------------------------------
router.route('/')

  // get all users
  .get(function(req, res) {

    var sql = 'select * from users';

    query(sql, [], function(err, rows) {
      if (err) return res.send(err);

      res.json(rows);
    });
  })

  // create new user
  .post(function(req, res) {

    var sql = 'insert into users (name, user_type) values ($1, $2) returning id;';

    query(sql, [req.body.name, req.body.user_type], function(err, rows) {
      if (err) return res.send(err);

      var response = rows[0];
      response.message = 'User created.';

      res.json(response);
    });
  })

router.route('/:user_id')

  // get all users
  .get(function(req, res) {
    
    var sql = 'select * from users where id=$1';

    query(sql, [req.params.user_id], function(err, rows) {
      if (err) return res.send(err);

      var response = {};
      console.log(rows.length);

      if(rows.length === 0) {
        response.message = "There is no user with that id."
      } else {
        response.user = rows[0];
      }

      res.json(response);
    });

  })

  // create new user
  .put(function(req, res) {

    var id = req.params.user_id;
    var found = false;

    var i = 0;
    for (; i < users.length; i++) {
      if(users[i].id == id) {
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

    var sql = 'delete from users where id=$1 returning *';

    query(sql, [req.params.user_id], function(err, rows) {
      if (err) return res.send(err);

      var response = {};
      console.log(rows.length);

      if(rows.length === 0) {
        response.message = "There is no user with that id."
      } else {
        response.message = "User deleted.";
        response.user = rows[0];
      }

      res.json(response);
    });
  })

module.exports = router;