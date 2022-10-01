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

  static spacer() {
    if (this.value !== '') this.value += ' ';
  }

  static result() {
    return this.value;
  }

  static char(size = 1) {
    this.spacer();
    this.value += `CHAR(${size})`;

    return this || this.result();
  }

  static varchar(size = 255) {
    this.spacer();
    this.value += `VARCHAR(${size})`;

    return this || this.result();
  }

  static binary(size = 8000) {
    this.spacer();
    this.value += `BINARY(${size})`;

    return this || this.result();
  }

  static varbinary(size = 2000000000) {
    this.spacer();
    this.value += `VARBINARY(${size})`;

    return this || this.result();
  }

  static tinyblob() {
    this.spacer();
    this.value += `TINYBLOB`;

    return this || this.result();
  }

  static tinytext() {
    this.spacer();
    this.value += `TINYTEXT`;

    return this || this.result();
  }

  static tinyint() {
    this.spacer();
    this.value += `TINYINT`;

    return this || this.result();
  }

  static bool() {
    this.spacer();
    this.value += `BOOL`;

    return this || this.result();
  }

  static boolean() {
    this.spacer();
    this.value += `BOOLEAN`;

    return this || this.result();
  }

  static smallint(size = 5) {
    this.spacer();
    this.value += `SMALLINT(${size})`;

    return this || this.result();
  }

  static mediumint(size = 8) {
    this.spacer();
    this.value += `MEDIUMINT(${size})`;

    return this || this.result();
  }

  static int(size = 11) {
    this.spacer();
    this.value += `INT(${size})`;

    return this || this.result();
  }

  static integer(size = 11) {
    this.spacer();
    this.value += `INTEGER(${size})`;

    return this || this.result();
  }

  static bigint(size = 255) {
    this.spacer();
    this.value += `BIGINT(${size})`;

    return this || this.result();
  }

  static float(size = 23) {
    this.spacer();
    this.value += `FLOAT(${size})`;

    return this || this.result();
  }

  static double(size = 16, d = 4) {
    this.spacer();
    this.value += `DOUBLE(${size}
     ${d})`;

    return this || this.result();
  }

  static double_precision(size = 0, d = 0) {
    this.spacer();
    this.value += `DOUBLE PRECISION(${size}
     ${d})`;

    return this || this.result();
  }

  static decimal(size = 10, d = 0) {
    this.spacer();
    this.value += `DECIMAL(${size}
     ${d})`;

    return this || this.result();
  }

  static text() {
    this.spacer();
    this.value += `TEXT`;

    return this || this.result();
  }

  static bit(size = 1) {
    this.spacer();
    this.value += `BIT(${size})`;

    return this || this.result();
  }

  static blob(size = 65535) {
    this.spacer();
    this.value += `BLOB(${size})`;

    return this || this.result();
  }

  static mediumtext(size = 16777215) {
    this.spacer();
    this.value += `MEDIUMTEXT(${size})`;

    return this || this.result();
  }

  static mediumblob(size = 16777215) {
    this.spacer();
    this.value += `MEDIUMBLOB(${size})`;

    return this || this.result();
  }

  static longtext() {
    this.spacer();
    this.value += `LONGTEXT`;

    return this || this.result();
  }

  static longblob() {
    this.spacer();
    this.value += `LONGBLOB`;

    return this || this.result();
  }

  static enum(list) {
    this.spacer();
    this.value += `ENUM(${list})`;

    return this || this.result();
  }

  static set(list) {
    this.spacer();
    this.value += `SET(${list})`;

    return this || this.result();
  }

  static null(n = true) {
    this.spacer();
    if (!n) this.value += 'NOT ';

    this.value += `NULL`;

    return this || this.result();
  }

  static not_null() {
    this.spacer();

    this.value += `NOT NULL`;

    return this || this.result();
  }

  static primary_key() {
    this.spacer();
    this.value += 'PRIMARY KEY';

    return this || this.result();
  }

  static date() {
    this.spacer();
    this.value += 'DATE';

    return this || this.result();
  }

  static datetime(format = 'YYYY-MM-DD hh:mm:ss') {
    this.spacer();
    this.value += `DATETIME(${format})`;

    return this || this.result();
  }

  static timestamp(format = 'YYYY-MM-DD hh:mm:ss') {
    this.spacer();
    this.value += `TIMESTAMP(${format})`;

    return this || this.result();
  }

  static time(format = 'hh:mm:ss') {
    this.spacer();
    this.value += `TIME(${format})`;

    return this || this.result();
  }

  static year() {
    this.spacer();
    this.value += `YEAR`;

    return this || this.result();
  }

  static auto_increment() {
    this.spacer();
    this.value += `AUTO_INCREMENT`;

    return this || this.result();
  }

  static default(value) {
    this.spacer();
    this.value += (value) ? `DEFAULT ${value}` : `DEFAULT`;

    return this || this.result();
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
