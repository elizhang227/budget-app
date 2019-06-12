const db = require('./conn.js');

class Daily {
    constructor(id){
        this.id = id;
    }

    static async addExpense(category, description, expense, daily_id) {
        const query = `
        INSERT INTO daily
            (daily_category, description, daily_expense, daily_id)
        VALUES
            ('${category}', '${description}', ${expense}, ${daily_id})`;
        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async getListOfExpenses(id) {
        try {
            const response = await db.any(`
            SELECT daily_category, description, daily_expense
            FROM daily
            where daily_id=${id}`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async getTotalDailyExpense(id) {
        try {
            const response = await db.one(`
            SELECT sum (daily_expense) as total
            FROM daily
            where daily_id=${id}`);
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

    static async getRemainingBalance(id) {
        try {
            const response = await db.one(`
            select alloted_budget
            from budget
            where budget_id=${id}`);
            return response;
        } catch(err) {
            return err.message
        }
    }

}

module.exports = Daily;
