let example = {
  name: 'John',
  age: '30'
};

exports.seed('table_name', () => {
  return [
    {
      ...example
    }
  ]
});