import "core-js/stable";
import "regenerator-runtime/runtime";

import MySQL from './api/mysql';
import MariaDB from './api/mariadb';
import PostgreSQL from './api/postgre';
import SQLite from './api/sqlite';
import SQLServer from './api/sqlserver';

class Africa {
  constructor() {
    this.string = '';
  }

  static spacer() {
    if (this.string) this.string += ' ';
  }

  static char(size) {
    this.spacer();
    this.string += `CHAR(${size})`;

    return this.string || this;
  }

  static varchar(size = 255) {
    this.spacer();
    this.string += `VARCHAR(${size})`;

    return this.string || this;
  }

  static binary(size) {
    this.spacer();
    this.string += `BINARY(${size})`;

    return this.string || this;
  }

  static varbinary(size) {
    this.spacer();
    this.string += `VARBINARY(${size})`;

    return this.string || this;
  }

  static tinyblob() {
    this.spacer();
    this.string += `TINYBLOB`;

    return this.string || this;
  }

  static tinytext() {
    this.spacer();
    this.string += `TINYTEXT`;

    return this.string || this;
  }

  static tinyint() {
    this.spacer();
    this.string += `TINYINT`;

    return this.string || this;
  }

  static bool() {
    this.spacer();
    this.string += `BOOL`;

    return this.string || this;
  }

  static boolean() {
    this.spacer();
    this.string += `BOOLEAN`;

    return this.string || this;
  }

  static smallint(size) {
    this.spacer();
    this.string += `SMALLINT(${size})`;

    return this.string || this;
  }

  static mediumint(size) {
    this.spacer();
    this.string += `MEDIUMINT(${size})`;

    return this.string || this;
  }

  static int(size) {
    this.spacer();
    this.string += `INT(${size})`;

    return this.string || this;
  }

  static integer(size) {
    this.spacer();
    this.string += `INTEGER(${size})`;

    return this.string || this;
  }

  static bigint(size) {
    this.spacer();
    this.string += `BIGINT(${size})`;

    return this.string || this;
  }

  static float(size, d) {
    this.spacer();
    this.string += `FLOAT(${size}, ${d})`;

    return this.string || this;
  }

  static double(size, d) {
    this.spacer();
    this.string += `DOUBLE(${size}, ${d})`;

    return this.string || this;
  }

  static double_precision(size, d) {
    this.spacer();
    this.string += `DOUBLE PRECISION(${size}, ${d})`;

    return this.string || this;
  }

  static decimal(size, d) {
    this.spacer();
    this.string += `DECIMAL(${size}, ${d})`;

    return this.string || this;
  }

  static text() {
    this.spacer();
    this.string += `TEXT`;

    return this.string || this;
  }

  static bit(size) {
    this.spacer();
    this.string += `BIT(${size})`;

    return this.string || this;
  }

  static blob(size) {
    this.spacer();
    this.string += `BLOB(${size})`;

    return this.string || this;
  }

  static mediumtext(size) {
    this.spacer();
    this.string += `MEDIUMTEXT`;

    return this.string || this;
  }

  static mediumblob(size) {
    this.spacer();
    this.string += `MEDIUMBLOB`;

    return this.string || this;
  }

  static longtext() {
    this.spacer();
    this.string += `LONGTEXT`;

    return this.string || this;
  }

  static longblob() {
    this.spacer();
    this.string += `LONGBLOB`;

    return this.string || this;
  }

  static enum(list) {
    this.spacer();
    this.string += `ENUM(${list})`;

    return this.string || this;
  }

  static set(list) {
    this.spacer();
    this.string += `SET(${list})`;

    return this.string || this;
  }

  static null(n = true) {
    this.spacer();
    if (!n) this.string += 'NOT ';

    this.string += `NULL`;

    return this.string || this;
  }

  static not_null() {
    this.spacer();

    this.string += `NOT NULL`;

    return this.string || this;
  }

  static primary_key() {
    this.spacer();
    this.string += 'PRIMARY KEY';

    return this.string || this;
  }

  static date() {
    this.spacer();
    this.string += 'DATE';

    return this.string || this;
  }

  static datetime(format) {
    this.spacer();
    this.string += `DATETIME(${format})`;

    return this.string || this;
  }

  static timestamp(format) {
    this.spacer();
    this.string += `TIMESTAMP(${format})`;

    return this.string || this;
  }

  static time(format) {
    this.spacer();
    this.string += `TIME(${format})`;

    return this.string || this;
  }

  static year() {
    this.spacer();
    this.string += `YEAR`;

    return this.string || this;
  }

  static auto_increment() {
    this.spacer();
    this.string += `AUTO_INCREMENT`;

    return this.string || this;
  }
};

export {
  Africa as default,
  MySQL,
  MariaDB,
  PostgreSQL,
  SQLite,
  SQLServer,
};
