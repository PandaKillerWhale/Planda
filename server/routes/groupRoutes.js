const express = require('express');
const router = express.Router();

const groupController = require('../controller/groupController');

/**
 * Get all cards that belong to a group
 */
router.get('/cards/:groupId', groupController.getCards, (req, res) => {
  res.json(res.locals.cards);
});

router.get('/notebooks/:groupId', groupController.getNotebooks, (req, res) => {
  res.json(res.locals.notebooks);
});

// router.delete('/group/:groupId');
// router.post('/group');

module.exports = router;
