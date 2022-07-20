import { Client } from 'pg';
import SQL from './_sql-base';

export default class PostgreSQL extends SQL { 
  constructor(host, user, password, database) {
    super();

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