export default class SQL {
  constructor() {
    this.query_string = ``;
  }

  value() {
    return this.query_string;
  }

  select(collumns = '*') {
    if (!collumns) throw new Error('Expected collumns as first paramenter, but none was given.');

    this.query_string += `SELECT ${collumns}`;

    return this;
  }

  create(table_name, collumns_object) {
    let collumns = '';
    let count = 0;
    if (!table_name) throw new Error('Expected table name but none was given.');
    if (!collumns_object) throw new Error('Expected collumns object as a second parameter, but none was given.');

    Object.entries(collumns_object).forEach((collumn) => {
      if (count >= 1) collumns += ', ';

      collumns += `${collumn[0]} ${collumn[1]}`;

      count++;
    });

    this.query_string = `CREATE TABLE ${table_name} (${collumns})`;

    return this.query();
  }

  insert(table_name, values_object) {
    let collumns = '';
    let values = '';
    if (!table_name) throw new Error('Expected table name but none was given.');
    if (!values_object) throw new Error('Expected values object as a second parameter, but none was given.');

    Object.keys(values_object).forEach((key, index) => {
      let collumn = key;
      if (Object.keys(values_object).length > index + 1) collumn += ',';

      collumns += collumn;
    });

    Object.values(values_object).forEach((value, index) => {
      value = `'${value}'`
      if (Object.keys(values_object).length > index + 1) value += ',';

      values += value;
    });

    this.query_string = `INSERT INTO ${table_name} (${collumns}) VALUES (${values})`;

    return this;
  }

  update(table_name, values_object) {
    let collumns = '';
    let values = '';
    if (!table_name) throw new Error('Expected table name but none was given.');
    if (!values_object) throw new Error('Expected values object as a second parameter, but none was given.');

    Object.keys(values_object).forEach((key, index) => {
      let collumn = key;
      if (Object.keys(values_object).length > index + 1) collumn += ',';

      collumns += collumn;
    });

    Object.values(values_object).forEach((value, index) => {
      value = `'${value}'`
      if (Object.keys(values_object).length > index + 1) value += ',';

      values += value;
    });

    this.query_string = `UPDATE ${table_name} SET (${collumns}) VALUES (${values})`;

    return this;
  }

  drop(table_name) {
    if (!table_name) throw new Error('Expected table name but none was given.');

    this.query_string = `DROP TABLE ${table_name}`;

    return this;
  }

  delete(table_name) {
    if (!table_name) throw new Error('Expected table name but none was given.');

    this.query_string = `DELETE FROM ${table_name}`;

    return this;
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

    this.query_string += ` FROM ${table}`;

    return this; 
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

    return this;
  }

  order_by(collumn) {
    const order_by = ` ORDER BY ${collumn}`;

    this.query_string += order_by;

    return this;
  }

  asc() {
    const asc = ` ASC`;

    this.query_string += asc;

    return this;
  }

  desc() {
    const desc = ` DESC`;

    this.query_string += desc;

    return this;
  }

  join(table, object) {
    let relationship = '';
    const join = ` INNER JOIN ${table} ON ${relationship}`;
    if (!table) throw new Error('Expected table name as first paramenter, but none was given.');
    if (!object) throw new Error('Expected values object as second paramenter, but none was given.');

    Object.keys(object).forEach((key_column, value_collumn) => {
      relationship += `${this.table}.${key_column} = ${table}.${value_collumn}`;
    });

    this.query_string += join;

    return this;
  }

  left_join(table, object) {
    let relationship = '';
    const join = ` LEFT JOIN ${table} ON ${relationship}`;
    if (!table) throw new Error('Expected table name as first paramenter, but none was given.');
    if (!object) throw new Error('Expected values object as second paramenter, but none was given.');

    Object.keys(object).forEach((key_column, value_collumn) => {
      relationship += `${this.table}.${key_column} = ${table}.${value_collumn}`;
    });

    this.query_string += join;

    return this;
  }

  right_join(table, object) {
    let relationship = '';
    const join = ` RIGHT JOIN ${table} ON ${relationship}`;
    if (!table) throw new Error('Expected table name as first paramenter, but none was given.');
    if (!object) throw new Error('Expected values object as second paramenter, but none was given.');

    Object.keys(object).forEach((key_column, value_collumn) => {
      relationship += `${this.table}.${key_column} = ${table}.${value_collumn}`;
    });

    this.query_string += join;

    return this;
  }

  outer_join(table, object) {
    let relationship = '';
    const join = ` OUTER FULL JOIN ${table} ON ${relationship}`;
    if (!table) throw new Error('Expected table name as first paramenter, but none was given.');
    if (!object) throw new Error('Expected values object as second paramenter, but none was given.');

    Object.keys(object).forEach((key_column, value_collumn) => {
      relationship += `${this.table}.${key_column} = ${table}.${value_collumn}`;
    });

    this.query_string += join;

    return this;
  }

  exists() {
    this.query_string += ' EXISTS';

    return this || this.query;
  }

  raw(r) {
    this.query_string += r;
    if (!r) throw new Error('Expected SQL instruction as first paramenter, but none was given.');

    return this || this.query;
  }
}