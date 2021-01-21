const db = require('../models/taskModel');

const cardController = {};
cardController.postCard = (req, res, next) => {
  const { notebook_id, title, description, resources, status } = req.body;
  const query = `INSERT INTO cards (notebook_id, title, description, resources, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const vals = [notebook_id, title, description, resources, status];
  db.query(query, vals).then(data => {
    res.locals.newCard = data.rows[0];
    return next();
  });
};


cardController.updateCard = (req, res, next) => {
  const { notebook_id, title, description, resources, status, card_id } = req.body;
  const query = `UPDATE cards c SET notebook_id = $1, title = $2, description = $3, resources = $4, status = $5 WHERE c.card_id = $6 RETURNING *`;
  const vals = [notebook_id, title, description, resources, status, card_id];
  db.query(query, vals).then((data) => {

    res.locals.updateCard = data.rows[0];
    next();
  });
};

cardController.deleteCard = (req, res, next) => {
  const { card_id } = req.body;
  const query = `DELETE FROM cards c WHERE c.card_id = $1 RETURNING *`;
  const queryParams = [card_id]
  db.query(query, queryParams).then((data) => {
    res.locals.deletedCard = data.rows[0];
    next();
  });
};

module.exports = cardController;

