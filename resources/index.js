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

  static int() {
    this.spacer();
    this.string += 'int';

    return this || this.string;
  }

  static char(size) {
    this.spacer();
    this.string += `char(${size})`;

    return this || this.string;
  }

  static varchar(size = 255) {
    this.spacer();
    this.string += `varchar(${size})`;

    return this || this.string;
  }

  static binary(size) {
    this.spacer();
    this.string += `BINARY(${size})`;

    return this || this.string;
  }

  static varbinary(size) {
    this.spacer();
    this.string += `VARBINARY(${size})`;

    return this || this.string;
  }

  static tinyblob() {
    this.spacer();
    this.string += `TINYBLOB`;

    return this || this.string;
  }

  static tinytext() {
    this.spacer();
    this.string += `TINYTEXT`;

    return this || this.string;
  }

  static tinyint() {
    this.spacer();
    this.string += `TINYINT`;

    return this || this.string;
  }

  static bool() {
    this.spacer();
    this.string += `BOOL`;

    return this || this.string;
  }

  static boolean() {
    this.spacer();
    this.string += `BOOLEAN`;

    return this || this.string;
  }

  static smallint(size) {
    this.spacer();
    this.string += `SMALLINT(${size})`;

    return this || this.string;
  }

  static mediumint(size) {
    this.spacer();
    this.string += `MEDIUMINT(${size})`;

    return this || this.string;
  }

  static int(size) {
    this.spacer();
    this.string += `INT(${size})`;

    return this || this.string;
  }

  static integer(size) {
    this.spacer();
    this.string += `INTEGER(${size})`;

    return this || this.string;
  }

  static bigint(size) {
    this.spacer();
    this.string += `BIGINT(${size})`;

    return this || this.string;
  }

  static float(size, d) {
    this.spacer();
    this.string += `FLOAT(${size}, ${d})`;

    return this || this.string;
  }

  static double(size, d) {
    this.spacer();
    this.string += `DOUBLE(${size}, ${d})`;

    return this || this.string;
  }

  static double_precision(size, d) {
    this.spacer();
    this.string += `DOUBLE PRECISION(${size}, ${d})`;

    return this || this.string;
  }

  static decimal(size, d) {
    this.spacer();
    this.string += `DECIMAL(${size}, ${d})`;

    return this || this.string;
  }

  static text() {
    this.spacer();
    this.string += `TEXT`;

    return this || this.string;
  }

  static bit(size) {
    this.spacer();
    this.string += `BIT(${size})`;

    return this || this.string;
  }

  static blob(size) {
    this.spacer();
    this.string += `BLOB(${size})`;

    return this || this.string;
  }

  static mediumtext(size) {
    this.spacer();
    this.string += `MEDIUMTEXT`;

    return this || this.string;
  }

  static mediumblob(size) {
    this.spacer();
    this.string += `MEDIUMBLOB`;

    return this || this.string;
  }

  static longtext() {
    this.spacer();
    this.string += `LONGTEXT`;

    return this || this.string;
  }

  static longblob() {
    this.spacer();
    this.string += `LONGBLOB`;

    return this || this.string;
  }

  static enum(list) {
    this.spacer();
    this.string += `ENUM(${list})`;

    return this || this.string;
  }

  static set(list) {
    this.spacer();
    this.string += `SET(${list})`;

    return this || this.string;
  }

  static null(n = true) {
    this.spacer();
    if (!n) this.string += 'NOT ';

    this.string += `NULL`;

    return this || this.string;
  }

  static not_null() {
    this.spacer();

    this.string += `NOT NULL`;

    return this || this.string;
  }

  static primary_key() {
    this.spacer();
    this.string += 'PRIMARY KEY';

    return this || this.string;
  }

  static date() {
    this.spacer();
    this.string += 'DATE';

    return this || this.string;
  }

  static datetime(format) {
    this.spacer();
    this.string += `DATETIME(${format})`;

    return this || this.string;
  }

  static timestamp(format) {
    this.spacer();
    this.string += `TIMESTAMP(${format})`;

    return this || this.string;
  }

  static time(format) {
    this.spacer();
    this.string += `TIME(${format})`;

    return this || this.string;
  }

  static year() {
    this.spacer();
    this.string += `YEAR`;

    return this || this.string;
  }

  static auto_increment() {
    this.spacer();
    this.string += `AUTO_INCREMENT`;

    return this || this.string;
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
