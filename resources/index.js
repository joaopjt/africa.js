import MySQL from './api/mysql';
import MariaDB from './api/mariadb';
import PostgreSQL from './api/postgresql';
import SQLite from './api/sqlite';
import SQLServer from './api/sqlserver';

export default class Africa {
  constructor(space) {
    this.collumn_string = '';
  }

  spacer() {
    if (this.collumn_string) this.collumn_string += ' ';
  }

  int() {
    this.spacer();
    this.collumn_string += 'int';

    return this;
  }

  varchar(size) {
    this.spacer();
    this.collumn_string += `varchar(${size})`;

    return this;
  }

  null(null = true) {
    this.spacer();
    if (!null) this.collumn_string += 'NOT ';

    this.collumn_string += `NULL`;

    return this;
  }

  primary_key() {
    this.spacer();
    this.collumn_string += 'PRIMARY KEY';

    return this;
  }
}

export MySQL;
export MariaDB;
export PostgreSQL;
export SQLite;
export SQLServer;
