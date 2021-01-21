const express = require('express');
const router = express.Router();

const groupController = require('../controller/groupController');

/**
 * Get all cards that belong to a group
 */
router.get('/cards/:groupId', groupController.getCards, (_, res) => {
  res.json(res.locals.cards);
});

/**
 * Get all notebooks that belong to a group
 */
router.get('/notebooks/:groupId', groupController.getNotebooks, (_, res) => {
  res.json(res.locals.notebooks);
});

/**
 * Create new Group
 */
router.post('/group', groupController.addGroup, (_, res) => {
  res.json(res.locals.newGroup)
});

// router.delete('/group/:groupId');

module.exports = router;
