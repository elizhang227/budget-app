const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  userController = require('../controllers/users'),
  UsersModel = require('../models/users');

router.get('/', userController.homepage_get);

router.get('/login', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'Login Page',
      is_logged_in: req.session.is_logged_in,
      userName: req.session.first_name,
      email: req.session.email
    },
    partials: {
      content: 'partial-login-form',
    }
  });
});

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/signup', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'Signup Page',
      is_logged_in: req.session.is_logged_in,
      userName: req.session.first_name,
      email: req.session.email
    },
    partials: {
      content: 'partial-signup-form',
    }
  });
});

router.get('/forgot-password', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'Signup Page',
      is_logged_in: req.session.is_logged_in,
      userName: req.session.first_name,
      email: req.session.email
    },
    partials: {
      content: 'partial-forgot-password',
    }
  });
});

router.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Salt and hash our password!
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  // Creates a new user instance, with the sign up information
  const userInstance = new UsersModel(null, first_name, last_name, email, hash);
  let check = await userInstance.emailExists();
  if (typeof check === 'object') {
      res.redirect('/users/login');
  } else {
      await userInstance.createUser().then(response => {
          console.log("response is", response);
          res.redirect('/');
      }) .catch(err => err);
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userInstance = new UsersModel(null, null, null, email, password);

  const userData = await userInstance.getUserByEmail();

  const isValid = bcrypt.compareSync(password, userData.password);

  if (!!isValid) {
    req.session.is_logged_in = true;
    req.session.email = userData.email;
    req.session.first_name = userData.first_name;
    req.session.last_name = userData.last_name;
    req.session.user_id = userData.user_id;
    const id = await UsersModel.getUser(req.session.email);
    const check = await UsersModel.budgetExists(id.id);
    if(check.alloted_budget != null) {
      res.redirect('/daily/expenses');
    } else {
      res.redirect('/setup');
    }
  } else {
      res.redirect('/');
  }
})



module.exports = router;
