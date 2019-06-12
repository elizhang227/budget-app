const express = require('express'),
  router = express.Router(),
  UsersModel = require('../models/users');

router.get('/', async (req, res, next) => {
  const allUsers = await UsersModel.getAllUsers();
  res.render('template', {
    locals: {
      title: 'User Page',
      userList: allUsers
    },
    partials: {
      content: 'partial-users',
    }
  });
});

router.get('/login', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'Login Page',
    },
    partials: {
      content: 'partial-login-form',
    }
  });
});

module.exports = router;
