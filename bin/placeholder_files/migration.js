const Africa = require('africa.js');
const { databaseClient } = require('africa.js');

exports.up = () => {
  databaseClient.newTable('table_name', () => {
    return {
      'id': Africa.int().auto_increment().primary_key(),
      'name': Africa.varchar()
    }
  })
}

exports.down = () => {

};