const db = require('./conn.js');

class User {
  constructor(id, first_name, last_name, email, password){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }

  static async getAllUsers() {
    try {
        const response = await db.any(`SELECT * FROM users`);
        return response;
    } catch(err) {
        return err.message
    }
  }

  async createUser() {
    try {
        const response = await db.one(`
        INSERT INTO users
            (first_name, last_name, email, password)
        VALUES
            ($1, $2, $3, $4)
        returning id`, [this.first_name, this.last_name, this.email, this.password]); // references $1, $2, $3, $4 $ = interpolation 1,2,3,4 = placeholder
        return response;
    } catch(err) {
        return err.message
    }
  }

  async getUserByEmail() {
    try {
        const response = await db.one(`
        SELECT id, first_name, last_name, password, email
            FROM users
        WHERE email = $1`, [this.email]);
        return response;
    } catch(err) {
        return err.message;
    }
  }

  async emailExists() {
    try {
        const response = await db.one(`SELECT email FROM users WHERE email = $1`, [this.email]);
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

  static async budgetExists(id) {
    try {
      const response = await db.one(`
      SELECT alloted_budget
      FROM budget
      WHERE budget_id=${id}`);
      console.log("this is the response of budget", response);
      return response;
    } catch(err) {
      return err.message;
    }
  }

}

module.exports = User;
