const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });
const db = require("./../db");

router.get("/", async (req, res, next) => {
  try {
    console.log("==================================");
    const graduate = await db.query(`SELECT * FROM graduates WHERE id = ($1)`, [
      req.params.id,
    ]);
    const offers = await db.query(
      `SELECT title FROM offers WHERE graduate_id = ($1)`,
      [req.params.id]
    );
    graduate.rows[0].offers = offers.rows;
    return res.json(graduate.rows[0]);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await db.query(
      `INSERT INTO offers (title, graduate_id) VALUES ($1,$2) RETURNING *`,
      [req.body.title, req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
});

/*
Add the routes for showing a specific offer, updating an offer, and deleting an offer. You can respond with whatever data you think is the most pertinent. The routes should be:

GET /graduates/:graduate_id/offers/:id
PATCH /graduates/:graduate_id/offers/:id
DELETE /graduates/:graduate_id/offers/:id */

router.get("/:id", async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM offers WHERE id = ($1)`, [
      req.params.id,
    ]);
    return res.json(result.rows);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const result = await db.query(
      `UPDATE offers SET title=($2) WHERE id = ($1) RETURNING *`,
      [req.params.id, req.body.title]
    );
    return res.json(result.rows);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await db.query(
      `DELETE FROM offers WHERE id = ($1) RETURNING *`,
      [req.params.id]
    );
    return res.json(result.rows);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
