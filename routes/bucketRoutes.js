const express = require('express');
const router = express.Router();
const bucketController = require('../controllers/bucketController');

router.get('/', async (req, res) => {
  const allBuckets = await bucketController.getAllBuckets();
  res.json(allBuckets);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const newBucket = await bucketController.createBucket(name);
  res.json(newBucket);
});

module.exports = router;
