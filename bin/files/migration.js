const Africa = require('africa.js');

exports.up = (db) => {
  db.create('table_name', () => {
    return {
      'id': Africa.int().auto_increment().primary_key(),
      'name': Africa.varchar(255)
    }
  });
}

exports.down = (db) => {
  db.drop('table_name');
};