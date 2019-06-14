const db = require('./conn.js');

class Daily {
    constructor(id){
        this.id = id;
    }

    static async addExpense(category, description, expense, timestamp, percentage, daily_id) {
        const query = `
        INSERT INTO daily
            (daily_category, description, daily_expense, daily_timestamp, percentage, daily_id)
        VALUES
            ('${category}', '${description}', ${expense}, '${timestamp}', ${percentage}, ${daily_id})`;
        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async clearExpense() {
        try {
            const response = await db.one(`
            delete from daily`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async addExpense2(category, description, expense, timestamp, history_id) {
        const query = `
        INSERT INTO history
            (history_category, description, history_expense, history_timestamp, history_id)
        VALUES
            ('${category}', '${description}', ${expense}, '${timestamp}', ${history_id})`;
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
            SELECT daily_category, description, daily_expense, daily_timestamp, percentage
            FROM daily
            where daily_id=${id}`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async getTotalDailyExpense(id) { //, timestamp)
        try {
            const response = await db.one(`
            SELECT sum (daily_expense) as total
            FROM daily
            where daily_id=${id}`);
            console.log("this is the response", response);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async getHistoryOfExpenses(id) {
        try {
            const response = await db.any(`
            select history_category, description, history_expense, history_timestamp
            from history
            where history_id=${id}`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async subtractFromBalance(expense, id) {
        try {
            const response = await db.one(`
            update budget
            set alloted_budget = alloted_budget - ${expense}
            where budget_id=${id}`);
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

    static async getTimestamp(id) {
        try {
            const response = await db.one(`
            select set_budget, timestamp, reset_time
            from budget_timestamp
            where reset_id=${id}`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async resetBudget(budget, id) {
        try {
            const response = await db.one(`
            update budget
            set alloted_budget=${budget}
            where budget_id=${id}`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async resetExpense() {

    }

}

module.exports = Daily;
