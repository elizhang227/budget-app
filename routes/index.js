var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('template', {
    locals: {
      title: 'Home Page',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      content: 'partial-index',
    }
  });
});

module.exports = router;
