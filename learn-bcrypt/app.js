const bcrypt = require("bcrypt");

const password = "supersecret";
const saltRounds = 10;

bcrypt
  .hash(password, saltRounds)
  .then((hashedPassword) => {
    console.log("hash", hashedPassword);
    return hashedPassword;
  })
  .then((hash) => {
    return bcrypt.compare(password, hash);
  })
  .then((res) => {
    console.log("match", res);
  });
