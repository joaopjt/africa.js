import mssql from 'mssql';
import SQL from './_sql-default';

export default class SQLServer extends SQL { 
  constructor(server, user, pass, database) {
    super();
    this.table = '';
    this.collums = '*';
    this.where = ``;
    this.query_string = `SELECT ${this.collumns} FROM ${this.table}`;

    this.connect(server, database, user, pass);
  }

  connect(server, database, user, pass) {
    async () => {
      try {
        await sql.connect(`Server=${server},1433;Database=${database};User Id=${user};Password=${pass};Encrypt=true`);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  async query() {
    let result = '';

    try {
      result = await sql.query(this.query_string);
    } catch (err) {
      throw err;
    }

    return result;
  }
}