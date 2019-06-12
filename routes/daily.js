const express = require('express'),
    router = express.Router(),
    monthlyModel = require('../models/daily');
    //monthlyController = require('../controllers/monthly');

router.get('/', async function(req, res, next) {
    // const test = await monthlyModel.getTotalDailyExpense();
    // await monthlyModel.subtractFromBalance(test.total)
    // .then(async () => {
    //     // await monthlyModel.subtractFromBalance(test);
    //     const test2 = await monthlyModel.getRemainingBalance();

        res.render('template', {
            locals: {
                title: `Welcome to my dungeon`//${req.session.first_name}`,
                // expenseList: test,
                // balance: test2
                // booksList: allBooks,
                // is_logged_in: req.session.is_logged_in,
                // userName: req.session.first_name,
                // email: req.session.email
            },
            partials: {
                content: 'partial-home'
            }
        });
    })
    //console.log(test);

router.post('/', async function(req, res, next) {
    const { category, description, expense } = req.body;
    monthlyModel.addExpense(category, description, expense)
    .then(async () => {
        //res.redirect(`/daily`);
        const test = await monthlyModel.getTotalDailyExpense()
        await monthlyModel.subtractFromBalance(test.total)
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
                content: 'partial-daily'
            }
        });
    });
});

module.exports = router;