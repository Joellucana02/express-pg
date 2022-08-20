const express = require("express");
const router = express.Router();
const db = require("./../db");
const bcrypt = require("bcrypt");

router.get("/", async (req, res, next) => {
  try {
    const user = await db.query(`SELECT * FROM users`);
    return res.json(user.rows);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const password = req.body.password;
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);
    const user = await db.query(
      `INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *`,
      [req.body.name, hash]
    );
    return res.json(user.rows[0]);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
