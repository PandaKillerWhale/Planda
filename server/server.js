const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 3000;

const groupRouter = require('./routes/groupRoutes')
const cardRouter = require('./routes/cardRoutes')
const notebookRouter = require('./routes/notebookRoutes')
const userRouter = require('./routes/userRoutes')

// body parsing/url parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// execute auth file with this instance of app
require('./server-auth')(app);

// serve build folder/statically serving client folder
app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../client')));

// routes
app.use('/api/group', groupRouter)
app.use('/api/card', cardRouter)
app.use('/api/user', userRouter)
app.use('/api/notebook', notebookRouter)


// error handling
app.use((req, res) => {
  res.status(400).send("This is not the page you're looking");
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    error: '',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = {...defaultErr,...err}
  console.log('LOG:',errorObj.log);
  console.log('ERROR:',errorObj.error);
  return res.status(errorObj.status).json(errorObj.message);
});

// listen on port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
