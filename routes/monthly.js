const express = require('express'),
    router = express.Router(),
    monthlyModel = require('../models/monthly');
    //monthlyController = require('../controllers/monthly');

router.get('/', async function(req, res, next) {
    const test = await monthlyModel.getTotalDailyExpense();
    await monthlyModel.subtractFromBalance(test)
    .then(async () => {
        // await monthlyModel.subtractFromBalance(test);
        const test2 = await monthlyModel.getRemainingBalance();

        res.render('template', {
            locals: {
                title: `Welcome to my dungeon`,//${req.session.first_name}`,
                expenseList: test,
                balance: test2
                // booksList: allBooks,
                // is_logged_in: req.session.is_logged_in,
                // userName: req.session.first_name,
                // email: req.session.email
            },
            partials: {
                content: 'partial-monthly'
            }
        });
    })
    //console.log(test);

});

module.exports = router;