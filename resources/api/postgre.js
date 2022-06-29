import { Client } from 'pg';

export default class MySQL { 
  constructor(host, user, pass, database) {
    this.table = '';
    this.collums = '*';
    this.where = ``;
    this.query_string = `SELECT ${this.collumns} FROM ${this.table}`;

    this.client = new Client({
        host,
        user,
        password,
        database
    });

    this.client.connect()
  }

  query() {
    this.client.query(this.query_string, (error, results) => {
      this.client.end();

      if (error) throw error;

      return results;
    });
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