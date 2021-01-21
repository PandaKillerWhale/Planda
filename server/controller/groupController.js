const db = require('../models/taskModel');

const groupController = {};

groupController.getCards = (req, res, next) => {
  if (!req.params.groupId) return next({ log: 'groupController.getCards: no groupId in url' });
  if (!req.user.id) {
    return next({ log: 'groupController.getCards: user is not logged in' });
  }

  const query = `SELECT c.*, n.name as notebook_name, n.notebook_id, g.name as group_name, g.group_id
FROM user_groups ug
  LEFT JOIN groups g ON ug.group_id = g.group_id
  LEFT JOIN notebooks n ON n.group_id = g.group_id
  LEFT JOIN cards c ON c.notebook_id = n.notebook_id
WHERE ug.user_id = $1 AND ug.group_id = $2;`;
  const queryParams = [req.user.id, req.params.groupId];

  db.query(query, queryParams)
    .then(({ rows }) => {
      res.locals.cards = rows;
      return next();
    })
    .catch((err) => next(err));
};

groupController.getNotebooks = (req, res, next) => {
  if (!req.params.groupId) return next({ log: 'groupController.getCards: no groupId in url' });
  if (!req.user.id) {
    return next({ log: 'groupController.getNotebooks: user is not logged in' });
  }

  // TODO: security flaw: a user could query random group ids and see their notebooks
  const query = `SELECT n.name, n.notebook_id FROM notebooks n LEFT JOIN groups g ON n.group_id = g.group_id WHERE g.group_id = $1`;
  const queryParams = [req.params.groupId];
  db.query(query, queryParams).then((data) => {
    res.locals.notebooks = data.rows;
    next();
  });
};

groupController.addGroup = (req, res, next) => {
  if (!req.user.id) {
    return next({ log: 'groupController.addGroup: user is not logged in' });
  }
  if (!req.body.groupName)
    return next({ log: 'groupController.addGroup: did not receive groupName in body of request' });

  // add group
  const query = `WITH g AS (
  INSERT INTO groups (name)
  VALUES ($1)
  RETURNING *
)
INSERT INTO user_groups (group_id, user_id)
VALUES (
    (
      select group_id
      from g
    ),
    $2
  )
RETURNING group_id,(select name from g);`;
  const queryParams = [req.body.groupName, req.user.id];
  db.query(query, queryParams)
    .then(({ rows }) => {
      res.locals.newGroup = rows[0];
      next();
    })
    .catch((err) => next(err));
};

groupController.removeGroup = (req, res, next) => {
  if (!req.params.groupId) return next({ log: 'groupController.removeGroup: no groupId in url' });
  if (!req.user.id) {
    return next({ log: 'groupController.removeGroup: user is not logged in' });
  }
  
  const query = `DELETE FROM groups WHERE group_id = $1 RETURNING *`;
  const queryParams = [req.params.groupId];
  db.query(query, queryParams)
    .then(({ rows }) => {
      if (!rows.length) return next({ log: 'groupController.removeGroup: no matching groups'})
      res.locals.removed = rows[0];
      next();
    })
    .catch((err) => next(err));
};

groupController.addNotebook = (req, res, next) => {
  if (!req.user.id) {
    return next({ log: 'groupController.addNotebook: user is not logged in' });
  }
  if (!req.params.groupId) return next({ log: 'groupController.addNotebook: no groupId in url' });
  if (!req.body.notebookName)
    return next({ log: 'groupController.addNotebook: no notebookName in request body' });
  console.log(req.body.notebookName, 'NB Name')
  const query = `INSERT INTO notebooks (name, group_id)
VALUES ( $1 , $2) RETURNING *;`;
  const queryParams = [req.body.notebookName, req.params.groupId];

  db.query(query, queryParams)
    .then(({ rows }) => {
      res.locals.newNotebook = rows[0];
      next();
    })
    .catch((err) => next(err));
};

module.exports = groupController;
