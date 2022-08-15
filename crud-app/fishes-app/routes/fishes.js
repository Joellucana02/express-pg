const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM fishes`);
    return res.json(results.rows);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const results = await db.query(
      `INSERT INTO fishes (name,type) VALUES ($1,$2) RETURNING *`,
      [req.body.name, req.body.type]
    );
    return res.json(results);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const fish = await db.query(
      `UPDATE fishes SET name= $1, type =$2 WHERE id = ($3) RETURNING *`,
      [req.body.name, req.body.type, req.params.id]
    );
    return res.json(fish);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const fish = await db.query(`SELECT * FROM fishes WHERE id = ($1)`, [
      req.params.id,
    ]);
    return res.json(fish);
  } catch (error) {
    return next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const fish = await db.query(
      `DELETE FROM fishes WHERE id = ($1) RETURNING * `,
      [req.params.id]
    );
    return res.json(fish);
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
