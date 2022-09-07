const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const userRoutes = require("./routes/users");
const bookRoute = require("./routes/book");
app.use(morgan("tiny"));

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/books", bookRoute);

app.use((req, res, next) => {
  let err = new Error("not found");
  err.status = 404;
  return err;
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
