import mariadb from 'mariadb';
import SQL from './_sql-default';

export default class MariaDB extends SQL { 
  constructor(host, user) {
    super();
    this.table = '';
    this.collums = '*';
    this.where = ``;
    this.query_string = `SELECT ${this.collumns} FROM ${this.table}`;

    this.pool = mariadb.createPool({
      host,
      user,
      connectionLimit: 1
    });
    this.conn = null;;

    this.connect();
  }

  async connect() {
    this.conn = await this.pool.getConnection();
  }

  async query() {
    let results = null;

    try {
      results = await this.conn.query(this.query_string);
    } catch(err) {
      throw err;
    }

    return results;
  }
}