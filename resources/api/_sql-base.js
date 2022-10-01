export default class SQL {
  constructor() {
    this.table = '';
    this.collums = '*';
    this.where = ``;
    this.query_string = `SELECT ${this.collumns} FROM ${this.table}`;
  }

  select(collumns) {
    if (collumns) this.collums = collumns;

    return this;
  }

  create(table_name, collumns_object) {
    let collumns = '';
    if (!table_name) throw new Error('Expected table name but none was given.');

    Object.entries(collumns_object).forEach((collumn, collumn_type) => {
      collumns += `${collumn} ${collumn_type},`;
    });

    this.query_string = `CREATE TABLE ${table_name} (${collumns})`;

    return this.query();
  }

  insert(table_name, values_object) {
    let collumns = '';
    let values = '';

    Object.keys(values_object).forEach((key, index) => {
      let collumn = key;
      if (index + 1 === Object.keys(values_object).length) collumn += ',';

      collumns += collumn;
    });

    Object.values(values_object).forEach((key, index) => {
      let value = key;
      if (index + 1 === Object.keys(values_object).length) value += ',';

      values += value;
    });

    this.query_string = `INSERT INTO ${table_name} (${collumns}) VALUES (${values})`;

    return this || this.query();
  }

  drop(table_name) {
    if (!table_name) throw new Error('Expected table name but none was given.');

    this.query_string = `DROP TABLE ${table_name}`;

    return this || this.query();
  }

  delete(table_name) {
    if (collumns) this.collums = collumns;

    this.query_string = `DELETE FROM ${table_name}`;

    return this || this.query();
  }

  restrict() {
    this.query_string += ` RESTRICT`;

    return this.query();
  }

  cascade() {
    this.query_string += ` CASCADE`;

    return this.query();
  }

  from(table) {
    if (!table) throw new Error('Expected table name but none was given.');

    this.table = table;

    return this || this.query(); 
  }

  where_is_allocated() {
    if (this.query_string.search('WHERE')) return true;
  }

  where(key, operator, value) {
    let conditions = `${key} ${operator} ${value}`;
    const where = ` WHERE ${conditions}`;

    if (this.where_is_allocated()) this.query_string += 'AND';

    if (this.where_is_allocated()) {
      this.query_string += conditions;
    } else {
      this.query_string += where;
    }

    return this || this.query();
  }

  order_by(collumn) {
    const order_by = ` ORDER BY ${collumn}`;

    this.query_string += order_by;

    return this || this.query();
  }

  asc() {
    const asc = ` ASC`;

    this.query_string += asc;

    return this || this.query();
  }

  desc() {
    const desc = ` DESC`;

    this.query_string += desc;

    return this || this.query();
  }

  join(table, object) {
    let relationship = '';
    const join = ` INNER JOIN ${table} ON ${relationship}`;

    Object.keys(object).forEach((key, value) => {
      relationship += `${this.table}.${key} = ${table}.${value}`;
    });

    this.query_string += join;

    return this || this.query();
  }

  left_join(table, object) {
    let relationship = '';
    const join = ` LEFT JOIN ${table} ON ${relationship}`;

    Object.keys(object).forEach((key, value) => {
      relationship += `${this.table}.${key} = ${table}.${value}`;
    });

    this.query_string += join;

    return this || this.query();
  }

  right_join(table, object) {
    let relationship = '';
    const join = ` RIGHT JOIN ${table} ON ${relationship}`;

    Object.keys(object).forEach((key, value) => {
      relationship += `${this.table}.${key} = ${table}.${value}`;
    });

    this.query_string += join;

    return this || this.query();
  }

  outer_join(table, object) {
    let relationship = '';
    const join = ` OUTER FULL JOIN ${table} ON ${relationship}`;

    Object.keys(object).forEach((key, value) => {
      relationship += `${this.table}.${key} = ${table}.${value}`;
    });

    this.query_string += join;

    return this || this.query();
  }

  exists() {
    this.query_string += ' EXISTS';

    return this || this.query;
  }

  raw(r) {
    this.query_string += r;

    return this || this.query;
  }
}