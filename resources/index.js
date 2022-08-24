import "core-js/stable";
import "regenerator-runtime/runtime";

import MySQLClient from './api/mysql';
import MariaDBClient from './api/mariadb';
import PostgreSQLClient from './api/postgre';
import SQLiteClient from './api/sqlite';
import SQLServerClient from './api/sqlserver';

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

    return this;
  }

  static char(size) {
    this.spacer();
    this.collumn_string += `char(${size})`;

    return this;
  }

  static varchar(size = 255) {
    this.spacer();
    this.collumn_string += `varchar(${size})`;

    return this;
  }

  static binary(size) {
    this.spacer();
    this.collumn_string += `BINARY(${size})`;

    return this;
  }

  static varbinary(size) {
    this.spacer();
    this.collumn_string += `VARBINARY(${size})`;

    return this;
  }

  static tinyblob() {
    this.spacer();
    this.collumn_string += `TINYBLOB`;

    return this;
  }

  static tinytext() {
    this.spacer();
    this.collumn_string += `TINYTEXT`;

    return this;
  }

  static tinyint() {
    this.spacer();
    this.collumn_string += `TINYINT`;

    return this;
  }

  static bool() {
    this.spacer();
    this.collumn_string += `BOOL`;

    return this;
  }

  static boolean() {
    this.spacer();
    this.collumn_string += `BOOLEAN`;

    return this;
  }

  static smallint(size) {
    this.spacer();
    this.collumn_string += `SMALLINT(${size})`;

    return this;
  }

  static mediumint(size) {
    this.spacer();
    this.collumn_string += `MEDIUMINT(${size})`;

    return this;
  }

  static int(size) {
    this.spacer();
    this.collumn_string += `INT(${size})`;

    return this;
  }

  static integer(size) {
    this.spacer();
    this.collumn_string += `INTEGER(${size})`;

    return this;
  }

  static bigint(size) {
    this.spacer();
    this.collumn_string += `BIGINT(${size})`;

    return this;
  }

  static float(size, d) {
    this.spacer();
    this.collumn_string += `FLOAT(${size}, ${d})`;

    return this;
  }

  static double(size, d) {
    this.spacer();
    this.collumn_string += `DOUBLE(${size}, ${d})`;

    return this;
  }

  static double_precision(size, d) {
    this.spacer();
    this.collumn_string += `DOUBLE PRECISION(${size}, ${d})`;

    return this;
  }

  static decimal(size, d) {
    this.spacer();
    this.collumn_string += `DECIMAL(${size}, ${d})`;

    return this;
  }

  static text() {
    this.spacer();
    this.collumn_string += `TEXT`;

    return this;
  }

  static bit(size) {
    this.spacer();
    this.collumn_string += `BIT(${size})`;

    return this;
  }

  static blob(size) {
    this.spacer();
    this.collumn_string += `BLOB(${size})`;

    return this;
  }

  static mediumtext(size) {
    this.spacer();
    this.collumn_string += `MEDIUMTEXT`;

    return this;
  }

  static mediumblob(size) {
    this.spacer();
    this.collumn_string += `MEDIUMBLOB`;

    return this;
  }

  static longtext() {
    this.spacer();
    this.collumn_string += `LONGTEXT`;

    return this;
  }

  static longblob() {
    this.spacer();
    this.collumn_string += `LONGBLOB`;

    return this;
  }

  static enum(list) {
    this.spacer();
    this.collumn_string += `ENUM(${list})`;

    return this;
  }

  static set(list) {
    this.spacer();
    this.collumn_string += `SET(${list})`;

    return this;
  }

  static null() {
    this.spacer();
    if (!n) this.collumn_string += 'NOT ';

    this.collumn_string += `NULL`;

    return this;
  }

  static not_null() {
    this.spacer();

    this.collumn_string += `NOT NULL`;

    return this;
  }

  static primary_key() {
    this.spacer();
    this.collumn_string += 'PRIMARY KEY';

    return this;
  }

  static date() {
    this.spacer();
    this.collumn_string += 'DATE';

    return this;
  }

  static datetime(format) {
    this.spacer();
    this.collumn_string += `DATETIME(${format})`;

    return this;
  }

  static timestamp(format) {
    this.spacer();
    this.collumn_string += `TIMESTAMP(${format})`;

    return this;
  }

  static time(format) {
    this.spacer();
    this.collumn_string += `TIME(${format})`;

    return this;
  }

  static year() {
    this.spacer();
    this.collumn_string += `YEAR`;

    return this;
  }

  static auto_increment() {
    this.spacer();
    this.collumn_string += `AUTO_INCREMENT`;

    return this;
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
