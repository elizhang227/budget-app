const express = require('express'),
    router = express.Router(),
    dailyController = require('../controllers/daily');

router.get('/', dailyController.homepage_get);
router.get('/expenses', dailyController.expenses_get);
router.get('/history', dailyController.history_get);
router.get('/expenses/:category', dailyController.expenses_by_category_get);
router.post('/expenses', dailyController.weekly_expenses_get);

module.exports = router;
