const db = require('../db');

module.exports = {
  getAllObjects: async (bucketId) => {
    const [rows] = await db.query('SELECT * FROM objects WHERE bucket_id = ?', [bucketId]);
    return rows;
  },

  getObject: async (bucketId, objectKey) => {
    const [rows] = await db.query('SELECT * FROM objects WHERE bucket_id = ? AND `key` = ?', [bucketId, objectKey]);
    return rows[0];
  },

  createObject: async (bucketId, objectKey, data) => {
    await db.query('INSERT INTO objects (bucket_id, `key`, `data`) VALUES (?, ?, ?)', [bucketId, objectKey, data]);

    const [newObject] = await db.query('SELECT * FROM objects WHERE bucket_id = ? AND `key` = ?', [bucketId, objectKey]);
    return newObject;
  },

  deleteObject: async (bucketId, objectKey) => {
    const [deletedObject] = await db.query('DELETE FROM objects WHERE bucket_id = ? AND `key` = ? LIMIT 1', [bucketId, objectKey]);
    return deletedObject;
  },
};
