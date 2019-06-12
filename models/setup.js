const db = require('./conn.js');

class Setup {
    constructor(id) {
        this.id = id;
    }

    static async setBudget(budget) {
        try {
            const response = await db.one(`
            INSERT INTO budget
                (alloted_budget)
            VALUES
                (${budget})
            `);
            return response;
        } catch(err) {
            return err.message
        }
    }

}

module.exports = Setup;