const express = require('express');
const router = express.Router();
const bucketController = require('../controllers/bucketController');
const objectController = require('../controllers/objectController');

router.get('/:bucketId/objects', async (req, res) => {
  try {
    const { bucketId } = req.params;
    const allObjects = await objectController.getAllObjects(bucketId);
    res.json(allObjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:bucketId/objects/:objectKey', async (req, res) => {
  try {
    const { bucketId, objectKey } = req.params;
    const object = await objectController.getObject(bucketId, objectKey);

    if (!object) {
      return res.status(404).json({ error: 'Object not found' });
    }

    res.json(object);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:bucketId/objects/:objectKey', async (req, res) => {
  try {
    const { bucketId, objectKey } = req.params;
    const { data } = req.body;

    const existingObject = await objectController.getObject(bucketId, objectKey);

    if (existingObject) {
      return res.status(409).json({ error: 'Object with the same key already exists' });
    }

    const newObject = await objectController.createObject(bucketId, objectKey, data);
    res.json(newObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:bucketId/objects/:objectKey', async (req, res) => {
  try {
    const { bucketId, objectKey } = req.params;
    const deletedObject = await objectController.deleteObject(bucketId, objectKey);

    if (!deletedObject) {
      return res.status(404).json({ error: 'Object not found' });
    }

    res.json(deletedObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;