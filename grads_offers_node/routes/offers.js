const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });
const db = require("./../db");

app.get("/graduates/:id/offers", async (req, res, next) => {
  try {
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

app.post("/graduates/:id/offers", async (req, res, next) => {
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

module.exports = router;
