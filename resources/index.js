import MySQL from './api/mysql';
import MariaDB from './api/mariadb';
import PostgreSQL from './api/postgre';
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

  char(size) {
    this.spacer();
    this.collumn_string += `char(${size})`;

    return this;
  }

  varchar(size = 255) {
    this.spacer();
    this.collumn_string += `varchar(${size})`;

    return this;
  }

  binary(size) {
    this.spacer();
    this.collumn_string += `BINARY(${size})`;

    return this;
  }

  varbinary(size) {
    this.spacer();
    this.collumn_string += `VARBINARY(${size})`;

    return this;
  }

  tinyblob() {
    this.spacer();
    this.collumn_string += `TINYBLOB`;

    return this;
  }

  tinytext() {
    this.spacer();
    this.collumn_string += `TINYTEXT`;

    return this;
  }

  tinyint() {
    this.spacer();
    this.collumn_string += `TINYINT`;

    return this;
  }

  bool() {
    this.spacer();
    this.collumn_string += `BOOL`;

    return this;
  }

  boolean() {
    this.spacer();
    this.collumn_string += `BOOLEAN`;

    return this;
  }

  smallint(size) {
    this.spacer();
    this.collumn_string += `SMALLINT(${size})`;

    return this;
  }

  mediumint(size) {
    this.spacer();
    this.collumn_string += `MEDIUMINT(${size})`;

    return this;
  }

  int(size) {
    this.spacer();
    this.collumn_string += `INT(${size})`;

    return this;
  }

  integer(size) {
    this.spacer();
    this.collumn_string += `INTEGER(${size})`;

    return this;
  }

  bigint(size) {
    this.spacer();
    this.collumn_string += `BIGINT(${size})`;

    return this;
  }

  float(size, d) {
    this.spacer();
    this.collumn_string += `FLOAT(${size}, ${d})`;

    return this;
  }

  double(size, d) {
    this.spacer();
    this.collumn_string += `DOUBLE(${size}, ${d})`;

    return this;
  }

  double_precision(size, d) {
    this.spacer();
    this.collumn_string += `DOUBLE PRECISION(${size}, ${d})`;

    return this;
  }

  decimal(size, d) {
    this.spacer();
    this.collumn_string += `DECIMAL(${size}, ${d})`;

    return this;
  }

  text() {
    this.spacer();
    this.collumn_string += `TEXT`;

    return this;
  }

  bit(size) {
    this.spacer();
    this.collumn_string += `BIT(${size})`;

    return this;
  }

  blob(size) {
    this.spacer();
    this.collumn_string += `BLOB(${size})`;

    return this;
  }

  mediumtext(size) {
    this.spacer();
    this.collumn_string += `MEDIUMTEXT`;

    return this;
  }

  mediumblob(size) {
    this.spacer();
    this.collumn_string += `MEDIUMBLOB`;

    return this;
  }

  longtext() {
    this.spacer();
    this.collumn_string += `LONGTEXT`;

    return this;
  }

  longblob() {
    this.spacer();
    this.collumn_string += `LONGBLOB`;

    return this;
  }

  enum(list) {
    this.spacer();
    this.collumn_string += `ENUM(${list})`;

    return this;
  }

  set(list) {
    this.spacer();
    this.collumn_string += `SET(${list})`;

    return this;
  }

  null(n = true) {
    this.spacer();
    if (!n) this.collumn_string += 'NOT ';

    this.collumn_string += `NULL`;

    return this;
  }

  primary_key() {
    this.spacer();
    this.collumn_string += 'PRIMARY KEY';

    return this;
  }

  date() {
    this.spacer();
    this.collumn_string += 'DATE';

    return this;
  }

  datetime(format) {
    this.spacer();
    this.collumn_string += `DATETIME(${format})`;

    return this;
  }

  timestamp(format) {
    this.spacer();
    this.collumn_string += `TIMESTAMP(${format})`;

    return this;
  }

  time(format) {
    this.spacer();
    this.collumn_string += `TIME(${format})`;

    return this;
  }

  year() {
    this.spacer();
    this.collumn_string += `YEAR`;

    return this;
  }
}

export { MySQL, MariaDB, PostgreSQL, SQLite, SQLServer };
