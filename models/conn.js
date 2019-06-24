const pgp = require('pg-promise') ({
    query: e => {
        console.log('QUERY: ', e.query);
    }
})

const options = {
    host: 'localhost',
    database: 'budget_app',
    user: 'eli',
    password: 'password'
}

const db = pgp(options);

module.exports = db;
