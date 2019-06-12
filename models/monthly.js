const db = require('./conn.js');

class Monthly {
    constructor(id){
        this.id = id;
    }

    static async addExpense(category, expense) {
        const query = `
        INSERT INTO daily
            (daily_category, daily_expense)
        VALUES
            ('${category}', ${expense})`;
        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            return err.message;
        }
    }

}

module.exports = Monthly;