const { MySQL } = require('africa.js');

let example = {
  name: 'John',
  age: '30'
};

exports.seeder = () => {
  MySQL.insert('table_name', () => {
    return [
      {
        ...example
      }
    ]
  })
}