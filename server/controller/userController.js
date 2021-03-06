const db = require('../models/taskModel');

const userController = {};

userController.getGroups = (req, res, next) => {
  if (!req.user || !req.user.id) {
    return next({ log: 'groupController.getGroups: user is not logged in' });
  }

  const query = `SELECT g.name, g.group_id FROM groups g LEFT JOIN user_groups ug ON g.group_id = ug.group_id WHERE ug.user_id = $1`;
  const queryParams = [req.user.id];

  db.query(query, queryParams).then((data) => {
    res.locals.userGroups = data.rows;
    next();
  });
};

userController.getUserCards = (req, res, next) => {
  if (!req.user.id) {
    return next({ log: 'groupController.getCards: user is not logged in' });
  }

  const query = `SELECT c.*, n.name as notebook_name, n.notebook_id, g.name as group_name, g.group_id
FROM user_groups ug
  LEFT JOIN groups g ON ug.group_id = g.group_id
  LEFT JOIN notebooks n ON n.group_id = g.group_id
  LEFT JOIN cards c ON c.notebook_id = n.notebook_id
WHERE ug.user_id = $1`;
  const queryParams = [req.user.id];

  db.query(query, queryParams)
    .then(({ rows }) => {
      res.locals.cards = rows;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = userController;
