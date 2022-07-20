import mysql from 'mysql';
import SQL from './_sql-base';

export default class MySQL extends SQL { 
  constructor(host, user, pass, database) {
    super();
    this.conn = mysql.createConnection({
      host,
      user,
      pass,
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

const db = new MySQL('localhost', 'root', '', 'password');

let select = db.select().from('test');