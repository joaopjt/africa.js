import "core-js/stable";
import "regenerator-runtime/runtime";

import MySQL from './api/mysql';
import MariaDB from './api/mariadb';
import PostgreSQL from './api/postgre';
import SQLite from './api/sqlite';
import SQLServer from './api/sqlserver';

class Africa {
  constructor(space) {
    this.collumn_string = '';
  }

  static spacer() {
    if (this.collumn_string) this.collumn_string += ' ';
  }

  static int() {
    this.spacer();
    this.collumn_string += 'int';

    return this || this.collumn_string;
  }

  static char(size) {
    this.spacer();
    this.collumn_string += `char(${size})`;

    return this || this.collumn_string;
  }

  static varchar(size = 255) {
    this.spacer();
    this.collumn_string += `varchar(${size})`;

    return this || this.collumn_string;
  }

  static binary(size) {
    this.spacer();
    this.collumn_string += `BINARY(${size})`;

    return this || this.collumn_string;
  }

  static varbinary(size) {
    this.spacer();
    this.collumn_string += `VARBINARY(${size})`;

    return this || this.collumn_string;
  }

  static tinyblob() {
    this.spacer();
    this.collumn_string += `TINYBLOB`;

    return this || this.collumn_string;
  }

  static tinytext() {
    this.spacer();
    this.collumn_string += `TINYTEXT`;

    return this || this.collumn_string;
  }

  static tinyint() {
    this.spacer();
    this.collumn_string += `TINYINT`;

    return this || this.collumn_string;
  }

  static bool() {
    this.spacer();
    this.collumn_string += `BOOL`;

    return this || this.collumn_string;
  }

  static boolean() {
    this.spacer();
    this.collumn_string += `BOOLEAN`;

    return this || this.collumn_string;
  }

  static smallint(size) {
    this.spacer();
    this.collumn_string += `SMALLINT(${size})`;

    return this || this.collumn_string;
  }

  static mediumint(size) {
    this.spacer();
    this.collumn_string += `MEDIUMINT(${size})`;

    return this || this.collumn_string;
  }

  static int(size) {
    this.spacer();
    this.collumn_string += `INT(${size})`;

    return this || this.collumn_string;
  }

  static integer(size) {
    this.spacer();
    this.collumn_string += `INTEGER(${size})`;

    return this || this.collumn_string;
  }

  static bigint(size) {
    this.spacer();
    this.collumn_string += `BIGINT(${size})`;

    return this || this.collumn_string;
  }

  static float(size, d) {
    this.spacer();
    this.collumn_string += `FLOAT(${size}, ${d})`;

    return this || this.collumn_string;
  }

  static double(size, d) {
    this.spacer();
    this.collumn_string += `DOUBLE(${size}, ${d})`;

    return this || this.collumn_string;
  }

  static double_precision(size, d) {
    this.spacer();
    this.collumn_string += `DOUBLE PRECISION(${size}, ${d})`;

    return this || this.collumn_string;
  }

  static decimal(size, d) {
    this.spacer();
    this.collumn_string += `DECIMAL(${size}, ${d})`;

    return this || this.collumn_string;
  }

  static text() {
    this.spacer();
    this.collumn_string += `TEXT`;

    return this || this.collumn_string;
  }

  static bit(size) {
    this.spacer();
    this.collumn_string += `BIT(${size})`;

    return this || this.collumn_string;
  }

  static blob(size) {
    this.spacer();
    this.collumn_string += `BLOB(${size})`;

    return this || this.collumn_string;
  }

  static mediumtext(size) {
    this.spacer();
    this.collumn_string += `MEDIUMTEXT`;

    return this || this.collumn_string;
  }

  static mediumblob(size) {
    this.spacer();
    this.collumn_string += `MEDIUMBLOB`;

    return this || this.collumn_string;
  }

  static longtext() {
    this.spacer();
    this.collumn_string += `LONGTEXT`;

    return this || this.collumn_string;
  }

  static longblob() {
    this.spacer();
    this.collumn_string += `LONGBLOB`;

    return this || this.collumn_string;
  }

  static enum(list) {
    this.spacer();
    this.collumn_string += `ENUM(${list})`;

    return this || this.collumn_string;
  }

  static set(list) {
    this.spacer();
    this.collumn_string += `SET(${list})`;

    return this || this.collumn_string;
  }

  static null(n = true) {
    this.spacer();
    if (!n) this.collumn_string += 'NOT ';

    this.collumn_string += `NULL`;

    return this || this.collumn_string;
  }

  static not_null() {
    this.spacer();

    this.collumn_string += `NOT NULL`;

    return this || this.collumn_string;
  }

  static primary_key() {
    this.spacer();
    this.collumn_string += 'PRIMARY KEY';

    return this || this.collumn_string;
  }

  static date() {
    this.spacer();
    this.collumn_string += 'DATE';

    return this || this.collumn_string;
  }

  static datetime(format) {
    this.spacer();
    this.collumn_string += `DATETIME(${format})`;

    return this || this.collumn_string;
  }

  static timestamp(format) {
    this.spacer();
    this.collumn_string += `TIMESTAMP(${format})`;

    return this || this.collumn_string;
  }

  static time(format) {
    this.spacer();
    this.collumn_string += `TIME(${format})`;

    return this || this.collumn_string;
  }

  static year() {
    this.spacer();
    this.collumn_string += `YEAR`;

    return this || this.collumn_string;
  }

  static auto_increment() {
    this.spacer();
    this.collumn_string += `AUTO_INCREMENT`;

    return this || this.collumn_string;
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
