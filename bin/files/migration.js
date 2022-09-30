exports.up = (db, Africa) => {
  db.create('table_name', {
    'id': Africa.int().auto_increment().primary_key(),
    'name': Africa.varchar(255)
  });
}

exports.down = (db, Africa) => {
  db.drop('table_name');
};