const express = require("express");
const router = express.Router();
const db = require("./../db");

router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM graduates`);
    return res.json(results.rows);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const results = await db.query(
      `INSERT INTO graduates (name) VALUES ($1) RETURNING *`,
      [req.body.name]
    );
    return res.json(results.rows);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const grad = await db.query(`SELECT * FROM graduates WHERE id = ($1)`, [
      req.params.id,
    ]);
    return res.json(grad.rows[0]);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const results = await db.query(
      `UPDATE graduates SET name = ($2) WHERE id = ($1) RETURNING *`,
      [req.params.id, req.body.name]
    );
    return res.json(results.rows[0]);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleteData = await db.query(
      `DELETE FROM gratuades WHERE id = ($1) RETURNING *`,
      [req.params.id]
    );
    return res.json(deleteData.rows[0]);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
