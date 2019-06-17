const express = require('express'),
  router = express.Router(),
  userController = require('../controllers/users');

router.get('/', userController.homepage_get);
router.get('/login', userController.login_get);
router.get('/logout', userController.logout_get);
router.get('/signup', userController.signup_get);
router.get('/forgot-password', userController.forgot_password_get);
router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);

module.exports = router;
