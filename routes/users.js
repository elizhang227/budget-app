const express = require('express'),
  router = express.Router(),
  UsersModel = require('../models/users');

router.get('/', async (req, res, next) => {
  const allUsers = await UsersModel.getAllUsers();
  res.render('template', {
    locals: {
      title: 'User Page',
      userList: allUsers //array response from  our async request to the getAll() method
    },
    partials: {
      partial: 'partial-users',
    }
  });
});

module.exports = router;
