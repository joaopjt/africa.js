const africa = require('../dist/index.min.js');

const MySQL = new africa.MySQL('localhost', 'root', '', 'africaqa');

console.log(MySQL);