const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 3000;

// const frontend = require('./routes/frontendRoutes.js');
const groupController = require('./controller/groupController.js');
const cardController = require('./controller/cardController.js');
// const notebookController = require('./controller/notebookController.js');
const userController = require('./controller/userController.js');

// execute auth file with this instance of app
require('./server-auth')(app);

// body parsing/url parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// serve build folder/statically serving client folder
app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../client')));

// routes
app.get(
  '/api/user/groups',
  (req, res, next) => {
    console.log('session-server', req.session)
    console.log('user-server', req.user)
    next()
  },
  userController.getGroups,
  (req, res) => {
    res.json({
      username: req.user.username,
      userGroups: res.locals.userGroups,
    });
  }
);

// routes
// app.get('/api/user/groups', notebookController.getNotebooks, (req, res) => {
//   res.json(res.locals.notebooks);
// });

app.get('/api/cards/group/:groupId', groupController.getCards, (req, res) => {
  res.json(res.locals.cards);
});

// --------- post new cards -------------

app.post('/api/card', cardController.postCard, (req, res) => {
  res.json(res.locals.newCard);
});

// --------- wrapped in if statement -------------
// app.use('/', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '../index.html'));
// });
// -----------------------------------------------

// error handling
app.use((req, res) => {
  res.status(400).send("This is not the page you're looking");
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(err);
  // console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// listen on port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
