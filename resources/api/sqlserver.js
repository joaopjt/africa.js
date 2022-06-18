import mssql from 'mssql';

export default class SQLServer { 
  constructor(server, user, pass, database) {
    this.table = '';
    this.collums = '*';
    this.where = ``;
    this.query_string = `SELECT ${this.collumns} FROM ${this.table}`;

    this.connect();
  }

  connect() {
    async () => {
      try {
        await sql.connect(`Server=${server},1433;Database=${database};User Id=${user};Password=${pass};Encrypt=true`);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  async query() {
    const result = await sql.query(this.query_string);
    return result;
  }

  select(collumns) {
    if (collumns) this.collums = collumns;

    return this;
  }

  from(table) {
    if (!table) throw new Error('Expected table name but none was given.');

    this.table = table;

    return this;
  }

  where(query) {
    let conditions = '';
    const where = ` WHERE ${conditions}`;

    Object.keys(query).forEach((key, operator, value) => {
      conditions += `${key} ${operator} ${value}, `;
    });

    this.query_string += where;

    return this || this.query();
  }

  join(table, object) {
    let relationship = '';
    const join = ` INNER JOIN ${table} ON ${relationship}`;

    Object.keys(object).forEach((key, value) => {
      relationship += `${this.table}.${key} = ${table}.${value}`;
    });

    this.query_string += join;

    return this || this.query();
  }

  left_join(table, object) {
    let relationship = '';
    const join = ` LEFT JOIN ${table} ON ${relationship}`;

    Object.keys(object).forEach((key, value) => {
      relationship += `${this.table}.${key} = ${table}.${value}`;
    });

    this.query_string += join;

    return this || this.query();
  }

  right_join(table, object) {
    let relationship = '';
    const join = ` RIGHT JOIN ${table} ON ${relationship}`;

    Object.keys(object).forEach((key, value) => {
      relationship += `${this.table}.${key} = ${table}.${value}`;
    });

    this.query_string += join;

    return this || this.query();
  }

  outer_join(table, object) {
    let relationship = '';
    const join = ` OUTER FULL JOIN ${table} ON ${relationship}`;

    Object.keys(object).forEach((key, value) => {
      relationship += `${this.table}.${key} = ${table}.${value}`;
    });

    this.query_string += join;

    return this || this.query();
  }
}