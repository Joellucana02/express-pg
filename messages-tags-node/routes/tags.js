const express = require("express");
const router = express.Router();
const db = require("./../db");

router.get("/", async (req, res, next) => {
  try {
    console.log("----------------");
    const result = await db.query(
      `SELECT t.id, t.name, m.text FROM tags AS t JOIN messages_tags AS mt ON mt.tag_id = t.id JOIN messages AS m ON m.id = mt.message_id ORDER BY t.id`
    );
    console.log(result.rows);
    let counter = 0;
    let tags = [];
    let idKeeper = 0;

    for (let i = 0; i < result.rows.length; i++) {
      let currentTag = result.rows[i];
      if (idKeeper != currentTag.id) {
        counter++;
        idKeeper = currentTag.id;

        currentTag.messages = [];

        currentTag.messages.push(currentTag.text);

        delete currentTag.text;

        tags.push(currentTag);
      } else {
        tags[counter - 1].messages.push(currentTag.text);
      }
    }

    return res.json(tags);
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

/* Modify the GET /tags so that you show all the corresponding messages when you see all the tag. Add routes for updating and removing tags and messages */

module.exports = router;
