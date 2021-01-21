const db = require('../models/taskModel');

const cardController = {};
cardController.postCard = (req, res, next) => {
  const { notebook_id, title, description, resources, status } = req.body;
  const query = `INSERT INTO cards (notebook_id, title, description, resources, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const vals = [notebook_id, title, description, resources, status];
<<<<<<< HEAD
  db.query(query, vals).then((data) => {
    console.log(data.rows[0]);
=======
  db.query(query, vals).then(data => {
>>>>>>> c89d116371cf69a2d7f06ced7a467e5c5c1591ea
    res.locals.newCard = data.rows[0];
    return next();
  });
};


cardController.updateCard = (req, res, next) => {
  const { notebook_id, title, description, resources, status, card_id } = req.body;
<<<<<<< HEAD
  const query = `UPDATE cards c SET notebook_id = $1, title = $2, description = $3, resources = $4, status = $5 WHERE c.card_id = ${card_id} RETURNING *`
  const vals =  [ notebook_id, title, description, resources, status ];
=======
  const query = `UPDATE cards c SET notebook_id = $1, title = $2, description = $3, resources = $4, status = $5 WHERE c.card_id = $6 RETURNING *`;
  const vals = [notebook_id, title, description, resources, status, card_id];
>>>>>>> c89d116371cf69a2d7f06ced7a467e5c5c1591ea
  db.query(query, vals).then((data) => {

    res.locals.updateCard = data.rows[0];
    next();
  });
};

cardController.deleteCard = (req, res, next) => {
  const { card_id } = req.body;
<<<<<<< HEAD
  const query = `DELETE FROM cards c WHERE c.card_id = ${card_id} RETURNING *`
  console.log(req.body, 'cardid')
  db.query(query).then((data) => {
=======

  const query = `DELETE FROM cards c WHERE c.card_id = $1 RETURNING *`;
  const queryParams = [card_id]
  db.query(query, queryParams).then((data) => {

>>>>>>> c89d116371cf69a2d7f06ced7a467e5c5c1591ea
    res.locals.deletedCard = data.rows[0];
    next();
  });
};

module.exports = cardController;

