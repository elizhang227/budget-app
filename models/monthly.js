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

    static async getTotalDailyExpense() {
        try {
            const response = `
            SELECT sum (daily_expense) as total
            FROM daily`;
            return response;
        } catch(err) {
            return err.message
        }
    }

}

module.exports = Monthly;