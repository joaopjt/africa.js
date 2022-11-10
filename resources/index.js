import "core-js/stable";
import "regenerator-runtime/runtime";

import MySQL from './api/mysql';
import MariaDB from './api/mariadb';
import PostgreSQL from './api/postgre';
import SQLite from './api/sqlite';
import SQLServer from './api/sqlserver';

class Africa {
  constructor() {
    this.value = ``;
  }

  spacer() {
    if (this.value !== '') this.value += ' ';
  }

  result() {
    return this.value;
  }

  char(size = 1) {
    this.spacer();
    this.value += `CHAR(${size})`;

    return this;
  }

  varchar(size = 255) {
    this.spacer();
    this.value += `VARCHAR(${size})`;

    return this;
  }

  binary(size = 8000) {
    this.spacer();
    this.value += `BINARY(${size})`;

    return this;
  }

  varbinary(size = 2000000000) {
    this.spacer();
    this.value += `VARBINARY(${size})`;

    return this;
  }

  tinyblob() {
    this.spacer();
    this.value += `TINYBLOB`;

    return this;
  }

  tinytext() {
    this.spacer();
    this.value += `TINYTEXT`;

    return this;
  }

  tinyint() {
    this.spacer();
    this.value += `TINYINT`;

    return this;
  }

  bool() {
    this.spacer();
    this.value += `BOOL`;

    return this;
  }

  boolean() {
    this.spacer();
    this.value += `BOOLEAN`;

    return this;
  }

  smallint(size = 5) {
    this.spacer();
    this.value += `SMALLINT(${size})`;

    return this;
  }

  mediumint(size = 8) {
    this.spacer();
    this.value += `MEDIUMINT(${size})`;

    return this;
  }

  int(size = 11) {
    this.spacer();
    this.value += `INT(${size})`;

    return this;
  }

  integer(size = 11) {
    this.spacer();
    this.value += `INTEGER(${size})`;

    return this;
  }

  bigint(size = 255) {
    this.spacer();
    this.value += `BIGINT(${size})`;

    return this;
  }

  float(size = 23) {
    this.spacer();
    this.value += `FLOAT(${size})`;

    return this;
  }

  double(size = 16, d = 4) {
    this.spacer();
    this.value += `DOUBLE(${size}
     ${d})`;

    return this;
  }

  double_precision(size = 0, d = 0) {
    this.spacer();
    this.value += `DOUBLE PRECISION(${size}
     ${d})`;

    return this;
  }

  decimal(size = 10, d = 0) {
    this.spacer();
    this.value += `DECIMAL(${size}
     ${d})`;

    return this;
  }

  text() {
    this.spacer();
    this.value += `TEXT`;

    return this;
  }

  bit(size = 1) {
    this.spacer();
    this.value += `BIT(${size})`;

    return this;
  }

  blob(size = 65535) {
    this.spacer();
    this.value += `BLOB(${size})`;

    return this;
  }

  mediumtext(size = 16777215) {
    this.spacer();
    this.value += `MEDIUMTEXT(${size})`;

    return this;
  }

  mediumblob(size = 16777215) {
    this.spacer();
    this.value += `MEDIUMBLOB(${size})`;

    return this;
  }

  longtext() {
    this.spacer();
    this.value += `LONGTEXT`;

    return this;
  }

  longblob() {
    this.spacer();
    this.value += `LONGBLOB`;

    return this;
  }

  enum(list) {
    this.spacer();
    this.value += `ENUM(${list})`;

    return this;
  }

  set(list) {
    this.spacer();
    this.value += `SET(${list})`;

    return this;
  }

  null(n = true) {
    this.spacer();
    if (!n) this.value += 'NOT ';

    this.value += `NULL`;

    return this;
  }

  not_null() {
    this.spacer();

    this.value += `NOT NULL`;

    return this;
  }

  primary_key() {
    this.spacer();
    this.value += 'PRIMARY KEY';

    return this;
  }

  date() {
    this.spacer();
    this.value += 'DATE';

    return this;
  }

  datetime(format = 'YYYY-MM-DD hh:mm:ss') {
    this.spacer();
    this.value += `DATETIME(${format})`;

    return this;
  }

  timestamp(format = 'YYYY-MM-DD hh:mm:ss') {
    this.spacer();
    this.value += `TIMESTAMP(${format})`;

    return this;
  }

  time(format = 'hh:mm:ss') {
    this.spacer();
    this.value += `TIME(${format})`;

    return this;
  }

  year() {
    this.spacer();
    this.value += `YEAR`;

    return this;
  }

  auto_increment() {
    this.spacer();
    this.value += `AUTO_INCREMENT`;

    return this;
  }

  default(value) {
    this.spacer();
    this.value += (value) ? `DEFAULT ${value}` : `DEFAULT`;

    return this;
  }

  [Symbol.chainEnd]() {
    return this.value;
  }
};

export {
  Africa,
  MySQL,
  MariaDB,
  PostgreSQL,
  SQLite,
  SQLServer
};
