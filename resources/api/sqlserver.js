import mssql from 'mssql';
import SQL from './_sql-base';

const pool = {
  max: 10,
  min: 0,
  idleTimeoutMillis: 1000
};

export default class SQLServer extends SQL { 
  constructor(server, user, pass, database, pool = pool) {
    super();
    this.config = {
      server,
      user,
      pass,
      database,
      pool
    };
  }

  async query() {
    let sql = mssql.connect(this.config);
    let result = null;

    try {
      result = await sql.query(this.query_string);
    } catch (err) {
      throw err;
    }

    return result;
  }
}