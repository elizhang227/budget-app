const db = require('./conn.js');

class Setup {
    constructor(id) {
        this.id = id;
    }

    static async setBudget(budget, budget_id) {
        try {
            const response = await db.one(`
            INSERT INTO budget
                (alloted_budget, budget_id)
            VALUES
                (${budget}, ${budget_id})
            `);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getUser(email) {
        try {
            const response = await db.one(`
            select id 
            from users 
            where email='${email}'`);
            return response;
        } catch(err) {
            return err.message
        }
    }

}

module.exports = Setup;