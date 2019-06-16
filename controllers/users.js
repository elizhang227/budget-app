const bcrypt = require('bcryptjs'),
    UsersModel = require('../models/users');

exports.homepage_get = async (req, res) => {
    const allUsers = await UsersModel.getAllUsers();
    res.render('template', {
        locals: {
            title: 'User Page',
            userList: allUsers,
            is_logged_in: req.session.is_logged_in,
            userName: req.session.first_name,
            email: req.session.email
        },
        partials: {
            content: 'partial-users',
        }
    });
}

exports.signup_get = async (req, res) => {

}

exports.signup_get = async (req, res) => {

}

exports.signup_get = async (req, res) => {

}

exports.signup_get = async (req, res) => {

}

exports.signup_get = async (req, res) => {

}