const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const db = require("./../db");

router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(
      `SELECT m.id, m.text, t.name FROM message AS m JOIN message_tags AS mt ON mt.message_id = m.id JOIN tags AS t ON t.id = mt.tag_id ORDER BY m.id`
    );
    let startIdx = 0;
    let counter = 0;
    let messages = [];

    for (let i = 0; i < results.rows.length; i++) {
      let currentMsg = results.rows[i];
      if (startIdx != currentMsg.id) {
        counter++;

        startIdx = currentMsg.id;
        currentMsg.tags = [];

        currentMsg.tags.push(currentMsg.name);
        delete currentMsg.name;

        messages.push(currentMsg);
      } else {
        messages[counter - 1].tags.push(currentMsg.name);
      }
    }
    return res.json(messages);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await db.query(
      `INSERT INTO messages (text) VALUES ($1) RETURNING *`,
      [req.body.text]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
