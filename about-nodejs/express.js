const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
// the second argument is the folder
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  next();
});

app.use((req, res, next) => {
  const userName = req.body.username || 'Unknown user';

  res.render('index', {
    userName
  });

  // send() doesn't exist in pure node js
  // res.send(
  //   `<h1>Hi ${userName}</h1><form method="POST" action="/">
  //     <input name="username" type="text">
  //     <button type="submit">Send</button>
  //   </form>`
  // );
});

app.listen(3000);
