const fs = require('fs');

fs.writeFile('user-data.txt', 'username=Klethonio', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Wrote to file!');
  }
});

fs.readFile('user-data.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.toString());
});
