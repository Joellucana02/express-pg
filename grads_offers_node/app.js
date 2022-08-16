const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./routes/grads");
const offerRouter = require("./routes/offers");
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use("/graduates", router);
app.use("/graduates/:id/offers", offerRouter);

app.use((req, res, next) => {
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
