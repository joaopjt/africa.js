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
    let result = null;
    let sql = mssql.connect(this.config);

    try {
      result = await sql.query(this.query_string);
    } catch (err) {
      throw err;
    }

    this.query_string = ``;
    return result;
  }

  async [Symbol.chainEnd]() {
    return await this.query();
  }
}
