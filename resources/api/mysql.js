import mysql from 'mysql';
import SQL from './_sql-base';

export default class MySQL extends SQL { 
  constructor(host, user, password, database) {
    super();
    this.conn = mysql.createConnection({
      host,
      user,
      password,
      database
    });

    this.conn.connect();
  }

  query() {
    this.conn.query(this.query_string, function (error, results, fields) {
      this.conn.end();

      if (error) throw error;

      return results;
    });
  }
}