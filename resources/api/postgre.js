import { Client } from 'pg';
import SQL from './_sql-default';

export default class PostgreSQL extends SQL { 
  constructor(host, user, password, database) {
    super();
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

    this.client.connect();
  }

  query() {
    this.client.query(this.query_string)
      .then(res => {
        return res.rows[0];
      })
      .catch(err => { throw err });
  }
}