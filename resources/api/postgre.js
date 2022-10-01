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
  }

  async query() {
    let results = null;
    this.client.connect();

    this.client.query(this.query_string)
      .then(res => {
        results = res;
      })
      .catch(err => { throw err });

    this.query_string = ``;
    this.client.release();

    return results;
  }
}