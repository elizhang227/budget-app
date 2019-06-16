const monthlyModel = require('../models/daily');

exports.homepage_get = async (req, res) => {
    if(!!req.session.is_logged_in) {
        const id = await monthlyModel.getUser(req.session.email);
        const balance = await monthlyModel.getRemainingBalance(id.id);
        res.render('template', {
            locals: {
                title: `Welcome to my dungeon`,
                balance: balance,
                is_logged_in: req.session.is_logged_in,
                userName: req.session.first_name,
                email: req.session.email
            },
            partials: {
                content: 'partial-daily-home'
            }
        });
    } else {
        res.redirect('/users/login');
    }
}