const express = require("express");
const router = express.Router();
const db = require("./../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "BEST PASSWORD EVER";

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
      [req.body.username, hash]
    );
    return res.json(user.rows[0]);
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const passwordGiven = req.body.password;
    const usernameGiven = req.body.username;

    const user = await db.query(
      `SELECT * FROM users WHERE username = ($1) LIMIT 1`,
      [usernameGiven]
    );
    if (user.rows.length === 0) {
      return res.json({ message: "User not found" });
    }

    const correctUser = await bcrypt.compare(
      passwordGiven,
      user.rows[0].password
    );
    if (correctUser === false) {
      return res.json({ message: "Password does not match" });
    }

    const token = jwt.sign({ username: user.rows[0].username }, secret, {
      expiresIn: 60 * 60,
    });

    return res.json({ token });
  } catch (error) {
    return next(error);
  }
});

router.get("/secret", (req, res, next) => {
  try {
    const authHeaderValue = req.headers.authorization;

    const token = jwt.verify(authHeaderValue, secret);

    return res.json({ message: "you made it!" });
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
});

module.exports = router;
