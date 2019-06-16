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