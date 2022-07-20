import mariadb from 'mariadb';
import SQL from './_sql-base';

export default class MariaDB extends SQL { 
  constructor(host, user) {
    super();

    this.pool = mariadb.createPool({
      host,
      user,
      connectionLimit: 1
    });

    this.conn = undefined;

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