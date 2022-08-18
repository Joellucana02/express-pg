const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const tagsRouter = require("./routes/tags");
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/tags", tagsRouter);

app.get((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
      message: err.message,
      error: err,
    });
  });
}

app.listen(3000, () => {
  console.log("server running on port 3000");
});
