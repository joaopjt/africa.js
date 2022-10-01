import mysql from 'mysql';
import SQL from './_sql-base';

export default class MySQL extends SQL { 
  constructor(host, user, password, database) {
    super();
    this.conn = mysql.createPool({
      host,
      user,
      password,
      database
    });
  }

  async query() {
    let results = null;

    await this.conn.query(this.query_string, function (error, r, fields) {
      if (error) throw error;
  
      results = r;
    });

    this.query_string = ``;

    return results;
  }
}