const db = require('../db');

module.exports = {
  getAllBuckets: async () => {
    const [rows] = await db.query('SELECT * FROM buckets');
    return rows;
  },

  createBucket: async (name) => {
    const [result] = await db.query('INSERT INTO buckets (name) VALUES (?)', [name]);
    const newBucketId = result.insertId;

    const [newBucket] = await db.query('SELECT * FROM buckets WHERE id = ?', [newBucketId]);
    return newBucket;
  },
};
