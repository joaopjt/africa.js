const { databaseClient } = require('africa.js');

let example = {
  name: 'John',
  age: '30'
};

exports.seeder = () => {
  databaseClient.insert('table_name', () => {
    return [
      {
        ...example
      }
    ]
  })
}