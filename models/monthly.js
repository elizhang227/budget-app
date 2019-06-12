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
            const response = await db.one(`
            SELECT sum (daily_expense) as total
            FROM daily`);
            console.log("this is the response", response);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async subtractFromBalance(expense) {
        try {
            const response = await db.one(`
            update budget
            set alloted_budget = alloted_budget - ${expense}`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getRemainingBalance() {
        try {
            const response = await db.one(`
            select alloted_budget
            from budget`);
            return response;
        } catch(err) {
            return err.message
        }
    }

}

module.exports = Monthly;