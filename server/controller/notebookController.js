const db = require('../models/taskModel');

const notebookController = {};

notebookController.getCards = (req, res, next) => {
  if (!req.user.id) {
    return next({ log: 'notebookController.getCards: user is not logged in' });
  }
  if (!req.params.notebookId) {
    return next({ log: 'notebookController.getCards: no notebookId in url' });
  }

  const query = `SELECT c.*,
  n.name as notebook_name,
  n.group_id,
  g.name as group_name
FROM cards c
  LEFT JOIN notebooks n ON c.notebook_id = n.notebook_id
  LEFT JOIN groups g ON g.group_id = n.group_id
WHERE n.notebook_id = $1
};`;

  const queryParams = [req.params.notebookId];
  db.query(query, queryParams)
    .then(({ rows }) => {
      res.locals.cards = rows;
      next();
    })
    .catch((err) => next(err));
};



// notebookController.postNotebook = (req, res, next) => {
//   const { notebook_id, group_id, name } = req.body;
//   const query  = `INSERT INTO notebooks n (notebook_id, title, description, resources, status) VALUES ($1,$2,$3) RETURNING *`
//   const vals = [notebook_id, group_id, name ];
//   db.query (query,vals) .then(() => {
//     res.locals.newNotebook = data.rows;
//     next();
//   })
// }



module.exports = notebookController;
