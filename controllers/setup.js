const setupModel = require('../models/setup'),
    moment = require('moment');

exports.homepage_get = async (req, res) => {
    if(!!req.session.is_logged_in) {
        res.render('template', {
            locals: {
                title: `Welcome to my dungeon`,
                is_logged_in: req.session.is_logged_in,
                userName: req.session.first_name,
                email: req.session.email,
                date_day: moment().format('ll')
            },
            partials: {
                content: 'partial-setup'
            }
        })
    } else {
        res.redirect('/users/login');
    }
}

exports.setup_post = async (req, res) => {
    if(!!req.session.is_logged_in) {
        //if budget Exists then run updateBudget, else run setBudget
        const userID = await setupModel.getUser(req.session.email);
        const check = await setupModel.budgetExists(userID.id);
        const timestamp = await setupModel.timestampExists(userID.id);
        const date = moment().format('LLL');
        const refresh = moment().add(7, 'days').format('LLL');
        console.log(refresh);
        if (check.alloted_budget === null) { //they didnt set a budget
            console.log("why is this null?");
            const { budget } = req.body;
            setupModel.updateBudget(budget, userID.id)
            .then(() => {
                res.redirect('../daily/expenses');
            });
            if (timestamp.reset_time != null) {
                setupModel.updateBudgetTimestamp(budget, date, refresh, userID.id);
            } else if (timestamp.reset_time === null) {
                setupModel.updateBudgetTimestamp(budget, date, refresh, userID.id);
            } else if (typeof timestamp.reset_time != 'object') {
                setupModel.setBudgetTimestamp(budget, date, refresh, userID.id);
            }
        } else if (check.alloted_budget != null) {
            console.log("this is an object");
            const { budget } = req.body;
            setupModel.updateBudget(budget, userID.id)
            .then(() => {
                res.redirect('../daily/expenses');
            });
            if (timestamp.reset_time != null) {
                setupModel.updateBudgetTimestamp(budget, date, refresh, userID.id);
            } else if (timestamp.reset_time === null) {
                setupModel.updateBudgetTimestamp(budget, date, refresh, userID.id);
            } else if (typeof timestamp.reset_time != 'object') {
                setupModel.setBudgetTimestamp(budget, date, refresh, userID.id);
            }
        } else if (typeof check.alloted_budget != 'object') {
            console.log("this is not an object");
            const { budget } = req.body;
            setupModel.setBudget(budget, userID.id)
            .then(() => {
                res.redirect('../daily/expenses');
            })
            setupModel.setBudgetTimestamp(budget, date, refresh, userID.id);
        }
    }
}