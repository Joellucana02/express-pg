const { Client } = require("pg");

const client = new Client({
  connectionString: `postgresql://postgres:yourpassword@localhost/node_bcrypt_sql`,
});

client.connect();

module.exports = client;
