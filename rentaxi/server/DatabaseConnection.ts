import mysql from 'mysql';
require('dotenv').config();

class DatabaseConnection {
  pool: any;
  isLocalMode : boolean = true;

  constructor() {
    this.pool = this.isLocalMode ? 
    mysql.createPool({
      host: process.env.DB_HOST_LOCAL,
      user: process.env.DB_USER_LOCAL,
      password: process.env.DB_PASSWORD_LOCAL,
      database: process.env.DB_DATABASE_LOCAL
    }) 
    : 
    mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE_DB
    });
  }

  query(sql:string, params:any) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err:any, result:any) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async performQuery(sql: string, params: any = []) {
    try {
        const result = await this.query(sql, params);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

}

export default DatabaseConnection;