const express = require("express");
const router = express.Router();
const db = require("./../db");

router.get("/", async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM tags`);
    return res.json(result.rows);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await db.query(`INSERT INTO tags VALUES ($1) RETURNING *`, [
      req.body.name,
    ]);
    return res.json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
