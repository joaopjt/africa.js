import mysql from 'mysql2/promise';
import SQL from './_sql-base';

export default class MySQL extends SQL { 
  constructor(host, user, password, database) {
    super();
    this.config = {
      host,
      user,
      password,
      database
    };
  }

  async query() {
    let results = null;

    this.conn = await mysql.createConnection(this.config);

    results = await this.conn.query(this.query_string);

    this.query_string = ``;

    return results[0];
  }
}