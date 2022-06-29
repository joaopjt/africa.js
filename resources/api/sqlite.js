import { open } from 'sqlite';
import sqlite from 'sqlite3';

export default class SQLite { 
  constructor(database_filename) {
    this.table = '';
    this.collums = '*';
    this.where = ``;
    this.query_string = `SELECT ${this.collumns} FROM ${this.table}`;

    this.db = null;
    this.connect();
  }

  async connect() {
    this.db = await open({ filename: database_filename, driver: sqlite.Database });
  }

  async query() {
    return await this.db.exec(this.query_string);
  }

  select(collumns) {
    if (collumns) this.collums = collumns;

    return this;
  }

  create(table_name, collums_object) {
    let collumns = '';
    if (!table_name) throw new Error('Expected table name but none was given.');

    collumns_object.forEach((collumn, collumn_type) => {
      collumns += `${collumn} ${collumn_type},`;
    });

    this.query_string = `CREATE TABLE ${table_name} (${collumns})`;

    return this.query();
  }

  drop(table_name) {
    if (!table_name) throw new Error('Expected table name but none was given.');

    this.query_string = `DROP TABLE ${table_name}`;

    return this.query();
  }

  delete(table_name) {
    if (collumns) this.collums = collumns;

    this.query_string = `DELETE FROM ${table_name}`;

    return this || this.query();
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

    return this;
  }

  left_join(table, object) {
    let relationship = '';
    const join = ` LEFT JOIN ${table} ON ${relationship}`;

    Object.keys(object).forEach((key, value) => {
      relationship += `${this.table}.${key} = ${table}.${value}`;
    });

    this.query_string += join;

    return this;
  }

  right_join(table, object) {
    let relationship = '';
    const join = ` RIGHT JOIN ${table} ON ${relationship}`;

    Object.keys(object).forEach((key, value) => {
      relationship += `${this.table}.${key} = ${table}.${value}`;
    });

    this.query_string += join;

    return this;
  }

  outer_join(table, object) {
    let relationship = '';
    const join = ` OUTER FULL JOIN ${table} ON ${relationship}`;

    Object.keys(object).forEach((key, value) => {
      relationship += `${this.table}.${key} = ${table}.${value}`;
    });

    this.query_string += join;

    return this;
  }
}