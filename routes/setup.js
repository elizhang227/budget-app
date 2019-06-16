const express = require('express'),
    router = express.Router(),
    setupController = require('../controllers/setup');

router.get('/', setupController.homepage_get);
router.post('/', setupController.setup_post);

module.exports = router;
