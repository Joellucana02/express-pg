const express = require("express");
const router = express.Router();
const { validate } = require("jsonschema");
const bookSchema = require("./../schema/book.json");

router.route("/").post((req, res, next) => {
  const result = validate(req.body, bookSchema);

  if (!result.valid) {
    return next(result.errors.map((error) => error.stack));
  }

  const book = req.body.data;

  return res.status(201).json(book);
});

module.exports = router;
